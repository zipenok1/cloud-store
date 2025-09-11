"use client"

import { Button, Menu, MenuProps } from "antd"
import { useRouter, usePathname } from "next/navigation"
import { IDashboardClient } from "./DashboardClient.type"
import Image from "next/image"


const DashboardPage = (filesData: IDashboardClient) => {

    const router = useRouter()
    const pathname = usePathname()

    const menuItems: MenuProps['items'] = [
        {
            key: '/dashboard/files',
            label: 'Файлы',
        },
        {
            key: '/dashboard/photo',
            label: 'Фотографии',
        },
        {
            key: '/dashboard/other',
            label: 'Другое',
        }
    ]

    return(
        <div className="w-full h-full flex" >
            <div className="w-2/6 py-3 px-4">
                <Button className="mb-2.5 w-full">
                    Загрузить
                </Button>
                <Menu
                    mode="inline"
                    selectedKeys={[pathname]}
                    items={menuItems}
                />
            </div>

            <div className="bg-neutral-100 w-full py-3 px-4 rounded-2xl flex gap-2.5 flex-wrap">
                {filesData.filesData.map(el=>
                    <div 
                        className="bg-blue-400 px-4 py-4 rounded-2xl h-max"
                        key={el.id}
                    >   
                        <Image
                            src={`http://localhost:7000${el.url}`}
                            alt={el.originalName}
                            width={128}
                            height={128}
                            className="object-cover rounded mb-2"
                        />
                        <h1>{el.originalName}</h1>
                        <p>{el.type}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardPage

