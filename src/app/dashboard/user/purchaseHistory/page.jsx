import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import Restriction from '@/app/components/Restriction';
import { getUserPurchaseHistory } from '@/lib/api/order';

const PurchaseHistoryPage = async () => {
    const user = await getUserSession();

    if (!user) {
        redirect('/auth/login?redirect=/dashboard/user/purchaseHistory');
    }

    if (user.role !== 'user') {
        return <Restriction />;
    }

    const purchases = await getUserPurchaseHistory(user.email);

    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 mb-8 uppercase tracking-wider">
                    💳 My Purchase History
                </h1>

                {!purchases || purchases.length === 0 ? (
                    <div className="border border-gray-800 bg-[#16161a] rounded-2xl p-12 text-center">
                        <p className="text-gray-400 text-lg mb-4">You haven't purchased any artwork yet.</p>
                        <Link href="/browse" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-colors">
                            Browse Artworks
                        </Link>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto border border-gray-800 bg-[#16161a] rounded-2xl shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 bg-gray-900/50 text-purple-300 uppercase text-xs tracking-wider font-bold">
                                    <th className="py-4 px-6">Artwork Name</th>
                                    <th className="py-4 px-6">Artist</th>
                                    <th className="py-4 px-6">Price</th>
                                    <th className="py-4 px-6">Purchase Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/60 text-sm text-gray-300">
                                {purchases.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-900/30 transition-colors">
                                        <td className="py-4 px-6 font-semibold text-gray-100">
                                            {item.artTitle}
                                        </td>
                                        <td className="py-4 px-6 text-gray-400">
                                            {item.artistName || "Unknown Artist"}
                                        </td>
                                        <td className="py-4 px-6 font-bold text-pink-500">
                                            ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                                        </td>
                                        <td className="py-4 px-6 text-gray-400 text-xs">
                                            {new Date(item.purchaseDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseHistoryPage;