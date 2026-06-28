import CommentSection from '@/app/components/commentSection';
import { getArtId } from '@/lib/api/arts';
import { checkSingleArtPurchase } from '@/lib/api/order';
import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';
import React from 'react';

const ArtDetailPage = async ({ params }) => {
    const { id } = await params;
  
    const [art, userSession] = await Promise.all([
        getArtId(id),
        getUserSession()
    ]);

    if (!art) {
        return (
            <div className="min-h-screen bg-[#111115] text-gray-100 flex items-center justify-center">
                <p className="text-xl font-bold text-purple-400">Artwork not found.</p>
            </div>
        );
    }

    const currentUser = userSession ? {
        email: userSession.email,
        name: userSession.name,
        role: userSession.role,
        image: userSession.image || userSession.avatar || "",
        artistId: userSession.artistId || userSession.id || userSession._id 
    } : null;

    const isLoggedIn = !!currentUser;
    const isUserRole = currentUser?.role === 'user';
    const canPurchase = isLoggedIn && isUserRole;

   
    let isAlreadyPurchased = false;
    if (isLoggedIn) {
        const orders = await checkSingleArtPurchase(currentUser.artistId, art._id);
        isAlreadyPurchased = orders && orders.length > 0;
    }

    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                
                {/* Main Art Detail Card */}
                <div className="border border-gray-800 bg-[#16161a] rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8">
                    
                    {/* 2-Column Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        
                        {/* Left Side: Image, Category, Title, Description */}
                        <div className="space-y-6">
                            <div className="relative aspect-square w-full overflow-hidden bg-gray-900 rounded-xl border border-gray-800">
                                <img 
                                    src={art.imageUrl} 
                                    alt={art.title} 
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider bg-black/70 backdrop-blur-md text-purple-300 border border-purple-800/40 px-3 py-1 rounded-full font-bold">
                                    {art.category}
                                </span>
                            </div>
                            
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-gray-100 tracking-tight mb-3">
                                    {art.title}
                                </h1>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {art.description}
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Price, Artist Bio, Purchase Button */}
                        <div className="flex flex-col space-y-6 bg-gray-900/30 p-6 rounded-xl border border-gray-800/60">
                            <div>
                                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-1">
                                    Price
                                </span>
                                <div className="text-3xl font-black text-pink-500">
                                    ${typeof art.price === 'number' ? art.price.toFixed(2) : art.price}
                                </div>
                            </div>

                            {/* Artist Profile Section */}
                            <div className="flex items-center gap-4 bg-gray-900/80 p-3 rounded-xl border border-gray-800">
                                <img 
                                    src={art.artistImage || "https://i.ibb.co/Ds66VfH/default-avatar.png"} 
                                    alt={art.artistName || "Artist"} 
                                    className="w-10 h-10 rounded-full object-cover border border-purple-500/30 flex-shrink-0"
                                />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Creator</span>
                                    <span className="text-sm font-bold text-gray-200 truncate">
                                        {art.artistName || "Anonymous Artist"}
                                    </span>
                                </div>
                            </div>

                            {/* --- Purchase Section Condition --- */}
                            {!isLoggedIn ? (
                                <Link
                                    href={`/auth/login?redirect=/browse/${id}`} 
                                    className="w-full text-center bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold py-3.5 px-6 rounded-xl transition-all tracking-wider uppercase border border-gray-700"
                                >
                                    🔒 Login to Purchase
                                </Link>
                            ) : !canPurchase ? (
                                <div className="w-full text-center bg-red-950/20 text-red-400 border border-red-900/40 text-xs font-semibold py-3 px-4 rounded-xl">
                                    Only standard user accounts can purchase.
                                </div>
                            ) : isAlreadyPurchased ? (
                                <button
                                    disabled
                                    className="w-full text-center bg-gray-800/40 text-gray-500 border border-gray-800/80 text-sm font-bold py-3.5 px-6 rounded-xl cursor-not-allowed tracking-wider uppercase"
                                >
                                    ✔ Already Purchased
                                </button>
                            ) : (
                                <Link
                                    href={`/browse/${id}/purchase`} 
                                    className="w-full text-center bg-[#1b1b22] hover:bg-linear-to-r hover:from-purple-400  hover:to-pink-500 text-purple-300 hover:text-black border border-purple-900/50 hover:border-transparent text-sm font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-500/20 tracking-wider uppercase"
                                >
                                    💳 Purchase Artwork
                                </Link>
                            )}
                        </div>

                    </div>
                </div>

                {/* --- Comment Section Condition --- */}
                {isLoggedIn ? (
                    <CommentSection 
                        artId={art._id} 
                        artistId={art.artistId} 
                        currentUser={currentUser} 
                    />
                ) : (
                    <div className="mt-8 border border-gray-800 bg-[#16161a] rounded-2xl p-6 text-center">
                        <p className="text-gray-400 text-sm mb-3">Want to join the discussion?</p>
                        <Link 
                            href={`/auth/login?redirect=/browse/${id}`}
                            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider transition-colors"
                        >
                            Login to Comment
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ArtDetailPage;