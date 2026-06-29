"use server"

import { authHeader, serverMutation } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const createArt = async(newArtData)=>{
    // return serverMutation('/api/arts', newArtData);
    const res = await fetch(`${baseUrl}/api/arts` , {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArtData)
    });
    return res.json()
}

export const getArtById = async (id) => {
    const res = await fetch(`${baseUrl}/api/arts/${id}`, {
        method: 'GET'
    });
    return res.json();
};