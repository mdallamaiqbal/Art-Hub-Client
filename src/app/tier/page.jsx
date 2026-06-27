import React from 'react';
import { Card, CardHeader, CardFooter, Button } from "@heroui/react";
import Link from 'next/link';

const TierPage = () => {
    const tiers = [
        {
            name: "Free",
            id: "user_free",
            price: "$0",
            limit: "3 paintings",
            description: "Perfect for art enthusiasts getting started.",
            features: ["Access to browse all arts", "Standard support", "Max 3 purchases allowed"],
            isPopular: false,
            buttonText: "Current Plan"
        },
        {
            name: "Pro",
            id: "user_pro",
            price: "$9.99",
            limit: "9 paintings",
            description: "For active collectors who want more freedom.",
            features: ["Access to browse all arts", "Priority support", "Max 9 purchases allowed", "Exclusive tier badge"],
            isPopular: true,
            buttonText: "Upgrade to Pro"
        },
        {
            name: "Premium",
            id: "user_premium",
            price: "$19.99",
            limit: "Unlimited",
            description: "The ultimate tier for hardcore art connoisseurs.",
            features: ["Access to browse all arts", "24/7 VIP support", "Unlimited purchases", "Early access to new drops"],
            isPopular: false,
            buttonText: "Go Premium"
        }
    ];

    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 p-6 flex flex-col items-center justify-center">

            <div className="text-center mb-12 max-w-xl">
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 uppercase tracking-wider mb-3">
                    Subscription Tiers
                </h1>
                <p className="text-sm text-gray-400">
                    Choose the perfect tier to expand your art collection. Upgrade anytime to lift your purchase limits.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
                {tiers.map((tier, index) => (
                    <Card
                        key={index}
                        className={`bg-[#16161a] border ${tier.isPopular ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-gray-800'
                            } p-6 rounded-2xl flex flex-col justify-between transition-transform duration-300 hover:scale-105`}
                    >
                        <CardHeader className="flex flex-col items-start p-0 mb-6 relative">
                            {tier.isPopular && (
                                <span className="absolute -top-3 -right-3 bg-linear-to-r from-purple-500 to-pink-500 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shadow-md">
                                    Popular
                                </span>
                            )}
                            <h2 className="text-xl font-bold text-gray-200 tracking-wide uppercase mb-1">{tier.name}</h2>
                            <p className="text-xs text-gray-500 mb-4">{tier.description}</p>

                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
                                    {tier.price}
                                </span>
                                {tier.price !== "$0" && <span className="text-xs text-gray-500">/ month</span>}
                            </div>

                            <div className="text-xs bg-gray-900/60 text-pink-400 border border-gray-800/80 px-3 py-1.5 rounded-lg w-full font-medium mt-2">
                                📊 Limit: <span className="font-bold">{tier.limit}</span>
                            </div>
                        </CardHeader>

                        <div className="flex-grow mb-8">
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">What's included:</p>
                            <ul className="space-y-2.5 text-sm text-gray-400">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center gap-2">
                                        <span className="text-purple-400 text-xs">⚡</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <CardFooter className="p-0">
                            {tier.name === "Free" ? (
                                <Button
                                    className="w-full font-bold text-sm tracking-wider uppercase py-5 rounded-xl bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed"
                                    disabled
                                >
                                    {tier.buttonText}
                                </Button>
                            ) : (
                                <form action="/api/checkout_sessions" method="POST" className="w-full">
                                    <input type="hidden" name='tier_id' value={tier.id} />
                                    <Button
                                        type="submit"
                                        className={`w-full font-bold text-sm tracking-wider uppercase py-6 rounded-xl transition-all cursor-pointer ${tier.isPopular
                                                ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:opacity-90 hover:scale-[1.02]"
                                                : "bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-800"
                                            }`}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </form>
                                // <Link
                                //     href={`/auth/login?redirect=/tier&plan=${tier.name.toLowerCase()}`}
                                //     className="w-full"
                                // >
                                //     <Button

                                //     >

                                //     </Button>
                                // </Link>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Link
                href="/browse"
                className="mt-12 text-xs text-gray-500 hover:text-gray-400 transition-colors uppercase tracking-wider font-semibold"
            >
                ← Back to Browse Artworks
            </Link>
        </div>
    );
};

export default TierPage;