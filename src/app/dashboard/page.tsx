import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
    const session = await getServerSession();
    if(!session || !session.user ) {
       redirect("/auth/signin");
    }
 
    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome to BucksBunny Dashboard</h1>
                <p className="text-gray-300">Manage your business finances with ease</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/dashboard/income">
                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer border border-emerald-500/20 hover:border-emerald-500/40 group">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                                <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">Income Management</h3>
                        <p className="text-gray-400 text-sm">Track and manage your income records</p>
                    </div>
                </Link>

                <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg shadow border border-slate-700/50 opacity-75">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Invoices</h3>
                    <p className="text-gray-400 text-sm">Coming soon...</p>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg shadow border border-slate-700/50 opacity-75">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Reports</h3>
                    <p className="text-gray-400 text-sm">Coming soon...</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <h2 className="text-xl font-bold text-white mb-4">Get Started</h2>
                <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow border border-emerald-500/20">
                    <p className="text-gray-300 mb-4">
                        Welcome to your BucksBunny dashboard! Start by managing your income records.
                    </p>
                    <Link href="/dashboard/income">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                            Go to Income Management
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}