import Restriction from '@/app/components/Restriction';
import { getArtId } from '@/lib/api/arts';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const PurchasePage = async({params}) => {
    const {id} = await params;
    const user = await getUserSession();
    if(!user){
        redirect(`/auth/login?redirect=/browse/${id}/purchase`)
    }
    if(user.role !=='user'){
        return  <Restriction />
    }
    const art = getArtId();
    return (
        <div>
            purchase
        </div>
    );
};

export default PurchasePage;