'use client';

import React from 'react';

const ArtFilters = ({ 
    search, setSearch, 
    category, setCategory, 
    minPrice, setMinPrice, 
    maxPrice, setMaxPrice, 
    sortBy, setSortBy, 
    categories = [] 
}) => {
    return (
        <div className="bg-[#16161a] border border-gray-800 p-5 rounded-2xl mb-8 space-y-4">
            {/* Top row: Search and Sorting */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Search</label>
                    <input
                        type="text"
                        placeholder="Search by title or artist name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#0f0f12] border border-gray-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Sort By</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-[#0f0f12] border border-gray-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition cursor-pointer"
                    >
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Bottom row: Category and Price Ranges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-800/60">
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-[#0f0f12] border border-gray-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition cursor-pointer"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Min Price ($)</label>
                    <input
                        type="number"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full bg-[#0f0f12] border border-gray-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Max Price ($)</label>
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full bg-[#0f0f12] border border-gray-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition"
                    />
                </div>
            </div>
        </div>
    );
};

export default ArtFilters;