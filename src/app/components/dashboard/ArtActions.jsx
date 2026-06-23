"use client";

import React from 'react';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DeleteArtButton from '../DeleteArtButton';
 

export default function ArtActions({ artId }) {
    const router = useRouter();

    return (
        <div className="flex items-center gap-2 md:gap-4">
            {/* Edit Button */}
            <button 
                onClick={() => router.push(`/dashboard/artist/manageArtworks/edit/${artId}`)}
                className="text-amber-500 hover:text-amber-400 p-1 hover:bg-amber-500/10 rounded transition"
                title="Edit Artwork"
            >
                <Pencil className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            
            
            <DeleteArtButton artId={artId} />
        </div>
    );
}