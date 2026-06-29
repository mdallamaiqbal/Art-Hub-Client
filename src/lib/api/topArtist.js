import { serverFetch } from "../core/server";

export const getTopArtists = async () => {
    return serverFetch('/api/top-artists');
};