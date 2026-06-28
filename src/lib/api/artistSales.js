import { serverFetch } from "../core/server";

export const getArtistSalesHistory = async (artistId) => {
    return serverFetch(`/api/artist-sales/${artistId}`);
};