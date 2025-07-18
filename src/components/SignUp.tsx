"use client"
import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";
import axios from "axios";


export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handler = async () => {
        
    const data=axios.post("/api/auth/signup", {
        username,
        email,
        password,
    });

    const response = await data;
    if (response.status === 200) {
        console.log("User created successfully");
        redirect("/auth/signin");
    }
    else {
        console.error("User creation failed:", response.data);
        setError("User creation failed. Please try again.");
        return new Response(JSON.stringify({ error: "User creation failed" }), { status: 500 });
    }
}

     return <div>
           <div className="min-h-screen w-full bg-[#020617] relative flex items-center justify-center p-4">
            {/* Emerald Radial Glow Background */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)`,
              }}
            />
            
            <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-emerald-500/20 relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Join BucksBunny</h2>
            <form className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <input 
                onChange={(e) => setUsername(e.target.value)}
                type="text" 
                className="w-full px-4 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-gray-400"
                placeholder="your_username"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input 
                onChange={(e) => setEmail(e.target.value)}
                type="email" 
                className="w-full px-4 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-gray-400"
                placeholder="your@email.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input 
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                className="w-full px-4 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-gray-400"
                placeholder="••••••••"
                />
            </div>

            <button onClick={(e) => {
                e.preventDefault();
                handler();
            }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                    Create Account
            </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-300">
                {`Already have an account?`}
            <Link href={"/auth/signin"}><p className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer">Sign in</p></Link>
            </div>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
        </div>
        </div>
}