import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as Api from '../../../api';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
    const token = (await cookies()).get('_token')?.value;
    
    if(!token) redirect('/auth');
    
    try {
        const userData = await Api.auth.profile(token)
        return <ProfileClient userData={userData}/>
    } catch (e) {
        redirect('/auth');
    }
}