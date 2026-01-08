"use client";
import Navbar from "@/components/Navbar";
import HorizontalSection from "@/components/HorizontalSection";
import {
  getNewRelease,
  getRecommendation,
  getPopularRanking,
} from "@/services/drama.services";
import { useEffect, useState } from "react";
import SkeletonHorizontalSection from "@/components/SkeletonHorizontalSection";

export default function Home() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [newRelease, setnewRelease] = useState<any>(null);
  const [popularRanking, setPopularRanking] = useState<any>(null);

  useEffect(() => {
    setMounted(true);

    Promise.allSettled([
      getRecommendation(),
      getNewRelease(),
      getPopularRanking(),
    ]).then(([rec, newR, pop]) => {
      if (rec.status === "fulfilled") setRecommendation(rec.value);
      if (newR.status === "fulfilled") setnewRelease(newR.value);
      if (pop.status === "fulfilled") setPopularRanking(pop.value);

      if (
        rec.status === "rejected" ||
        newR.status === "rejected" ||
        pop.status === "rejected"
      ) {
        setError(true);
      }

      setLoading(false);
    });
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="space-y-8">
        <Navbar />
        <SkeletonHorizontalSection />
        <SkeletonHorizontalSection />
        <SkeletonHorizontalSection />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Navbar />

      {recommendation && (
        <HorizontalSection
          title="Rekomendasi"
          data={recommendation.data.list}
        />
      )}

      {newRelease && (
        <HorizontalSection title="Rilis Terbaru" data={newRelease.data.list} />
      )}

      {popularRanking && (
        <HorizontalSection
          title="Sedang Populer"
          data={popularRanking.data.list}
        />
      )}

      {error && (
        <p className="text-center text-sm text-gray-400">
          Beberapa data gagal dimuat
        </p>
      )}
      <footer>
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} BlueLotus by{" "}
          <a
            href="https://github.com/mrhmdfz"
            className="text-cyan-700 hover:text-cyan-500 transition-all duration-300"
          >
            mrhmdfz
          </a>
        </p>
      </footer>
    </div>
  );
}
