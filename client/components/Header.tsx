import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <header className='py-2 bg-blue-400'>
        <div className='max-w-[1920px] w-4/5 mx-auto flex items-center justify-between'>
            <Link href='/'>
                <Image
                    src='./cloudLogo.svg'
                    alt='cloud logo'
                    width={60}
                    height={60}
                />
            </Link>
            <nav className='flex gap-5'>
                <Link className='text-white' href='/'>Домой</Link>
                <Link className='text-white' href='/auth'>Авторизация</Link>
            </nav>
        </div>
    </header>
  )
}

export default Header