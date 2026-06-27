import { serverFetch, serverMutation } from "../core/server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrder = async (orderData) => {
    return serverMutation('/api/orders', orderData);
    //  const res = await fetch(`${baseUrl}/api/orders`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(orderData),
    // });
    // return res.json()
};


export const getUserPurchaseHistory = async (email) => {
    return serverFetch(`/api/user-purchases/${email}`);
};