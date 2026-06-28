import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import Restriction from '@/app/components/Restriction';
import { getUserPurchaseHistory } from '@/lib/api/order';

const BoughtArtworksPage = async () => {
    const user = await getUserSession();

    if (!user) {
        redirect('/auth/login?redirect=/dashboard/user/purchaseHistory');
    }

    if (user.role !== 'user') {
        return <Restriction />;
    }

    const purchases = await getUserPurchaseHistory(user.id);

    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 mb-8 uppercase tracking-wider">
                    🎨 Bought Artworks
                </h1>

                {!purchases || purchases.length === 0 ? (
                    <div className="border border-gray-800 bg-[#16161a] rounded-2xl p-12 text-center">
                        <p className="text-gray-400 text-lg mb-4">You haven't purchased any artwork yet.</p>
                        <Link href="/browse" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-colors">
                            Browse Artworks
                        </Link>
                    </div>
                ) : (
                    /* Gallery Grid Layout */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {purchases.map((item) => (
                            <div 
                                key={item._id} 
                                className="group border border-gray-800 bg-[#16161a] rounded-2xl overflow-hidden shadow-2xl hover:border-purple-500/50 transition-all duration-300 flex flex-col"
                            >
                                {/* Artwork Image */}
                                <div className="relative aspect-square w-full bg-gray-900 overflow-hidden">
                                    <Image
                                        src={item.artImage || "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119"} 
                                        alt={item.artTitle}
                                        fill
                                        
                                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                       priority
                                    />
                                </div>

                                {/* Artwork Info */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-gray-100 truncate mb-1">
                                        {item.artTitle}
                                    </h3>
                                    <p className="text-xs text-gray-400 mb-3">
                                        By <span className="text-purple-400 font-medium">{item.artistName || "Unknown Artist"}</span>
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800/60">
                                        <div>
                                            <p className="text-[10px] uppercase text-gray-500 tracking-wider">Price Paid</p>
                                            <p className="text-lg font-black text-pink-500">
                                                ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                                            </p>
                                        </div>
                                        
                                        {/* Action Link to Details */}
                                        <Link 
                                            href={`/browse/${item.artId}`}
                                            className="bg-gray-800 hover:bg-purple-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl uppercase tracking-wider transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                    
                                    <p className="text-[10px] text-gray-500 mt-3 text-right">
                                        Purchased: {new Date(item.purchaseDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoughtArtworksPage;