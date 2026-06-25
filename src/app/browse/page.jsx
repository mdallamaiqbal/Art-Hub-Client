import { getAllArts } from '@/lib/api/arts';
import React from 'react';
import ArtGalleryClient from '../components/ArtGalleryClient';


const BrowseArtworksPage = async () => {
    const arts = await getAllArts();

    return (
        <div className="p-4 md:p-8 min-h-screen  text-white w-full max-w-screen-2xl mx-auto">
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
                <ArtGalleryClient initialArts={arts} />
            )}
        </div>
    );
};

export default BrowseArtworksPage;