"use client"

import { Button, Menu, MenuProps } from "antd"
import { useRouter, usePathname } from "next/navigation"


const DashboardPage = () => {

    const router = useRouter()
    const pathname = usePathname()

    const menuItems: MenuProps['items'] = [
        {
            key: '/dashboard/files',
            label: 'Файлы',
            onClick: () => router.push('/dashboard/files')
        },
        {
            key: '/dashboard/photo',
            label: 'Фотографии',
            onClick: () => router.push('/dashboard/photo')
        },
        {
            key: '/dashboard/other',
            label: 'Другое',
            onClick: () => router.push('/dashboard/other')
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

            <div className="bg-neutral-100 w-full py-3 px-4 rounded-2xl">
                <h1>Files</h1>
            </div>
        </div>
    )
}

export default DashboardPage