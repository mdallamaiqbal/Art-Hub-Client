
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getArts = async()=>{
    const res = await fetch(`${baseUrl}/api/all-arts`);
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


