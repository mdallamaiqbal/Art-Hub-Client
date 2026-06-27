import React from 'react';
import { redirect } from 'next/navigation';
import Restriction from '@/app/components/Restriction';
import { getUserSession } from '@/lib/core/session';
import { getArtId } from '@/lib/api/arts';
import Link from 'next/link';
import OrderSubmitButton from './OrderSubmitButton';
import { getOrderByUser } from '@/lib/api/order';


const PurchasePage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();

    if (!user) {
        redirect(`/auth/login?redirect=/browse/${id}/purchase`);
    }

    if (user.role !== 'user') {
        return <Restriction />;
    }
    const art = await getArtId(id);

    if (!art) {
        return (
            <div className="min-h-screen bg-[#111115] text-gray-100 flex items-center justify-center">
                <p className="text-xl font-bold text-red-400">Artwork not found.</p>
            </div>
        );
    }

    const orderData = {
        artId: art._id,
        artTitle: art.title,
        artistName: art.artistName || "Anonymous Artist",
        price: art.price,
        userId: user.id,
        userEmail: user.email,
        userName: user.name
    };

    const userOrders = await getOrderByUser(user.id);
    const currentPurchaseCount = userOrders.length;
    const tier ={
      name: 'Free',
      maxPurchase: 3
    }

    const hasReachedLimit = currentPurchaseCount >= tier.maxPurchase;

    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 p-6 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-400 mb-4 bg-gray-900 px-4 py-2 rounded-full border border-gray-800">
                Purchased: <span className="text-pink-500 font-bold">{currentPurchaseCount}</span> out of {tier.maxPurchase} (Tier: {tier.name})
            </p>

            {hasReachedLimit ? (
                <div className="max-w-md w-full bg-[#16161a] border border-red-900/50 p-6 rounded-2xl shadow-2xl text-center">
                    <h2 className="text-xl font-bold text-red-400 mb-2">🛑 Limit Exceeded</h2>
                    <p className="text-gray-400 text-sm mb-6">
                        You have reached your maximum purchase limit for the {tier.name} tier. Please upgrade your plan to purchase more.
                    </p>
                    <Link 
                        href={`/tier`}
                        className="inline-block bg-gray-800 hover:bg-gray-700 text-sm px-6 py-2 rounded-xl transition-colors font-semibold"
                    >
                        Upgrade Tier 🚀
                    </Link>
                </div>
            ) : (
                <div className="max-w-md w-full bg-[#16161a] border border-gray-800 p-6 rounded-2xl shadow-2xl">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 mb-6 uppercase tracking-wider pb-2 border-b border-gray-800">
                        💳 Order Confirmation
                    </h2>

                    <div className="flex gap-4 items-center bg-gray-900/50 p-4 rounded-xl border border-gray-800/60 mb-6">
                        <img 
                            src={art.imageUrl} 
                            alt={art.title} 
                            className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                        />
                        <div className="min-w-0">
                            <h3 className="font-bold text-gray-200 truncate">{art.title}</h3>
                            <p className="text-xs text-gray-400">Creator: {art.artistName || "Unknown Artist"}</p>
                            <p className="text-pink-500 font-black mt-1">
                                ${typeof art.price === 'number' ? art.price.toFixed(2) : art.price}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 mb-6 text-sm text-gray-400 bg-gray-900/30 p-4 rounded-xl border border-gray-800/40">
                        <p><span className="text-gray-500">Buyer:</span> {user.name}</p>
                        <p><span className="text-gray-500">Email:</span> {user.email}</p>
                    </div>

                    <OrderSubmitButton orderData={orderData} />
                    
                    <Link 
                        href={`/browse/${id}`}
                        className="block text-center mt-4 text-xs text-gray-500 hover:text-gray-400 transition-colors uppercase tracking-wider font-semibold"
                    >
                        Cancel & Go Back
                    </Link>
                </div>
            )}
        </div>
    );
};

export default PurchasePage;