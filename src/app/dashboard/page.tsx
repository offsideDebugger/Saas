import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    
   
    
    // Simple session check
    if (!session || !session.user) {
       redirect("/auth/signin");
    }
 
    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome to BucksBunny Dashboard</h1>
                <p className="text-gray-300 text-sm md:text-base">Manage your business finances with ease</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <Link href="/dashboard/income" className="cursor-pointer">
                    <div className="bg-slate-800/50 backdrop-blur-sm p-5 md:p-7 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer border border-emerald-500/20 hover:border-emerald-500/40 group h-[200px] md:h-[220px] flex flex-col">
                        <div className="flex items-center mb-4 md:mb-5">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                                <svg className="w-6 h-6 md:w-7 md:h-7 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between overflow-hidden">
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3 group-hover:text-emerald-300 transition-colors">Income Management</h3>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">Track and manage your income records</p>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/invoice-generate" className="cursor-pointer">
                    <div className="bg-slate-800/50 backdrop-blur-sm p-5 md:p-7 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer border border-emerald-500/20 hover:border-emerald-500/40 group h-[200px] md:h-[220px] flex flex-col">
                        <div className="flex items-center mb-4 md:mb-5">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                                <svg className="w-6 h-6 md:w-7 md:h-7 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between overflow-hidden">
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3 group-hover:text-emerald-300 transition-colors">Invoice Generator</h3>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">Create professional invoices with PDF download</p>
                        </div>
                    </div>
                </Link>
                
                <Link href="/dashboard/monthly-summary" className="cursor-pointer">
                    <div className="bg-slate-800/50 backdrop-blur-sm p-5 md:p-7 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer border border-emerald-500/20 hover:border-emerald-500/40 group h-[200px] md:h-[220px] flex flex-col">
                        <div className="flex items-center mb-4 md:mb-5">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                                <svg className="w-6 h-6 md:w-7 md:h-7 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between overflow-hidden">
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3 group-hover:text-emerald-300 transition-colors">Monthly Reports</h3>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">View charts and analytics of your monthly income trends</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 md:mt-8">
                <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Get Started</h2>
                <div className="bg-slate-800/50 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow border border-emerald-500/20">
                    <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                        Welcome to your BucksBunny dashboard! Manage your income, view analytics, and create professional invoices.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                        <Link href="/dashboard/income" className="cursor-pointer">
                            <button className="w-full sm:w-auto bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors text-sm md:text-base">
                                Manage Income
                            </button>
                        </Link>
                        <Link href="/dashboard/monthly-summary" className="cursor-pointer">
                            <button className="w-full sm:w-auto bg-slate-700 cursor-pointer hover:bg-slate-600 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors border border-emerald-500/30 hover:border-emerald-500/50 text-sm md:text-base">
                                View Reports
                            </button>
                        </Link>
                        <Link href="/dashboard/invoice-generate" className="cursor-pointer">
                            <button className="w-full sm:w-auto bg-slate-700 cursor-pointer hover:bg-slate-600 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors border border-emerald-500/30 hover:border-emerald-500/50 text-sm md:text-base">
                                Create Invoice
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}