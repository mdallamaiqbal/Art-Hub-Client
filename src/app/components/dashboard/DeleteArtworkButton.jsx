'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { deleteArtwork } from '@/lib/actions/userRole'; 
import { Button } from '@heroui/react';

const DeleteArtworkButton = ({ artworkId, title }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const data = await deleteArtwork(artworkId);


            if (data.success || data.deletedCount > 0) {
                router.refresh(); 
                setIsOpen(false); 
            } else {
                alert(data.error || "Failed to delete the artwork.");
            }
        } catch (error) {
            console.error("Error deleting artwork:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button 
                onPress={() => setIsOpen(true)} 
                variant="light"
                isIconOnly
                className="text-red-500 hover:text-red-400 hover:bg-red-500/10 min-w-0"
                title="Delete Artwork"
            >
                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="relative bg-[#16161a] border border-gray-800 text-white rounded-xl sm:max-w-[360px] w-full shadow-2xl p-6 z-10 transform scale-100 transition-all">
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-4 p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition cursor-pointer"
                        >
                            <X className="size-4" />
                        </button>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-red-500/10 text-red-500 p-2 rounded-lg">
                                <AlertTriangle className="size-5" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-200">Confirm Delete</h3>
                        </div>
                        <div className="mb-6">
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Are you sure you want to permanently delete <span className="text-gray-200 font-semibold">{title || 'this artwork'}</span>? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex gap-2 w-full justify-end">
                            <Button 
                                onPress={() => setIsOpen(false)} 
                                className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium"
                            >
                                Cancel
                            </Button>
                            
                            <Button 
                                onPress={handleDelete}
                                isLoading={loading}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteArtworkButton;