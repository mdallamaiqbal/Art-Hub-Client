
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllArts = async()=>{
    const res = await fetch(`${baseUrl}/api/all-arts`);
    return res.json()
}
export const getArtistArts = async(email)=>{
    const res = await fetch(`${baseUrl}/api/my-arts?email=${email}`, {
        cache: 'no-store'
    });
    return res.json()
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


