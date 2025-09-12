"use client"

import { Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import React, { useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import * as Api from '../api' 
import { IFilesRes } from '../api/type/files.type'

interface UploadButtonProps {
  token: string;
  onUploadSuccess?: (file: IFilesRes) => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ token, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false)

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: true,
    disabled: uploading,
    beforeUpload: (file) => {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        message.error('файл должен быть меньше 10mb')
        return Upload.LIST_IGNORE
      }

      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp',
        'application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ]

      if (!allowedTypes.includes(file.type)) {
        message.error('недопустимый формат файла')
        return Upload.LIST_IGNORE
      }

      return true
    },
    customRequest: async ({ file, onSuccess, onError, onProgress }) => {
      setUploading(true)
      
      try {
        const uploadedFile = await Api.files.fileUpload(file as File, token)
        
        if (onSuccess) {
          onSuccess(uploadedFile)
        }
        
        message.success('файл успешно загружен')
        
        if (onUploadSuccess) {
          onUploadSuccess(uploadedFile)
        }
        
      } catch (error: any) {
        console.error('upload error:', error)
        
        if (onError) {
          onError(error)
        }
        
        message.error(error.message || 'ошибка загрузки файла')
      } finally {
        setUploading(false)
      }
    },
    onChange: (info) => {
      const { status } = info.file
      
      if (status === 'done') {
        console.log('file uploaded successfully')
      } else if (status === 'error') {
        console.log('file upload failed')
      }
    },
  }

  return (
    <div className='text-center mb-4'>
      <Upload.Dragger 
        {...props}
        className="upload-dragger"
        accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.pdf,.doc,.docx,.txt,.xlsx,.xls"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Нажмите или перетащите файл для загрузки
        </p>
      </Upload.Dragger>
      
      {uploading && (
        <div className="mt-2 text-sm text-blue-500">
          Загрузка...
        </div>
      )}
    </div>
  )
}