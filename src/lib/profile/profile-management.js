import { authHeader, serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUserProfile = async (email) => {
    return serverFetch(`/api/users?email=${email}`)
    // const res = await fetch(`${baseUrl}/api/users?email=${email}`, {
    //     cache: 'no-store'
    // });
    // return res.json();
};

export const updateUserProfile = async (profileData) => {
    const res = await fetch(`${baseUrl}/api/users/update-profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'
         },
        body: JSON.stringify(profileData)
    });
    return res.json();
};