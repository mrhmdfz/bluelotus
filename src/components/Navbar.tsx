"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <nav className="flex items-center gap-4 md:justify-between">
      <div
        className={`
          flex items-start gap-2 min-w-0 transition-all duration-300
          ${
            searchActive
              ? "opacity-0 w-0 overflow-hidden md:opacity-100 md:w-auto"
              : ""
          }
        `}
      >
        <Image
          src="/images/bluelotus.png"
          alt="BlueLotus"
          width={40}
          height={40}
          loading="eager"
          className="w-7 h-7 md:w-12 md:h-12 shrink-0"
        />

        <div className="leading-tight">
          <h1 className="truncate text-base md:text-3xl font-extrabold italic tracking-wide bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]">
            BlueLotus
          </h1>
          <p className="hidden md:block text-sm text-zinc-400 mt-1 max-w-md">
            Tempat terbaik untuk menikmati dracin favoritmu secara gratis.
          </p>
        </div>
      </div>

      <div className="relative flex items-center flex-1 md:flex-none">
        <input
          type="text"
          placeholder="Cari drama..."
          onFocus={() => setSearchActive(true)}
          onBlur={() => setSearchActive(false)}
          className="w-full md:w-10 md:focus:w-64 transition-all duration-300 bg-zinc-900 border border-zinc-700 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-cyan-500"
        />
        <Search size={18} className="absolute left-3 text-zinc-400" />
      </div>
    </nav>
  );
}
