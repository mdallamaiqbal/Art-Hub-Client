const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const updateUserRole = async (userId, newRole) => {
    const res = await fetch(`${baseUrl}/api/admin/update-role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newRole }),
    });
    
    return res.json();
};

export const deleteArtwork = async (artworkId) => {
    const res = await fetch(`${baseUrl}/api/admin/artwork/${artworkId}`, {
        method: 'DELETE',
    });
    return res.json();
};