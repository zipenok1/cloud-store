import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as Api from '../../api';
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
    const token = (await cookies()).get('_token')?.value;
    
    if(!token) redirect('/auth');
    
    try {
        const userData = await Api.auth.profile(token)
        console.log('User data:', userData)
        return <DashboardClient userData={userData}/>
    } catch (e) {
        redirect('/auth');
    }
}