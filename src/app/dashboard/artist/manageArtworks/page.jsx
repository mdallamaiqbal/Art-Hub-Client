import { getArts } from '@/lib/api/arts';
import React from 'react';
import { Table } from "@heroui/react";
import { Pencil, Trash2 } from 'lucide-react'; 

const manageArtworksPage = async () => {
    const manageArtwork = await getArts();

    return (
        <div className="p-4 md:p-6  min-h-screen text-white w-full max-w-7xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-gray-200">Manage Artworks ({manageArtwork?.length || 0})</h2>
            
            <div className="w-full rounded-xl border border-gray-800/80 bg-[#16161a]">
                <Table className="dark w-full table-fixed"> 
                    <Table.ResizableContainer>
                        <Table.Content aria-label="Artworks management table">
                            <Table.Header>
                                <Table.Column isRowHeader defaultWidth="2.5fr" id="title" minWidth={140}>
                                    Art Title
                                    <Table.ColumnResizer />
                                </Table.Column>
                               
                                <Table.Column defaultWidth="1.2fr" id="category" minWidth={100}>
                                    Category
                                    <Table.ColumnResizer />
                                </Table.Column>
                                
                                <Table.Column defaultWidth="1fr" id="price" minWidth={70}>
                                    Price
                                    <Table.ColumnResizer />
                                </Table.Column>
                                
                                <Table.Column defaultWidth="1fr" id="actions" minWidth={80}>
                                    Actions
                                </Table.Column>
                            </Table.Header>
                            
                            <Table.Body>
                                {manageArtwork?.map((art) => (
                                    <Table.Row key={art._id} className="border-b border-gray-800/50 hover:bg-gray-900/40 transition">

                                        <Table.Cell>
                                            <div className="flex items-center gap-2 md:gap-3 py-1 min-w-0">
                                                {art.imageUrl && (
                                                    <img 
                                                        src={art.imageUrl} 
                                                        alt={art.title} 
                                                        className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover border border-gray-700 flex-shrink-0"
                                                    />
                                                )}
                                                <span className="font-semibold text-xs md:text-sm text-gray-100 truncate block">
                                                    {art.title}
                                                </span>
                                            </div>
                                        </Table.Cell>
                                        
                                        <Table.Cell>
                                            <span className="text-xs md:text-sm font-medium text-gray-300 truncate block">
                                                {art.category || 'Painting'}
                                            </span>
                                        </Table.Cell>
                                        
                                        <Table.Cell>
                                            <span className="text-xs md:text-sm text-gray-200 font-medium">
                                                ${typeof art.price === 'number' ? art.price.toFixed(2) : art.price}
                                            </span>
                                        </Table.Cell>
                                        
                                        <Table.Cell>
                                            <div className="flex items-center gap-2 md:gap-4">
                                                <button className="text-amber-500 hover:text-amber-400 p-1 hover:bg-amber-500/10 rounded transition">
                                                    <Pencil className="w-4 h-4 md:w-5 md:h-5" />
                                                </button>
                                                <button className="text-red-500 hover:text-red-400 p-1 hover:bg-red-500/10 rounded transition">
                                                    <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                                                </button>
                                            </div>
                                        </Table.Cell>
                                        
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ResizableContainer>
                </Table>
            </div>
        </div>
    );
};

export default manageArtworksPage;