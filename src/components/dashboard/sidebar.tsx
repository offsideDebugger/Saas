"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import logo from "../../../assets/logo2.png"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ClientAvatar } from "./avatar";


export default function SideBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLElement>(null);
    const router = useRouter();

    const { data: session } = useSession();
    const userEmail = session?.user?.email || "Guest";
    const userName = session?.user?.username || "User";
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false);
            }
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                if (window.innerWidth < 640) {
                    setIsSidebarOpen(false);
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };

    // Handle navigation click - close sidebar on mobile
    const handleNavClick = () => {
        if (window.innerWidth < 640) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 640) {
                setIsSidebarOpen(false);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <div>
            {/* Mobile backdrop overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm sm:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
            
            <nav className="fixed  top-0 z-50 w-full bg-slate-900/80 backdrop-blur-sm border-b border-emerald-500/20">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start  rtl:justify-end">
                            <button 
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                type="button" 
                                className="inline-flex items-center p-2 text-sm text-gray-300 rounded-lg sm:hidden hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                aria-controls="logo-sidebar" 
                                aria-expanded={isSidebarOpen}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link href="/dashboard" className="flex ms-2 md:me-24">
                                <Image src={logo} className="me-3 rounded-full ring-2 ring-emerald-500/50" alt="BucksBunny Logo" width={50} height={50} />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">BucksBunny</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3 relative" ref={dropdownRef}>
                                <div >
                                    <button 
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        type="button" 
                                        className="flex cursor-pointer text-sm focus:ring-4 focus:ring-emerald-500/50 rounded-full" 
                                        aria-expanded={isUserDropdownOpen}
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <ClientAvatar 
                                            name={userName} 
                                            size="sm" 
                                            className="ring-2 ring-emerald-500/50 hover:ring-emerald-400/70 transition-all duration-200"
                                        />
                                    </button>
                                </div>
                                <div className={`absolute right-0 top-12 z-50 my-4 text-base list-none bg-slate-800/90 backdrop-blur-sm divide-y divide-emerald-500/20 rounded-lg shadow-lg border border-emerald-500/20 ${isUserDropdownOpen ? 'block' : 'hidden'}`} id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-white" role="none">
                                            {userName}
                                        </p>
                                        <p className="text-sm font-medium text-emerald-300 truncate" role="none">
                                            {userEmail}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-300 hover:bg-emerald-500/20 hover:text-white transition-colors cursor-pointer" role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside ref={sidebarRef} id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-slate-900/80 backdrop-blur-sm border-r border-emerald-500/20 sm:translate-x-0`} aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-transparent">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link href="/dashboard" onClick={handleNavClick} className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-emerald-500/20 hover:text-white group transition-colors">
                        <svg className="w-5 h-5 text-emerald-400 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                        </svg>
                        <span className="ms-3">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/income" onClick={handleNavClick} className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-emerald-500/20 hover:text-white group transition-colors">
                        <svg className="shrink-0 w-5 h-5 text-emerald-400 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Income</span>
                        </Link>
                    </li>
                      <li>
                        <Link href="/dashboard/monthly-summary" onClick={handleNavClick} className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-emerald-500/20 hover:text-white group transition-colors">
                        <svg className="shrink-0 w-5 h-5 text-emerald-400 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Monthly Summary</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/invoice-generate" onClick={handleNavClick} className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-emerald-500/20 hover:text-white group transition-colors">
                        <svg className="shrink-0 w-5 h-5 text-emerald-400 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Invoice Generator</span>
                        </Link>
                    </li>
                      <li>
                        <a href="#" onClick={handleLogout} className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-emerald-500/20 hover:text-white group transition-colors">
                        <svg className="shrink-0 w-5 h-5 text-emerald-400 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                        </a>
                    </li>
                </ul>
            </div>
            </aside>
        </div>
    );
}