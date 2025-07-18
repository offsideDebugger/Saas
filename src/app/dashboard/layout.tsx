import type { Metadata } from "next";
import SideBar from "@/components/dashboard/sidebar";

export const metadata: Metadata = {
  title: "Dashboard - BucksBunny",
  description: "Manage your invoices and income",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-[#020617] relative">
      {/* Emerald Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)`,
        }}
      />
      
      <SideBar />
      <div className="p-4 sm:ml-64">
        <div className="mt-14 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
