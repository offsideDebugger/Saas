import InvoiceForm from "@/components/invoice-generator/invoiceGenerator";

export default function InvoiceGeneratePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
            <div className="relative z-10">
                <InvoiceForm />
            </div>
        </div>
    );
}
