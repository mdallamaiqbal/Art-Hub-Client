import React from 'react';
import { getUserSession } from '@/lib/core/session';

import { redirect } from 'next/navigation';
import { getArtistSalesHistory } from '@/lib/api/artistSales';

const SalesHistoryPage = async () => {
    const user = await getUserSession();
    const sales = await getArtistSalesHistory(user.id || user._id);

    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-black mb-6 tracking-tight text-purple-400">
                    💰 Sales History
                </h1>

                {sales.length === 0 ? (
                    <div className="bg-[#16161a] border border-gray-800 rounded-2xl p-8 text-center text-gray-400">
                        No sales recorded yet. Keep creating!
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-[#16161a] border border-gray-800 rounded-2xl shadow-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider font-bold">
                                    <th className="p-4">Artwork Title</th>
                                    <th className="p-4">Buyer Name</th>
                                    <th className="p-4">Purchase Date</th>
                                    <th className="p-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/60 text-sm text-gray-300">
                                {sales.map((sale) => (
                                    <tr key={sale._id} className="hover:bg-gray-900/30 transition-colors">
                                        <td className="p-4 font-semibold text-gray-200">{sale.artTitle}</td>
                                        <td className="p-4 text-gray-400">{sale.userName || "Anonymous Buyer"}</td>
                                        <td className="p-4 text-gray-400">
                                            {new Date(sale.purchaseDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="p-4 text-right font-bold text-pink-500">
                                            ${sale.price ? sale.price.toFixed(2) : '0.00'}
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

export default SalesHistoryPage;