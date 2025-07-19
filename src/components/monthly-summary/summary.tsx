"use client";
import React, { useState, useEffect } from "react";
const fetchIncome=async()=>{
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
        return [];
    }
}
export default function MonthlySummary() {
    const [incomeData, setIncomeData] = useState([]);

    useEffect(() => {
        const getIncomeData = async () => {
            const data = await fetchIncome();
            setIncomeData(data);
        };
        getIncomeData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-2">Income Overview</h2>
                <p className="text-emerald-300">Track your monthly income performance and trends.</p>
            </div>
            
            <div className="grid gap-4">
                {incomeData.length > 0 ? (
                    incomeData.map((item: {month: string, totalincome: string}, index: number) => (
                        <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6 hover:border-emerald-400/30 transition-all duration-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-emerald-300 font-medium text-lg">{item.month}</span>
                                    <p className="text-gray-400 text-sm mt-1">Monthly Total</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-white font-bold text-2xl">
                                        ${parseFloat(item.totalincome).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </span>
                                    <p className="text-emerald-400 text-sm mt-1">Total Income</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-slate-800/30 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-12 text-center">
                        <div className="text-emerald-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-medium mb-2">No Income Data</h3>
                        <p className="text-gray-400">Start adding income entries to see your monthly summary.</p>
                    </div>
                )}
            </div>
        </div>
    );
}