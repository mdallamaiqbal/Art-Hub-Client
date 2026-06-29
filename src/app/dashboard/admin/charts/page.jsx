import AdminCharts from '@/app/components/dashboard/AdminCharts';
import { getAdminAnalytics } from '@/lib/api/artistSales';
import React from 'react';


const AdminAnalyticsPage = async () => {
    const stats = await getAdminAnalytics();

    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                <AdminCharts
                    salesData={stats?.salesChartData || []} 
                    categoryData={stats?.categoryData || []} 
                />
            </div>
        </div>
    );
};

export default AdminAnalyticsPage;