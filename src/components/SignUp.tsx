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
           <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign Up</h2>
            <form className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input 
                onChange={(e) => setUsername(e.target.value)}
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all focus:text-black"
                placeholder="your_username"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                onChange={(e) => setEmail(e.target.value)}
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all focus:text-black"
                placeholder="your@email.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:text-black outline-none transition-all"
                placeholder="••••••••"
                />
            </div>

            <button onClick={(e) => {
                e.preventDefault();
                handler();
            }} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                    Register
            </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
                {`Don't have an account?`}
            <Link href={"/auth/signin"}><p className="text-indigo-600 hover:text-indigo-500 font-medium">Sign in</p></Link>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        </div>
        </div>
}