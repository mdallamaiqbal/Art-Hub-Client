import React from 'react';
import Link from 'next/link';
import { getAllArts } from '@/lib/api/arts';

import DeleteArtButton from '@/app/components/DeleteArtButton';

const ManageArtworksPage = async ({ searchParams }) => {
    const resolvedSearchParams = await searchParams;

    const allArtworks = await getAllArts();
    const currentPage = Number(resolvedSearchParams?.page) || 1;
    const itemsPerPage = 10;

    const totalItems = allArtworks?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedArtworks = allArtworks.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-black mb-6 tracking-tight text-purple-400">
                    🖼️ Manage All Artworks
                </h1>

                {paginatedArtworks.length === 0 ? (
                    <div className="bg-[#16161a] border border-gray-800 rounded-2xl p-8 text-center text-gray-400">
                        No artworks found.
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto bg-[#16161a] border border-gray-800 rounded-2xl shadow-xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-800 bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider font-bold">
                                        <th className="p-4">Title</th>
                                        <th className="p-4">Artist Name</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4 text-center">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-800/60 text-sm text-gray-300">
                                    {paginatedArtworks.map((art) => (
                                        <tr
                                            key={art._id || art.id}
                                            className="hover:bg-gray-900/30 transition-colors"
                                        >
                                            <td className="p-4 font-semibold text-gray-200">
                                                {art.title || 'Untitled'}
                                            </td>

                                            <td className="p-4 text-gray-400">
                                                {art.artistName ||
                                                    art.artistEmail ||
                                                    'Unknown Artist'}
                                            </td>

                                            <td className="p-4 font-bold text-pink-500">
                                                {art.price
                                                    ? `$${Number(
                                                          art.price
                                                      ).toFixed(2)}`
                                                    : 'Free'}
                                            </td>

                                            <td className="p-4 text-center">
                                                {/* 💡 ২. এখানে artworkId বদলে artId দিন, কারণ বাটনের ভেতরে artId ডিক্লেয়ার করা */}
                                                <DeleteArtButton
                                                    artId={art._id || art.id}
                                                    title={art.title}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-6 bg-[#16161a] border border-gray-800 px-6 py-4 rounded-2xl">
                                <span className="text-xs text-gray-400">
                                    Showing{' '}
                                    <span className="text-gray-200 font-bold">
                                        {startIndex + 1}
                                    </span>{' '}
                                    to{' '}
                                    <span className="text-gray-200 font-bold">
                                        {Math.min(endIndex, totalItems)}
                                    </span>{' '}
                                    of{' '}
                                    <span className="text-gray-200 font-bold">
                                        {totalItems}
                                    </span>{' '}
                                    entries
                                </span>

                                <div className="flex gap-2">
                                    <Link
                                        href={`?page=${currentPage - 1}`}
                                        className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all ${
                                            currentPage <= 1
                                                ? 'pointer-events-none opacity-40 border-gray-800 text-gray-600'
                                                : 'border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800'
                                        }`}
                                    >
                                        ◀ Previous
                                    </Link>

                                    <Link
                                        href={`?page=${currentPage + 1}`}
                                        className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all ${
                                            currentPage >= totalPages
                                                ? 'pointer-events-none opacity-40 border-gray-800 text-gray-600'
                                                : 'border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800'
                                        }`}
                                    >
                                        Next ▶
                                    </Link>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ManageArtworksPage;