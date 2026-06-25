'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link'; 
import ArtFilters from './ArtFilters';

const ArtGalleryClient = ({ initialArts }) => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const categories = useMemo(() => {
        const allCats = initialArts.map(art => art.category).filter(Boolean);
        return [...new Set(allCats)];
    }, [initialArts]);

    const filteredAndSortedArts = useMemo(() => {
        let result = [...initialArts];

        if (search.trim()) {
            const query = search.toLowerCase();
            result = result.filter(art => 
                art.title?.toLowerCase().includes(query) || 
                art.artistName?.toLowerCase().includes(query)
            );
        }

        if (category !== 'all') {
            result = result.filter(art => art.category === category);
        }

        if (minPrice !== '') {
            result = result.filter(art => Number(art.price) >= Number(minPrice));
        }

        if (maxPrice !== '') {
            result = result.filter(art => Number(art.price) <= Number(maxPrice));
        }

        if (sortBy === 'price-low') {
            result.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => Number(b.price) - Number(a.price));
        } else if (sortBy === 'newest') {
            result.sort((a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id));
        }

        return result;
    }, [initialArts, search, category, minPrice, maxPrice, sortBy]);

    return (
        <>
            <ArtFilters 
                search={search} setSearch={setSearch}
                category={category} setCategory={setCategory}
                minPrice={minPrice} setMinPrice={setMinPrice}
                maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                sortBy={sortBy} setSortBy={setSortBy}
                categories={categories}
            />

            {filteredAndSortedArts.length === 0 ? (
                <div className="w-full text-center py-20 bg-[#16161a] rounded-2xl border border-gray-800/60">
                    <p className="text-gray-400 text-base">No artworks found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
                    {filteredAndSortedArts.map((art) => (
                        <div 
                            key={art._id} 
                            className="border border-gray-800 bg-[#16161a] rounded-xl overflow-hidden shadow-xl hover:border-gray-700/80 transition flex flex-col justify-between group"
                        >
                            <div>
                                <Link href={`/arts/${art._id}`} className="block aspect-square w-full overflow-hidden bg-gray-900 relative cursor-pointer">
                                    <img 
                                        src={art.imageUrl} 
                                        alt={art.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                    <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wider bg-black/70 backdrop-blur-md text-purple-300 border border-purple-800/40 px-2.5 py-1 rounded-full font-bold">
                                        {art.category}
                                    </span>
                                </Link>
                                
                                <div className="p-4">
                                    <Link href={`/arts/${art._id}`}>
                                        <h3 className="text-base font-bold text-gray-100 truncate hover:text-purple-400 transition cursor-pointer">{art.title}</h3>
                                    </Link>
                                    {/* <p className="text-gray-400 text-xs mt-1 line-clamp-2 h-8">{art.description}</p> */}
                                </div>
                            </div>

                            <div className="p-4 pt-0">
                                <div className="text-lg font-black text-pink-500 mb-3">
                                    ${typeof art.price === 'number' ? art.price.toFixed(2) : art.price}
                                </div>
                                
                                <div className="flex items-center gap-3 bg-gray-900/50 p-2 rounded-lg border border-gray-800/40 mb-3">
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
                                <Link 
                                    href={`/arts/${art._id}`}
                                    className="block w-full text-center bg-[#1b1b22] hover:bg-linear-to-r hover:from-[#a78bfa] hover:to-[#f472b6] text-purple-300 hover:text-black border border-purple-900/50 hover:border-transparent text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-500/20 tracking-wider uppercase"
                                >
                                    🛍️ View & Purchase
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ArtGalleryClient;