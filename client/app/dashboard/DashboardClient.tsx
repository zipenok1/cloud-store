"use client"

import { Menu, MenuProps } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { IDashboardClient } from "./DashboardClient.type"
import Image from "next/image"
import { useState, useEffect } from "react"
import { UploadButton } from "../../components/UploadButton"
import { IFilesRes } from "../../api/type/files.type"

interface DashboardProps {
  filesData: IDashboardClient
  token: string
} 

const DashboardClient: React.FC<DashboardProps> = ({ filesData, token }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filteredFiles, setFilteredFiles] = useState(filesData.filesData)
  const [allFiles, setAllFiles] = useState(filesData.filesData)
  
  const currentType = searchParams.get('type') || 'all'
  
  useEffect(() => {
    if (currentType === 'all') {
      setFilteredFiles(allFiles)
    } else {
      setFilteredFiles(
        allFiles.filter(file => file.type === currentType)
      )
    }
  }, [currentType, allFiles])

  const handleUploadSuccess = (newFile: IFilesRes) => {
    setAllFiles(prevFiles => [...prevFiles, newFile])
  }

  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard?type=all',
      label: 'Все файлы',
    },
    {
      key: '/dashboard?type=images',
      label: 'Фотографии',
    },
    {
      key: '/dashboard?type=document',
      label: 'Документы',
    },
    {
      key: '/dashboard?type=other',
      label: 'Другое',
    }
  ]

  const handleMenuClick = (key: string) => {
    router.push(key)
  }

  return(
    <div className="w-full h-full flex" >
      <div className="w-2/6 py-3 px-4">
        <UploadButton 
          token={token}
          onUploadSuccess={handleUploadSuccess}
        />
        <Menu
          mode="inline"
          selectedKeys={[`/dashboard?type=${currentType}`]}
          items={menuItems}
          onClick={({key}) => handleMenuClick(key)}
        />
      </div>

      <div className="w-full h-auto py-3 px-4 rounded-2xl flex gap-2.5 flex-wrap content-start">
        {filteredFiles.map(el => (
          <div 
            className="border-2 border-dashed border-blue-400 px-4 py-4 rounded-2xl h-max flex flex-col items-center justify-center w-40"
            key={el.id}
          >   
            {el.type === 'images' ? (
              <Image
                src={`http://localhost:7000${el.url}`}
                alt={el.originalName}
                width={128}
                height={128}
                className="object-cover rounded mb-2 w-32 h-32"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded mb-2">
                <span className="text-sm">{el.type}</span>
              </div>
            )}
            <h1 className="text-sm truncate max-w-[128px] text-center">{el.originalName}</h1>
          </div>
        ))}
        
        {filteredFiles.length === 0 && (
          <div className="w-full text-center py-10">
            <p>Нет файлов для отображения</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardClient