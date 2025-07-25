"use client";
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const fetchIncomeData = async () => {
    try {
        const response = await fetch('/api/monthly-summary', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch income data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching income data:", error);
        return { dailyData: [], monthlyData: [] };
    }
};

interface IncomeData {
    date: string;
    totalincome: number;
}

interface TransformedIncomeData {
    date: string;
    income: number;
}

interface MonthlyData {
    month: string;
    totalincome: number;
}

interface TransformedMonthlyData {
    month: string;
    income: number;
}

export default function IncomeChart() {
    const [incomeData, setIncomeData] = useState<TransformedIncomeData[]>([]);
    const [monthlyData, setMonthlyData] = useState<TransformedMonthlyData[]>([]);
    const [chartType, setChartType] = useState<'line' | 'bar'>('line');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getIncomeData = async () => {
            setLoading(true);
            const data = await fetchIncomeData();
            
            const dateMap = new Map<string, number>();
            
            data.dailyData.forEach((item: IncomeData) => {
                const formattedDate = new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                const currentTotal = dateMap.get(formattedDate) || 0;
                dateMap.set(formattedDate, currentTotal + Number(item.totalincome));
            });
            
         
            const transformedDailyData: TransformedIncomeData[] = Array.from(dateMap.entries()).map(([date, income]) => ({
                date,
                income
            }));
            
          
            transformedDailyData.sort((a, b) => new Date(a.date + ', 2025').getTime() - new Date(b.date + ', 2025').getTime());
            
  
            const transformedMonthlyData: TransformedMonthlyData[] = data.monthlyData.map((item: MonthlyData) => ({
                month: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                income: Number(item.totalincome) || 0
            }));
            
            setIncomeData(transformedDailyData);
            setMonthlyData(transformedMonthlyData);
            setLoading(false);
        };
        getIncomeData();
    }, []);

    const CustomTooltip = ({ active, payload, label }: {
        active?: boolean;
        payload?: Array<{ value: number }>;
        label?: string;
    }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-800/90 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-3 shadow-lg">
                    <p className="text-emerald-300 font-medium">{`Date: ${label}`}</p>
                    <p className="text-white font-bold">
                        {`Income: $${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="bg-slate-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-emerald-500/20 rounded mb-4 w-1/3"></div>
                    <div className="h-64 bg-emerald-500/10 rounded"></div>
                </div>
            </div>
        );
    }

    if (incomeData.length === 0) {
        return (
            <div className="bg-slate-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-8 text-center">
                <div className="text-emerald-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h3 className="text-white font-medium mb-2">No Data to Chart</h3>
                <p className="text-gray-400">Add some income entries to see your income trend chart.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Daily Income Trend</h3>
                    <p className="text-emerald-300">Visual representation of your daily income over time</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setChartType('line')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            chartType === 'line'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-700/50 text-gray-300 hover:bg-emerald-500/20 hover:text-emerald-300'
                        }`}
                    >
                        Line Chart
                    </button>
                    <button
                        onClick={() => setChartType('bar')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            chartType === 'bar'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-700/50 text-gray-300 hover:bg-emerald-500/20 hover:text-emerald-300'
                        }`}
                    >
                        Bar Chart
                    </button>
                </div>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'line' ? (
                        <LineChart data={incomeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                            <XAxis 
                                dataKey="date" 
                                stroke="#9CA3AF"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis 
                                stroke="#9CA3AF"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line 
                                type="monotone" 
                                dataKey="income" 
                                stroke="#10B981" 
                                strokeWidth={3}
                                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                                activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                            />
                        </LineChart>
                    ) : (
                        <BarChart data={incomeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                            <XAxis 
                                dataKey="date" 
                                stroke="#9CA3AF"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis 
                                stroke="#9CA3AF"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar 
                                dataKey="income" 
                                fill="#10B981"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>

            {incomeData.length > 0 && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">Total Days</p>
                        <p className="text-white font-bold text-lg">{incomeData.length}</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">Average Daily Income</p>
                        <p className="text-emerald-400 font-bold text-lg">
                            ${(incomeData.reduce((sum, item) => sum + item.income, 0) / incomeData.length).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">Total Income</p>
                        <p className="text-emerald-400 font-bold text-lg">
                            ${incomeData.reduce((sum, item) => sum + item.income, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
            )}

            {/* Monthly Totals Section */}
            {monthlyData.length > 0 && (
                <div className="mt-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Monthly Totals</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {monthlyData.map((month, index) => (
                            <div key={index} className="bg-slate-700/30 rounded-lg p-4 text-center border border-emerald-500/20">
                                <p className="text-gray-400 text-sm">{month.month}</p>
                                <p className="text-emerald-400 font-bold text-xl">
                                    ${month.income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
