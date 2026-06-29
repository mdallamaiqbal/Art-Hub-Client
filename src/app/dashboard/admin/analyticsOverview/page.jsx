import React from 'react';
import { Users, Palette, ShoppingBag, DollarSign } from 'lucide-react';
import { getAdminAnalytics } from '@/lib/api/artistSales';


const AdminAnalyticsPage = async () => {
    const stats = await getAdminAnalytics();
    const totalUsers = stats?.totalUsers || 0;
    const totalArtists = stats?.totalArtists || 0;
    const totalArtworksSold = stats?.totalArtworksSold || 0;
    const totalRevenue = stats?.totalRevenue || 0;
    const cardData = [
        {
            id: 1,
            title: 'Total Users',
            value: totalUsers.toLocaleString(),
            icon: Users,
            color: 'from-blue-500/10 to-cyan-500/10 text-blue-400 border-blue-500/20',
        },
        {
            id: 2,
            title: 'Total Artists',
            value: totalArtists.toLocaleString(),
            icon: Palette,
            color: 'from-purple-500/10 to-indigo-500/10 text-purple-400 border-purple-500/20',
        },
        {
            id: 3,
            title: 'Artworks Sold',
            value: totalArtworksSold.toLocaleString(),
            icon: ShoppingBag,
            color: 'from-pink-500/10 to-rose-500/10 text-pink-400 border-pink-500/20',
        },
        {
            id: 4,
            title: 'Total Revenue',
            value: `$${typeof totalRevenue === 'number' ? totalRevenue.toFixed(2) : totalRevenue}`,
            icon: DollarSign,
            color: 'from-amber-500/10 to-orange-500/10 text-amber-400 border-amber-500/20',
        },
    ];

    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 uppercase tracking-wider">
                        📈 Admin Dashboard Overview
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">Real-time platform performance and live statistics</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cardData.map((card) => {
                        const IconComponent = card.icon;
                        return (
                            <div
                                key={card.id}
                                className={`relative overflow-hidden border bg-[#16161a] p-6 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-between ${card.color.split(' ').pop()}`}
                            >
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                        {card.title}
                                    </p>
                                    <h3 className="text-2xl md:text-3xl font-black text-gray-100 tracking-tight">
                                        {card.value}
                                    </h3>
                                </div>

                                <div className={`p-3 rounded-xl bg-linear-to-br ${card.color.split(' text-')[0]} ${card.color.split(' border-')[0].split(' ').pop()}`}>
                                    <IconComponent className="w-6 h-6 md:w-7 md:h-7" />
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default AdminAnalyticsPage;