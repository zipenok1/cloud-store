import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as Api from '../../api';
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
    const token = (await cookies()).get('_token')?.value
    if(!token) redirect('/auth')
    
    try{
        const filesData = await Api.files.getFiles(token)
        return <DashboardClient filesData={{ filesData }} token={token}/>
    } catch(e){
        redirect('/auth');
    }
}