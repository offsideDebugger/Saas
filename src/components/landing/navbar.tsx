"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image"
import logo from "../../../assets/logo2.png"
import Link from "next/link"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close menu when screen size changes to desktop
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return <div ref={menuRef}>
        <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 backdrop-blur-md bg-[#020617]/80">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={logo} className="rounded-full" alt="BucksBunny Logo" width={60} height={60}/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BucksBunny</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link href="/auth/signin"><button type="button" className="text-black bg-green-400  focus:ring-1 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer hover:text-green-500 hover:bg-green-800">Get started</button></Link>
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button" 
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
                aria-controls="navbar-sticky" 
                aria-expanded={isMenuOpen}
            >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-slate-800/95 backdrop-blur-sm md:bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 shadow-lg md:shadow-none">
            <li>
                <a href="#" className="block py-2 px-3 text-white md:text-green-700 rounded-sm md:hover:bg-transparent md:p-0" >Home</a>
            </li>
            <li>
                <Link href="/about" className="block py-2 px-3 text-zinc-300 rounded-sm hover:text-green-700 hover:bg-emerald-500/20 md:hover:bg-transparent md:p-0 ">About</Link>
            </li>
           
            <li>
                <a href="mailto:thakurwanidakshh@gmail.com" className="block py-2 px-3 text-zinc-300 rounded-sm hover:bg-emerald-500/20 hover:text-green-700 md:hover:bg-transparent md:p-0 ">Contact</a>
            </li>
            </ul>
        </div>
        </div>
        </nav>
    </div>
}