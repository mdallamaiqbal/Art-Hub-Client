import CommentSection from '@/app/components/commentSection';
import { getArtId } from '@/lib/api/arts';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const ArtDetailPage = async ({ params }) => {
    const { id } = await params;
  
   
    const [art, userSession] = await Promise.all([
        getArtId(id),
        getUserSession()
    ]);

    const currentUser = userSession ? {
        email: userSession.email,
        name: userSession.name,
        image: userSession.image || userSession.avatar || "",
        artistId: userSession.artistId || userSession.id || userSession._id 
    } : null;
    if (!art) {
        return (
            <div className="min-h-screen bg-[#111115] text-gray-100 flex items-center justify-center">
                <p className="text-xl font-bold text-purple-400">Artwork not found.</p>
            </div>
        );
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
                        <div className="flex flex-col  h-[10vz] space-y-6 bg-gray-900/30 p-6 rounded-xl border border-gray-800/60">
                            <div>
                                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-1">
                                    Price
                                </span>
                                {/* Price requirement met: text-3xl */}
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

                            {/* Action Button */}
                            <button 
                                className="w-full text-center bg-[#1b1b22] hover:bg-gradient-to-r hover:from-[#a78bfa] hover:to-[#f472b6] text-purple-300 hover:text-black border border-purple-900/50 hover:border-transparent text-sm font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-500/20 tracking-wider uppercase"
                            >
                                💳 Purchase Artwork
                            </button>
                        </div>

                    </div>
                </div>

               <CommentSection 
                    artId={art._id} 
                    artistId={art.artistId} 
                    currentUser={currentUser} 
                />

            </div>
        </div>
    );
};

export default ArtDetailPage;