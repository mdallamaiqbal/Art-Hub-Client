import { protectedFetch, serverFetch, serverMutation } from "../core/server";


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

 export const getOrderByUser = async(userId)=>{
    return protectedFetch(`/api/orders?userId=${userId}`);
 }
 

export const getUserPurchaseHistory = async (userId) => {
    return serverFetch(`/api/user-purchases/${userId}`);
};

export const checkSingleArtPurchase = async (userId, artId) => {
    return serverFetch(`/api/orders?userId=${userId}&artId=${artId}`);
};