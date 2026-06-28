import { serverFetch } from "../core/server";

export const getAllTransactions = async () => {
    return serverFetch('/api/admin/transactions');
};

export const getUsersData = async () => {
    return serverFetch('/api/admin/users');
};