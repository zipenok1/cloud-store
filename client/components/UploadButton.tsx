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

  const getFileExtension = (filename: string): string => {
    return filename.toLowerCase().slice(
      (Math.max(0, filename.lastIndexOf(".")) || Infinity)
    )
  }

  const allowedExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp',
    '.pdf', '.doc', '.docx', '.txt', '.xlsx', '.xls'
  ]

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: true,
    disabled: uploading,
    beforeUpload: (file) => {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        message.error('файл должен быть меньше 10MB')
        return Upload.LIST_IGNORE
      }

      const extension = getFileExtension(file.name)
      if (!allowedExtensions.includes(extension)) {
        message.error('недопустимый формат файла. Разрешенные форматы: ' + 
          allowedExtensions.join(', '))
        return Upload.LIST_IGNORE
      }

      return true
    },
    customRequest: async ({ file, onSuccess, onError }) => {
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