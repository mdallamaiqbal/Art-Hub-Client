import { getAllArts } from '@/lib/api/arts';
import React from 'react';

const BrowseArtworksPage = async () => {
    const arts = await getAllArts();

    return (
        <div className="p-4 md:p-8 min-h-screen bg-[#0f0f12] text-white w-full max-w-7xl mx-auto">
            <header className="mb-10">
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-[#a78bfa] to-[#f472b6] bg-clip-text text-transparent">
                    🎨 Browse Artworks
                </h1>
                <p className="text-gray-400 text-sm mt-1">Discover unique creations from talented artists.</p>
            </header>

            {!arts || arts.length === 0 ? (
                <div className="w-full text-center py-20 bg-[#16161a] rounded-2xl border border-gray-800/60">
                    <p className="text-gray-400 text-base">No artworks found in the gallery.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {arts.map((art) => (
                        <div 
                            key={art._id} 
                            className="border border-gray-800 bg-[#16161a] rounded-xl overflow-hidden shadow-xl hover:border-gray-700/80 transition flex flex-col justify-between"
                        >
                            <div>
                                <div className="aspect-square w-full overflow-hidden bg-gray-900 relative">
                                    <img 
                                        src={art.imageUrl} 
                                        alt={art.title} 
                                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                    />
                                    <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wider bg-black/70 backdrop-blur-md text-purple-300 border border-purple-800/40 px-2.5 py-1 rounded-full font-bold">
                                        {art.category}
                                    </span>
                                </div>
                                
                                <div className="p-4">
                                    <h3 className="text-base font-bold text-gray-100 truncate">{art.title}</h3>
                                    <p className="text-gray-400 text-xs mt-1 line-clamp-2 h-8">{art.description}</p>
                                </div>
                            </div>

                            <div className="p-4 pt-0">
                                <div className="text-lg font-black text-pink-500 mb-3">
                                    ${typeof art.price === 'number' ? art.price.toFixed(2) : art.price}
                                </div>
                                
                                <hr className="border-gray-800/60 mb-3" />
                                <div className="flex items-center gap-3 bg-gray-900/50 p-2 rounded-lg border border-gray-800/40">
                                    <img 
                                        src={art.artistImage || "https://i.ibb.co/Ds66VfH/default-avatar.png"} 
                                        alt={art.artistName} 
                                        className="w-7 h-7 rounded-full object-cover border border-purple-500/30 flex-shrink-0"
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[9px] text-gray-500 font-medium uppercase tracking-tight">Artist</span>
                                        <span className="text-xs font-bold text-gray-300 truncate">
                                            {art.artistName || "Anonymous"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrowseArtworksPage;