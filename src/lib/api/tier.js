import { serverFetch } from "../core/server";

export const getTierById = async(tierId)=>{
    return serverFetch(`/api/tier?tier_id=${tierId}`);
 }