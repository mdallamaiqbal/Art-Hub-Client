'use client';
import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home, LogIn } from 'lucide-react';

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-pink-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-md w-full text-center relative z-10">
                <div className="inline-flex p-4 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-400 mb-6 animate-pulse shadow-2xl shadow-red-500/5">
                    <ShieldAlert className="w-14 h-14 md:w-16 md:h-16" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-red-500 mb-2 tracking-tight">
                    401
                </h1>
                <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-400 uppercase tracking-wide mb-4">
                    Access Denied
                </h2>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed px-4">
                    Oops! You don't have permission to access this page. It looks like you're trying to enter a restricted area of the platform.
                </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 text-xs font-bold px-5 py-3.5 rounded-xl uppercase tracking-wider border border-gray-700/50 transition-all duration-300"
                    >
                        <Home className="w-4 h-4" />
                        Go to Home
                    </Link>
                    <Link
                        href="/auth/login"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-linear-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white text-xs font-bold px-5 py-3.5 rounded-xl uppercase tracking-wider shadow-xl shadow-red-600/10 transition-all duration-300"
                    >
                        <LogIn className="w-4 h-4" />
                        Login with Another Account
                    </Link>
                </div>
            </div>
            <p className="absolute bottom-6 text-[10px] text-gray-600 uppercase tracking-widest pointer-events-none">
                Art Marketplace Security Policy
            </p>
        </div>
    );
};

export default UnauthorizedPage;