"use client"

import { DashboardProps } from "./DashboardPage.type"

const DashboardPage = (userData: DashboardProps) => {
    return(
        <div 
            className="bg-blue-400 px-4 py-4 rounded-2xl text-amber-50"
            key={userData.userData.id}
        >
           <h1>Когда то тебя звали {userData.userData.name} но теперь ты лох</h1>
           <p>Твоя почта {userData.userData.email}</p>
        </div>
    )
}

export default DashboardPage