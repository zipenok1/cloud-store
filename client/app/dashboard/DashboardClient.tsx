"use client"

import { Button, Menu, MenuProps } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { IDashboardClient } from "./DashboardClient.type"
import Image from "next/image"
import { useState, useEffect } from "react"

const DashboardPage = (filesData: IDashboardClient) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filteredFiles, setFilteredFiles] = useState(filesData.filesData)
  
  const currentType = searchParams.get('type') || 'all'
  
  useEffect(() => {
    if (currentType === 'all') {
      setFilteredFiles(filesData.filesData)
    } else {
      setFilteredFiles(
        filesData.filesData.filter(file => file.type === currentType)
      )
    }
  }, [currentType, filesData.filesData])

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
        <Button className="mb-2.5 w-full">
          Загрузить
        </Button>
        <Menu
          mode="inline"
          selectedKeys={[`/dashboard/files?type=${currentType}`]}
          items={menuItems}
          onClick={({key}) => handleMenuClick(key)}
        />
      </div>

      <div className="w-full h-auto py-3 px-4 rounded-2xl flex gap-2.5 flex-wrap content-start">
        {filteredFiles.map(el => 
          <div 
          className="bg-blue-400 px-4 py-4 rounded-2xl h-max flex flex-col items-center justify-center w-40"
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
              <span className="text-sm">{el.extension}</span>
            </div>
          )}
          <h1 className="text-sm truncate max-w-[128px] text-center">{el.originalName}</h1>
        </div>
        )}
        
        {filteredFiles.length === 0 && (
          <div className="w-full text-center py-10">
            <p>Нет файлов для отображения</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage