"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PlayCard from "@/components/commons/PlayCard";
import { Loader2 } from "lucide-react";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const res = await axios.get(`/api/search?q=${query}&type=search`);

        const dataList = res.data?.data?.list || [];
        setResults(dataList);
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen text-white pt-12 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-8 w-1.5 bg-cyan-500 rounded-full" />
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter">
              Hasil Pencarian: <span className="text-cyan-400">"{query}"</span>
            </h1>
          </div>
          <p className="text-zinc-400 text-md ml-6  tracking-widest font-bold">
            Ditemukan {results.length} Judul Drama
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-cyan-500 animate-spin" />
              <div className="absolute inset-0 blur-2xl bg-cyan-500/20 animate-pulse" />
            </div>
            <p className="mt-6 text-cyan-500 font-black tracking-[0.3em] animate-pulse  text-xs">
              Mencari Drama...
            </p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
            {results.map((drama: any) => (
              <div key={drama.bookId} className="w-full">
                <PlayCard
                  bookId={drama.bookId}
                  bookName={drama.bookName}
                  cover={drama.cover}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20  rounded-4xl border border-dashed border-zinc-800">
            <div className="mb-6 flex justify-center text-zinc-700">
              <Loader2 size={48} className="rotate-45" />
            </div>
            <h2 className="text-zinc-400 text-xl font-bold mb-2">
              Yah, judulnya nggak ketemu...
            </h2>
            <p className="text-zinc-600 text-sm mb-8">
              Coba ketik kata kunci lain atau cek ejaan kamu.
            </p>
            <Link
              href="/"
              className="px-8 py-3 bg-white/5 hover:bg-cyan-500 hover:text-black rounded-full text-zinc-400 font-black text-xs tracking-widest transition-all duration-300 border border-white/10"
            >
              KEMBALI KE BERANDA
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className=" min-h-screen">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="text-cyan-500 animate-spin" />
          </div>
        }
      >
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}
