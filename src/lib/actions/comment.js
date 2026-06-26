import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getCommentsByArtId = async (artId) => {
    try {
        
        return await serverFetch(`/api/comments/${artId}`);
    } catch (error) {
        console.error("getCommentsByArtId error:", error);
        return [];
    }
};


export const createComment = async (commentData) => {
    try {
        const res = await fetch(`${baseUrl}/api/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData)
        });
        return res.ok;
    } catch (error) {
        console.error("createComment error:", error);
        return false;
    }
};

export const updateComment = async (id, text, userEmail) => {
    try {
        const res = await fetch(`${baseUrl}/api/comments/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, userEmail })
        });
        return res.ok;
    } catch (error) {
        console.error("updateComment error:", error);
        return false;
    }
};


export const deleteComment = async (id, userEmail, loggedInArtistId) => {
    try {
        const res = await fetch(`${baseUrl}/api/comments/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail, loggedInArtistId })
        });
        return res.ok;
    } catch (error) {
        console.error("deleteComment error:", error);
        return false;
    }
};