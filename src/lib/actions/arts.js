"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const createArt = async(newArtData)=>{
    const res = await fetch(`${baseUrl}/api/arts` , {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArtData)
    });
    return res.json()
}