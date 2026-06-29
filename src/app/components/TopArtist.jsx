"use client";
import React from 'react';

const TopArtists = ({ artists = [] }) => {
    if (!artists || artists.length === 0) return null;

    return (
        <section className="bg-[#111115] text-gray-100 py-16 px-6 md:px-10 border-t border-gray-900">
            <div className="max-w-5xl mx-auto"> 
                
                {/* হেডার */}
                <div className="mb-10 text-center md:text-left">
                    <span className="text-xs font-bold text-pink-500 uppercase tracking-widest block mb-2">
                        🔥 Popular Creators
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wide text-transparent bg-clip-text bg-linear-to-r from-white via-gray-200 to-pink-400">
                        Top 3 Selling Artists
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {artists.slice(0, 3).map((artist, index) => (
                        <div 
                            key={artist._id || index}
                            className="relative border border-gray-800/80 bg-[#16161a] p-8 rounded-2xl text-center shadow-xl hover:border-pink-500/30 transition-all duration-300 group"
                        >
                            <span className="absolute top-4 right-4 bg-pink-500/10 text-pink-400 font-black text-sm px-3 py-1 rounded-lg">
                                #{index + 1}
                            </span>
                            <div className="w-24 h-24 mx-auto mb-5 relative group-hover:scale-105 transition-transform duration-300">
                                {artist.artistImage ? (
                                    <img 
                                        src={artist.artistImage} 
                                        alt={artist.artistName}
                                        className="w-full h-full object-cover rounded-full p-1 bg-linear-to-tr from-purple-600 to-pink-600 shadow-lg"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div 
                                    className="w-full h-full bg-linear-to-tr from-purple-600 to-pink-600 rounded-full items-center justify-center font-black text-2xl text-white shadow-lg uppercase"
                                    style={{ display: artist.artistImage ? 'none' : 'flex' }}
                                >
                                    {artist.artistName ? artist.artistName.slice(0, 2) : "AR"}
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-100 text-lg line-clamp-1">
                                {artist.artistName || "Unknown Artist"}
                            </h3>
                            <div className="mt-4 pt-4 border-t border-gray-800/60 flex flex-col gap-1.5">
                                <p className="text-sm text-gray-400">
                                    Total Sales: <span className="text-purple-400 font-bold">{artist.totalSales || 0} Arts</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Revenue: <span className="text-emerald-400 font-bold">${(artist.totalRevenue || 0).toFixed(2)}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TopArtists;