import MonthlySummary from "@/components/monthly-summary/summary";
import IncomeChart from "@/components/monthly-summary/income-chart";

export default function MonthlySummaryPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
            <div className="relative z-10 p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-6">Monthly Summary</h1>
                    
                    <div className="space-y-8">
                        <IncomeChart />
                        <MonthlySummary />
                    </div>
                </div>
            </div>
        </div>
    );
}
