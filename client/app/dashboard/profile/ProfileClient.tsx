"use client"

import { Button } from 'antd'
import {IProfileClient} from './ProfileClient.type'

import * as Api from '../../../api'

const ProfileClient = (userData: IProfileClient) => {

    const onClickExit = () => {
        if(window.confirm('вы действительно хотите выйти?')){
            Api.auth.exit()
            location.href = '/auth'
        }
    }

    return(
        <div 
            className="bg-blue-400 px-4 py-4 rounded-2xl text-amber-50 text-center"
            key={userData.userData.id}
        >
           <h2>Когда то тебя звали {userData.userData.name} но теперь ты лох</h2>
           <p className='py-1.5'>Твоя почта {userData.userData.email}</p>
           <Button 
                onClick={onClickExit}
                danger
            >
                Выйти
           </Button>
        </div>
    )
}

export default ProfileClient