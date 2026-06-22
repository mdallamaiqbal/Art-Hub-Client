"use client"
import { useSession } from '@/lib/auth-client';
import React from 'react';

const ArtistDashboardHomePage = () => {
    const {data: session, isPending} = useSession();

    if(isPending){
        return <div>Loading...</div>
    }
    const user = session?.user
    return (
        <div className='text-3xl font-bold'>
            <h1>Welcome, <span className='font-semibold'>{user?.name}</span></h1>
        </div>
    );
};

export default ArtistDashboardHomePage;