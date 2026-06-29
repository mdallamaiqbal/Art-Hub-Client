import Link from 'next/link';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-[#111115] text-gray-100 flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md mx-auto">
                <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500 animate-pulse select-none">
                    404
                </h1>
                <h2 className="text-xl md:text-2xl font-bold mt-4 mb-2 text-gray-200">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-400 text-sm md:text-base mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link 
                    href="/" 
                    className="inline-block bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs md:text-sm px-8 py-3.5 rounded-xl uppercase tracking-wider shadow-lg shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    Back to Home
                </Link>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.05)_0,transparent_100%)] pointer-events-none"></div>
        </div>
    );
};

export default NotFoundPage;