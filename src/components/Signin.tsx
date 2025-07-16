"use client"
import { signIn } from "next-auth/react"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [error, setError] = useState("");
     const [isLoading, setIsLoading] = useState(false);
     const router = useRouter();

     const handler = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);
          setError("");
          
          try {
               const res = await signIn("credentials", { 
                    email, 
                    password,
                    redirect: false // Don't redirect automatically
               });
               
               if (res?.error) {
                    setError("Invalid email or password");
               } else if (res?.ok) {
                    console.log("Sign in successful");
                    router.push("/dashboard"); // Redirect to dashboard on success
               }
          } catch (error) {
               setError("An error occurred during sign in");
               console.error("Sign in error:", error);
          } finally {
               setIsLoading(false);
          }
     };

     return <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
            
            <form className="space-y-4" onSubmit={handler}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                value={email}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all focus:text-black"
                placeholder="your@email.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                value={password}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:text-black outline-none transition-all"
                placeholder="••••••••"
                />
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors"
            >
                {isLoading ? "Signing in..." : "Sign In"}
            </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
                {`Don't have an account?`}
            <Link href={"/auth/signup"}><p className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</p></Link>
            { error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
        </div>
     
}