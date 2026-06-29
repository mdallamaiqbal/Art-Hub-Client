import { serverFetch } from "../core/server";

export const getArtistSalesHistory = async (artistId) => {
    return serverFetch(`/api/artist-sales/${artistId}`);
};

export const getAdminAnalytics = async () => {
    return serverFetch("/api/admin/analytics", { cache: "no-store" });
};