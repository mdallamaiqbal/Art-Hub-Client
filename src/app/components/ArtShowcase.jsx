import React from 'react';
import Link from 'next/link';

const ArtShowcase = ({ arts = [] }) => {
    const artsArray = Array.isArray(arts) ? arts : (arts?.arts || []);
    const displayedArts = artsArray.slice(0, 8);

    if (displayedArts.length === 0) {
        return null;
    }

    return (
        <section className="bg-[#111115] text-gray-100 py-16 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-2">
                            ✨ Curated Collection
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wide text-transparent bg-clip-text bg-linear-to-r from-white via-gray-200 to-purple-400">
                            Featured Artworks
                        </h2>
                    </div>
                    <Link href="/browse" className="text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors flex items-center gap-1 group">
                        Explore All Artworks 
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {displayedArts.map((art) => (
                        <div 
                            key={art._id} 
                            className="group border border-gray-800/80 bg-[#16161a] rounded-2xl overflow-hidden shadow-xl hover:shadow-purple-500/5 hover:border-purple-500/30 transition-all duration-300 flex flex-col"
                        >
                            <div className="relative aspect-square w-full overflow-hidden bg-gray-900">
                                <img 
                                    src={art.imageUrl} 
                                    alt={art.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                {art.category && (
                                    <span className="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-md text-purple-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-gray-800">
                                        {art.category}
                                    </span>
                                )}
                            </div>


                            <div className="p-5 flex flex-col flex-1 justify-between">
                                <div className="mb-4">
                                    <h3 className="font-bold text-gray-100 text-base md:text-lg line-clamp-1 group-hover:text-purple-400 transition-colors">
                                        {art.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        by <span className="text-gray-300 font-medium">{art.artistName || "Unknown Artist"}</span>
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-800/60">
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Price</p>
                                        <p className="font-black text-pink-500 text-base">
                                            ${typeof art.price === 'number' ? art.price.toFixed(2) : art.price}
                                        </p>
                                    </div>
                                    <Link 
                                        href={`/browse/${art._id}`}
                                        className="bg-purple-600/10 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/20 hover:border-transparent font-bold text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all duration-300"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ArtShowcase;