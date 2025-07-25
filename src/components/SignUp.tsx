"use client"
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";

export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handler = async () => {
        
        setError("");

        if (username.length < 3) {
            setError("Username must be at least 3 characters long");
            return;
        }
        if(!email.includes("@")) {
            setError("Invalid email address");
            return;
        }
        if(password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        setLoading(true);
        
        try {
            const response = await axios.post('/api/auth/signup', {
                username,
                email,
                password,
            });

            if (response.status === 200) {
                console.log("User created successfully");
                
                
                const result = await signIn('credentials', {
                    email,
                    password,
                    callbackUrl: "/dashboard",
                    redirect: false
                });
                
                if (result?.ok) {
                    window.location.href = "/dashboard";
                } else {
                    setError("Sign in after registration failed");
                }
            }
        } catch (error: unknown) {
            console.error("User creation failed:", error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { error?: string } } };
                if (axiosError.response?.data?.error) {
                    setError(axiosError.response.data.error);
                } else {
                    setError("User creation failed. Please try again.");
                }
            } else {
                setError("User creation failed. Please try again.");
            }
        } finally {
            setLoading(false);
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

            <button 
                onClick={(e) => {
                    e.preventDefault();
                    handler();
                }} 
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center"
            >
                {loading && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {loading ? 'Creating Account...' : 'Create Account'}
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