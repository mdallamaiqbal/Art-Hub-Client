'use client';
import React from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend 
} from 'recharts';

const AdminCharts = ({ salesData, categoryData }) => {
    const COLORS = ['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 border border-gray-800 bg-[#16161a] p-6 rounded-2xl shadow-2xl">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-100 uppercase tracking-wider">Revenue Analytics</h3>
                    <p className="text-xs text-gray-500">Sales overview over recent periods</p>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} />
                            <YAxis stroke="#6b7280" fontSize={11} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#111115', borderColor: '#374151', borderRadius: '12px', color: '#f3f4f6' }}
                                itemStyle={{ color: '#ec4899' }}
                            />
                            <Area type="monotone" dataKey="sales" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="border border-gray-800 bg-[#16161a] p-6 rounded-2xl shadow-2xl flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-100 uppercase tracking-wider">Artworks by Category</h3>
                    <p className="text-xs text-gray-500">Distribution of categories</p>
                </div>
                <div className="h-64 w-full relative flex items-center justify-center mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#111115', borderColor: '#374151', borderRadius: '12px', color: '#f3f4f6' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center pt-2 border-t border-gray-800/50 mt-4">
                    {categoryData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                            <span className="text-xs text-gray-400 capitalize">{entry.name} ({entry.value})</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AdminCharts;