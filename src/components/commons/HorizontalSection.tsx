"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PlayCard from "@/components/commons/PlayCard";
import { PlayCardProps } from "@/types/play-card";

export default function HorizontalSection({
  title,
  data,
}: {
  title: string;
  data: PlayCardProps[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateState();
  }, [data]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
    setTimeout(updateState, 300);
  };

  return (
    <section className="space-y-3">
      <h2 className="text-lg md:text-xl font-semibold tracking-wide text-white">
        {title}
      </h2>

      <div className="relative">
        {canLeft && (
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-linear-to-r from-black to-transparent z-10" />
        )}
        {canRight && (
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-linear-to-l from-black to-transparent z-10" />
        )}

        <button
          onClick={() => scroll("left")}
          disabled={!canLeft}
          className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full backdrop-blur border transition
            ${
              canLeft
                ? "bg-black/60 border-zinc-700 hover:border-cyan-500"
                : "opacity-0 pointer-events-none"
            }`}
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canRight}
          className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full backdrop-blur border transition
            ${
              canRight
                ? "bg-black/60 border-zinc-700 hover:border-cyan-500"
                : "opacity-0 pointer-events-none"
            }`}
        >
          <ChevronRight />
        </button>

        <div
          ref={scrollRef}
          onScroll={updateState}
          className="flex gap-4 overflow-x-auto scroll-smooth touch-action-pan-x
 scrollbar-hide pr-4 overscroll-x-contain"
        >
          {data.map((item) => {
            return (
              <div
                key={item.bookId}
                className="min-w-37.5 sm:min-w-42.5 md:min-w-47.5"
              >
                <PlayCard
                  bookId={item.bookId}
                  bookName={item.bookName}
                  chapterCount={item.chapterCount}
                  cover={item.cover}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
