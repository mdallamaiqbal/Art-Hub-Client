import Link from 'next/link';
import React from 'react';

const Restriction = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 py-12 dark:bg-zinc-900 transition-colors">
      <div className="w-full max-w-md p-8 text-center rounded-2xl border border-default-200 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md shadow-xl flex flex-col items-center gap-5">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 animate-pulse">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-8 h-8 text-red-600 dark:text-red-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold tracking-tight text-default-900 dark:text-zinc-100">
            Access Denied
          </h2>
          <p className="text-sm text-default-500 leading-relaxed max-w-xs">
            Only standard user accounts can purchase arts. Please switch or login with a user account.
          </p>
        </div>
        <Link 
          href="/auth/login"
          className="w-full mt-2 py-2.5 px-4 rounded-xl text-center text-sm font-semibold text-white bg-linear-to-r from-[#9333ea] to-[#db2777] shadow-md hover:opacity-90 transition-opacity"
        >
          Login with User Account
        </Link>
      </div>
    </div>
    );
};

export default Restriction;