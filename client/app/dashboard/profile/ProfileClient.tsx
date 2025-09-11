"use client"

import {IProfileClient} from './ProfileClient.type'

const ProfileClient = (userData: IProfileClient) => {
    return(
        <div 
            className="bg-blue-400 px-4 py-4 rounded-2xl text-amber-50"
            key={userData.userData.id}
        >
           <h2>Когда то тебя звали {userData.userData.name} но теперь ты лох</h2>
           <p>Твоя почта {userData.userData.email}</p>
        </div>
    )
}

export default ProfileClient