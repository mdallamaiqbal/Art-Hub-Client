import { authHeader, protectedFetch, serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllArts = async()=>{
     return serverFetch(`/api/all-arts`)
}

export const getArtId = async(id)=>{
     return serverFetch(`/api/all-arts/${id}`)
}


export const getArtistArts = async(artistId)=>{
    return serverFetch(`/api/my-arts?artistId=${artistId}`)
    // const res = await fetch(`${baseUrl}/api/my-arts?artistId=${artistId}`, {
    //     cache: 'no-store'
    // });
    // return res.json()
}

export const deleteArt = async (id) => {
    const res = await fetch(`${baseUrl}/api/arts/${id}`, {
        method: 'DELETE'
    });
    return res.json();
};

export const updateArt = async (id, updatedData) => {
    const res = await fetch(`${baseUrl}/api/arts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
             
        },
        body: JSON.stringify(updatedData)
    });
    return res.json();
};


