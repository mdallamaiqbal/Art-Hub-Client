import React from 'react';
import Link from 'next/link';
import { getAllTransactions } from '@/lib/api/transactions';

const AllTransactionsPage = async ({ searchParams }) => {
    const allTransactions = await getAllTransactions();
    const resolvedSearchParams = await searchParams;
    const currentPage = Number(resolvedSearchParams?.page) || 1;
    const itemsPerPage = 10; 
    const totalItems = allTransactions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTransactions = allTransactions.slice(startIndex, endIndex);
    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-black mb-6 tracking-tight text-purple-400">
                    📊 View All Transactions
                </h1>

                {paginatedTransactions.length === 0 ? (
                    <div className="bg-[#16161a] border border-gray-800 rounded-2xl p-8 text-center text-gray-400">
                        No transactions found.
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto bg-[#16161a] border border-gray-800 rounded-2xl shadow-xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-800 bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider font-bold">
                                        <th className="p-4">Transaction ID</th>
                                        <th className="p-4">Type</th>
                                        <th className="p-4">User/Artist Info</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/60 text-sm text-gray-300">
                                    {paginatedTransactions.map((tx, index) => (
                                        <tr key={index} className="hover:bg-gray-900/30 transition-colors">
                                            <td className="p-4 font-mono text-xs text-gray-400">{tx.transactionId.toString()}</td>
                                            <td className="p-4">
                                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${tx.type === 'subscription'
                                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                    }`}>
                                                    {tx.type}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-gray-200 font-semibold mb-0.5">{tx.email}</div>
                                                <div className="text-[10px] text-gray-500 font-mono">ID: {tx.userId || 'N/A'}</div>
                                            </td>
                                            <td className="p-4 text-gray-400">
                                                {new Date(tx.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td className="p-4 text-right font-bold text-pink-500">${tx.amount ? tx.amount.toFixed(2) : '0.00'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-6 bg-[#16161a] border border-gray-800 px-6 py-4 rounded-2xl">
                                <span className="text-xs text-gray-400">
                                    Showing <span className="text-gray-200 font-bold">{startIndex + 1}</span> to{' '}
                                    <span className="text-gray-200 font-bold">{Math.min(endIndex, totalItems)}</span> of{' '}
                                    <span className="text-gray-200 font-bold">{totalItems}</span> entries
                                </span>

                                <div className="flex gap-2">
                                    {/* Previous Button */}
                                    <Link
                                        href={`?page=${currentPage - 1}`}
                                        className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all ${currentPage <= 1
                                                ? 'pointer-events-none opacity-40 border-gray-800 text-gray-600'
                                                : 'border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800'
                                            }`}
                                    >
                                        ◀ Previous
                                    </Link>

                                    {/* Next Button */}
                                    <Link
                                        href={`?page=${currentPage + 1}`}
                                        className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all ${currentPage >= totalPages
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

export default AllTransactionsPage;