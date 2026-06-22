"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react"
import { Sparkles, ShieldCheck } from "@gravity-ui/icons";

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-[#0f111a] overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-zinc-900">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 flex flex-col gap-16 relative z-10">  
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
            <Sparkles width="14" height="14" className="text-[#c084fc]" />
            <span >The Next-Gen Digital Art Ecosystem</span>
          </motion.div>         
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            Discover, Collect & Sell{" "}
            <span className="bg-linear-to-r from-[#a78bfa] via-[#c084fc] to-[#f472b6] bg-clip-text text-transparent">
              Extraordinary
            </span>{" "}
            Digital Art
          </h1>         
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Welcome to ArtHub. A vibrant marketplace where passionate global collectors meet elite digital artists. Buy verified masterpieces, leave feedback, or launch your own creative gallery today.
          </p>
          <div className="pt-2">
            <Link
              href="/browse"
              className={"bg-linear-to-r py-2.5  from-[#9333ea] to-[#db2777] text-white font-semibold shadow-lg shadow-purple-900/30 hover:opacity-95 transition-opacity rounded-xl px-8"}>
              Explore Artworks
            </Link>
          </div>
        </div>

        {/* Bottom Section: Showcasing Your Integrated Banner Image */}
        <div className="relative w-full rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-2 sm:p-4 backdrop-blur-xl shadow-2xl group overflow-hidden">
          {/* Subtle neon glowing frame border element */}
          <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] rounded-xl overflow-hidden shadow-inner border border-zinc-900">
            <Image
              src="/assets/banner.png" 
              alt="ArtHub Digital Exhibition Showcase Wall"
              fill
              priority
              sizes="(max-w-1280px) 100vw, 1280px"
              className="object-cover object-center transform scale-[1.01] transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark vignette blending shade over image bottom edge */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0f111a] via-transparent to-transparent opacity-40" />
          </div>
        </div>

        {/* Info Footer Block */}
        {/* <div className="flex items-center justify-center gap-8 text-xs text-zinc-500 pt-2 border-t border-zinc-900/60 max-w-xl mx-auto w-full">
          <div className="flex items-center gap-1.5">
            <ShieldCheck width={16} height={16} className="text-[#c084fc]" />
            <span>Secure Transactions</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          <div>
            <span className="text-zinc-300 font-semibold">20k+</span> Masterpieces Listed
          </div>
        </div> */}

      </div>
    </section>
  );
}