"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import {
  ChevronLeft,
  Volume2,
  VolumeX,
  Maximize,
  List,
  Pause,
  Play,
  SkipForward,
  SkipBack,
  X,
} from "lucide-react";

type Chapter = {
  chapterIndex: number;
  chapterName: string;
};

export default function PlayDetail() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const hideControls = useCallback(() => {
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  const handleInteraction = () => {
    setShowControls(true);
    hideControls();
  };

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await axios.get(`/api/chapters?bookId=${slug}`);
        setChapters(res.data.data.chapterList);
      } catch (err) {
        console.error("Failed to fetch chapters", err);
      }
    };
    fetchChapters();
    hideControls();
    return () => {
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    };
  }, [slug, hideControls]);

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const res = await axios.get(
          `/api/stream?bookId=${slug}&chapter=${currentChapter}`
        );
        setVideoUrl(res.data.data.videoUrl);
        setProgress(0);
      } catch (err) {
        console.error("Failed to fetch stream", err);
      }
    };
    fetchStream();
  }, [slug, currentChapter]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  const updateProgress = () => {
    if (videoRef.current) {
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time =
        (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  const changeChapter = (index: number) => {
    setCurrentChapter(index);
    document.getElementById("episode-modal")?.classList.add("translate-x-full");
  };

  if (!chapters.length || !videoUrl) {
    return (
      <div className="h-screen w-full bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          <p className="text-cyan-500 font-medium animate-pulse">by mrhmdfz</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center group"
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain pointer-events-auto"
        autoPlay
        playsInline
        muted={muted}
        onTimeUpdate={updateProgress}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() =>
          currentChapter < chapters.length - 1 &&
          setCurrentChapter(currentChapter + 1)
        }
        onClick={togglePlay}
      />

      <div
        className={`absolute top-0 left-0 w-full p-4 lg:p-8 flex items-center gap-4 bg-gradient-to-b from-black/90 to-transparent transition-all duration-500 ${
          showControls
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <button
          onClick={() => router.back()}
          className="p-2 bg-white/5 hover:bg-cyan-500/20 rounded-full transition border border-white/10 group"
        >
          <ChevronLeft
            size={28}
            className="text-white group-hover:text-cyan-400"
          />
        </button>
        <div>
          <p className="text-cyan-400/80 text-xs font-bold uppercase tracking-widest">
            Episode {currentChapter + 1}
          </p>
        </div>
      </div>

      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute p-8 bg-cyan-500/20 backdrop-blur-md rounded-full text-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.3)] border border-cyan-500/50 active:scale-90 transition-all duration-300"
        >
          <Play size={48} fill="currentColor" />
        </button>
      )}

      <div
        className={`absolute bottom-0 left-0 w-full p-4 lg:p-8 bg-gradient-to-t from-black via-black/60 to-transparent transition-all duration-500 ${
          showControls
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <div className="relative flex items-center group/progress mb-6 px-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress || 0}
            onChange={handleSeek}
            className="w-full h-1 bg-white/20 appearance-none cursor-pointer rounded-full accent-cyan-500 group-hover/progress:h-1.5 transition-all shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-10">
            <button
              onClick={togglePlay}
              className="text-white hover:text-cyan-400 transition transform hover:scale-110"
            >
              {playing ? (
                <Pause size={30} fill="currentColor" />
              ) : (
                <Play size={30} fill="currentColor" />
              )}
            </button>

            <div className="flex items-center gap-6">
              <button
                disabled={currentChapter === 0}
                onClick={() => setCurrentChapter(currentChapter - 1)}
                className={`text-white hover:text-cyan-400 transition ${
                  currentChapter === 0 ? "opacity-20" : ""
                }`}
              >
                <SkipBack size={26} fill="currentColor" />
              </button>
              <button
                disabled={currentChapter === chapters.length - 1}
                onClick={() => setCurrentChapter(currentChapter + 1)}
                className={`text-white hover:text-cyan-400 transition ${
                  currentChapter === chapters.length - 1 ? "opacity-20" : ""
                }`}
              >
                <SkipForward size={26} fill="currentColor" />
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-3 group/vol">
              <button
                onClick={() => setMuted(!muted)}
                className="text-white hover:text-cyan-400 transition"
              >
                {muted || progress === 0 ? (
                  <VolumeX size={24} />
                ) : (
                  <Volume2 size={24} />
                )}
              </button>
              <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-500 opacity-0 group-hover/vol:opacity-100">
                <input type="range" className="w-full accent-cyan-500" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() =>
                document
                  .getElementById("episode-modal")
                  ?.classList.remove("translate-x-full")
              }
              className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full text-cyan-400 text-sm font-bold transition border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            >
              <List size={20} />
              <span className="hidden sm:inline uppercase tracking-widest">
                Episode
              </span>
            </button>
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-cyan-400 transition transform hover:scale-110"
            >
              <Maximize size={24} />
            </button>
          </div>
        </div>
      </div>

      <div
        id="episode-modal"
        className="fixed top-0 right-0 w-80 md:w-96 h-full bg-[#080808]/95 backdrop-blur-2xl z-[100] translate-x-full transition-transform duration-500 border-l border-cyan-500/20 p-8 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-black text-white italic tracking-tighter">
              Chapter
            </h2>
            <div className="h-1 w-12 bg-cyan-500 rounded-full mt-1" />
          </div>
          <button
            onClick={() =>
              document
                .getElementById("episode-modal")
                ?.classList.add("translate-x-full")
            }
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto h-[calc(100vh-160px)] pr-3 custom-scrollbar">
          {chapters.map((chapter) => (
            <button
              key={chapter.chapterIndex}
              onClick={() => changeChapter(chapter.chapterIndex)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border ${
                currentChapter === chapter.chapterIndex
                  ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] font-bold scale-[1.02]"
                  : "bg-white/5 text-zinc-400 border-white/5 hover:border-cyan-500/50 hover:text-white"
              }`}
            >
              <span
                className={`text-xs font-black ${
                  currentChapter === chapter.chapterIndex
                    ? "text-black"
                    : "text-cyan-500"
                }`}
              >
                {String(chapter.chapterIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-sm truncate">
                Chapter {chapter.chapterIndex + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #06b6d4;
          border-radius: 10px;
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: #06b6d4;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
        }
      `}</style>
    </div>
  );
}
