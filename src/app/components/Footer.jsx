import Link from "next/link";
import { 
  Palette, 
  LogoFacebook, 
  LogoLinkedin, 
  LogoGithub 
} from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#0f111a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          
          {/* Brand & Socials */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 w-max">
              <Palette className="w-8 h-8 text-[#9333ea]" />
              <span className="font-bold text-2xl tracking-tight flex">
                <span className="text-[#a78bfa]">Art</span>
                <span className="bg-gradient-to-r from-[#c084fc] to-[#f472b6] bg-clip-text text-transparent">
                  Hub
                </span>
              </span>
            </Link>

            <p className="max-w-sm leading-relaxed text-zinc-400 text-sm">
              The premier digital art ecosystem where artists showcase masterpieces and global art collectors discover genuine creativity.
            </p>

            {/* Social Links using Gravity Icons */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 transition-all hover:bg-purple-600 hover:text-white"
                aria-label="Facebook"
              >
                <LogoFacebook width="20" height="20" />
              </Link>

              {/* LinkedIn */}
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 transition-all hover:bg-purple-600 hover:text-white"
                aria-label="LinkedIn"
              >
                <LogoLinkedin width="20" height="20" />
              </Link>

              {/* GitHub */}
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 transition-all hover:bg-purple-600 hover:text-white"
                aria-label="GitHub"
              >
                <LogoGithub width="20" height="20" />
              </Link>
            </div>
          </div>

          {/* Marketplace Column */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-[#c084fc]">
              Marketplace
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/browse" className="text-zinc-400 transition hover:text-white">
                  Browse Artworks
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-zinc-400 transition hover:text-white">
                  Trending Creations
                </Link>
              </li>
              <li>
                <Link href="/artists" className="text-zinc-400 transition hover:text-white">
                  Top Featured Artists
                </Link>
              </li>
              <li>
                <Link href="/auctions" className="text-zinc-400 transition hover:text-white">
                  Live Art Auctions
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Navigation */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-[#c084fc]">
              Platform
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/about" className="text-zinc-400 transition hover:text-white">
                  Our Vision
                </Link>
              </li>
              <li>
                <Link href="/sell-art" className="text-zinc-400 transition hover:text-white">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-zinc-400 transition hover:text-white">
                  Art Hub Blog
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-zinc-400 transition hover:text-white">
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-[#c084fc]">
              Resources
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/help" className="text-zinc-400 transition hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/buyer-protection" className="text-zinc-400 transition hover:text-white">
                  Buyer Protection
                </Link>
              </li>
              <li>
                <Link href="/copyright" className="text-zinc-400 transition hover:text-white">
                  Copyright Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 transition hover:text-white">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-zinc-800 pt-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 ArtHub Inc. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/terms" className="transition hover:text-zinc-300">
              Terms of Service
            </Link>
            <Link href="/privacy" className="transition hover:text-zinc-300">
              Privacy Policy
            </Link>
            <Link href="/licensing" className="transition hover:text-zinc-300">
              Licensing Agreement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}