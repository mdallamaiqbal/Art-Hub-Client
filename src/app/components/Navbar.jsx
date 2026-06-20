"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Link, Button } from "@heroui/react";
import { Palette, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current active URL path

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Browse Artworks", href: "/browse" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-[#0f111a]/70 backdrop-blur-lg text-white">
      {/* Header Container */}
      <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        
        {/* Left Side: Mobile Toggle & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="sm:hidden p-1 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo referencing image_887721.png styling */}
          <Link href="/" className="flex items-center gap-2">
            <Palette className="w-7 h-7 text-[#9333ea]" strokeWidth={2.5} />
            <span className="font-bold text-xl tracking-tight flex">
              <span className="text-[#a78bfa]">Art</span>
              <span className="bg-linear-to-r from-[#c084fc] to-[#f472b6] bg-clip-text text-transparent">
                Hub
              </span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Links with Active State */}
        <div className="hidden sm:flex items-center gap-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors font-medium text-sm ${
                  isActive 
                    ? "text-[#c084fc] font-semibold" // Active color matching logo gradient
                    : "text-zinc-400 hover:text-white" // Inactive state
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Authentication */}
        <div className="flex items-center">
          <Button
            as={Link}
            href="/login"
            variant="flat"
            size="sm"
            className="bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 font-medium rounded-lg"
          >
            Login
          </Button>
        </div>
      </header>

      {/* Mobile Drawer Menu with Active State */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-[#0f111a]/95 backdrop-blur-lg border-b border-zinc-800 px-6 py-4 flex flex-col gap-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-lg py-2 block w-full transition-colors ${
                  isActive 
                    ? "text-[#c084fc] font-semibold" 
                    : "text-zinc-400 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}