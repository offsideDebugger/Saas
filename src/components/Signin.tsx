"use client"
import { signIn } from "next-auth/react"
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [error, setError] = useState("");
     const [isLoading, setIsLoading] = useState(false);

     const handler = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);
          setError("");
          
          try {
               const result = await signIn("credentials", { 
                    email, 
                    password,
                    callbackUrl: "/dashboard",
                    redirect: false
               });
               
               if (result?.error) {
                    setError("Invalid email or password");
                    setIsLoading(false);
               } else if (result?.ok) {
                    // Successful sign in, NextAuth will handle the redirect
                    window.location.href = "/dashboard";
               }
               
          } catch (error) {
               setError("An error occurred during sign in");
               console.error("Sign in error:", error);
               setIsLoading(false);
          }
     };

     return <div className="min-h-screen w-full bg-[#020617] relative flex items-center justify-center p-4">
        {/* Emerald Radial Glow Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)`,
          }}
        />
        
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-emerald-500/20 relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In to BucksBunny</h2>
            
            <form className="space-y-4" onSubmit={handler}>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                value={email}
                required
                className="w-full px-4 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-gray-400"
                placeholder="your@email.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input 
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                value={password}
                required
                className="w-full px-4 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-gray-400"
                placeholder="••••••••"
                />
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors"
            >
                {isLoading ? "Signing in..." : "Sign In"}
            </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-300">
                {`Don't have an account?`}
            <Link href={"/auth/signup"}><p className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer">Sign up</p></Link>
            { error && <p className="text-red-400 mt-2">{error}</p>}
            </div>
        </div>
        </div>
     
}