"use client";

import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggest = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(`/api/search?q=${query}&type=suggest`);
        const list = res.data?.data?.suggestList || [];
        setSuggestions(list);
      } catch (err) {
        console.error("Gagal ambil suggest:", err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggest, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setSearchActive(false);
    }
  };

  return (
    <nav className="flex items-center gap-4 md:justify-between relative z-100 px-4 py-3">
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
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/images/bluelotus.png"
            alt="BlueLotus"
            width={40}
            height={40}
            loading="eager"
            className="w-7 h-7 md:w-12 md:h-12 shrink-0"
          />
          <div className="leading-tight">
            <h1 className="truncate text-base md:text-3xl font-extrabold italic tracking-wide bg-linear-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]">
              BlueLotus
            </h1>
            <p className="hidden md:block text-sm text-zinc-300 mt-1 max-w-md tracking-widest">
              Tempat terbaik untuk menonton drama pendek gratis.
            </p>
          </div>
        </Link>
      </div>

      <div
        className="relative flex items-center flex-1 md:flex-none"
        ref={dropdownRef}
      >
        <form onSubmit={handleSearch} className="w-full relative">
          <input
            type="text"
            placeholder="Cari drama..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchActive(true)}
            onBlur={() => setTimeout(() => setSearchActive(false), 200)}
            className="w-full md:w-12 md:focus:w-72 transition-all duration-500 bg-zinc-900/80 border border-zinc-700 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-cyan-500 focus:bg-zinc-900 shadow-lg"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {loading ? (
              <Loader2 size={18} className="text-cyan-500 animate-spin" />
            ) : (
              <Search size={18} className="text-zinc-400" />
            )}
          </div>
        </form>

        {searchActive && suggestions.length > 0 && (
          <div className="absolute top-full right-0 w-full md:w-80 mt-3 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {suggestions.map((drama: any) => (
                <button
                  key={drama.bookId}
                  onMouseDown={() => router.push(`/drama/${drama.bookId}`)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-all group text-left"
                >
                  <img
                    src={drama.cover}
                    className="w-10 h-14 object-cover rounded-lg border border-white/10"
                    alt=""
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-xs font-bold truncate group-hover:text-cyan-400">
                      {drama.bookName}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
            <button
              onMouseDown={handleSearch}
              className="w-full py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-widest transition-colors border-t border-white/5"
            >
              Lihat Hasil Lengkap
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
