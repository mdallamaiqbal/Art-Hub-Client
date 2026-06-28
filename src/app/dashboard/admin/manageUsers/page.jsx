import React from 'react';
import Link from 'next/link';
import { getUsersData } from '@/lib/api/transactions';
import RoleActions from '@/app/components/dashboard/RoleActions';

const ManageUsersPage = async ({ searchParams }) => {
    
    const allUsers = await getUsersData(); 

    const resolvedSearchParams = await searchParams;
    const currentPage = Number(resolvedSearchParams?.page) || 1;
    const itemsPerPage = 10; 

    const totalItems = allUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = allUsers.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-black mb-6 tracking-tight text-purple-400">
                    👥 Manage Users
                </h1>

                {paginatedUsers.length === 0 ? (
                    <div className="bg-[#16161a] border border-gray-800 rounded-2xl p-8 text-center text-gray-400">
                        No users found.
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto bg-[#16161a] border border-gray-800 rounded-2xl shadow-xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-800 bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider font-bold">
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Current Role</th>
                                        <th className="p-4 text-center">Actions (Change Role)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/60 text-sm text-gray-300">
                                    {paginatedUsers.map((user) => (
                                        <tr key={user._id || user.id} className="hover:bg-gray-900/30 transition-colors">
                                            <td className="p-4 font-semibold text-gray-200">
                                                {user.name || 'N/A'}
                                            </td>
                                            <td className="p-4 text-gray-400 font-mono text-xs">
                                                {user.email}
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${
                                                    user.role === 'admin' 
                                                    ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                                    : user.role === 'artist'
                                                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                    : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                                }`}>
                                                    {user.role || 'user'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <RoleActions userId={user._id || user.id} currentRole={user.role} />
                                            </td>
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

export default ManageUsersPage;