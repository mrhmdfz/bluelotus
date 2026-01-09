"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { ChapterModal } from "@/components/controls/ChapterModal";
import { CustomStyles } from "@/components/controls/CustomStyle";
import { InfoModal } from "@/components/controls/InfoModal";
import { BottomControls } from "@/components/controls/BottomControls";
import { BigPlayButton } from "@/components/controls/BigPlayButton";
import { TopControls } from "@/components/controls/TopControl";
import { LoadingScreen } from "@/components/loaders/LoadingScreen";
import { Chapter, DramaDetail } from "@/types/drama";

export default function PlayDetail() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [dramaDetail, setDramaDetail] = useState<DramaDetail | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingInitial, setLoadingInitial] = useState(true);

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

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingInitial(true);
      try {
        const [chapterRes, detailRes] = await Promise.all([
          axios.get(`/api/chapters?bookId=${slug}`),
          axios.get(`/api/detail?bookId=${slug}`).catch(() => null),
        ]);
        if (chapterRes.data?.data?.chapterList)
          setChapters(chapterRes.data.data.chapterList);
        if (detailRes?.data?.success) setDramaDetail(detailRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchData();
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
        console.error(err);
      }
    };
    if (!loadingInitial) fetchStream();
  }, [slug, currentChapter, loadingInitial]);

  if (loadingInitial || !chapters.length || !videoUrl) return <LoadingScreen />;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center group select-none"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        playsInline
        className="w-full h-full max-h-screen object-contain"
        onTimeUpdate={() =>
          videoRef.current &&
          setProgress(
            (videoRef.current.currentTime / videoRef.current.duration) * 100
          )
        }
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() =>
          currentChapter < chapters.length - 1 &&
          setCurrentChapter(currentChapter + 1)
        }
        onClick={togglePlay}
      />

      <TopControls
        show={showControls}
        title={dramaDetail?.bookName}
        info={dramaDetail ? () => setShowInfo(true) : undefined}
        onBack={() => router.back()}
        chapterInfo={`Chapter ${currentChapter + 1} / ${chapters.length}`}
      />

      {!playing && <BigPlayButton onClick={togglePlay} />}

      <BottomControls
        show={showControls}
        playing={playing}
        progress={progress}
        onTogglePlay={togglePlay}
        onSeek={(val: any) => {
          if (videoRef.current)
            videoRef.current.currentTime =
              (val / 100) * videoRef.current.duration;
        }}
        onNext={() =>
          currentChapter < chapters.length - 1 &&
          setCurrentChapter(currentChapter + 1)
        }
        onPrev={() =>
          currentChapter > 0 && setCurrentChapter(currentChapter - 1)
        }
        nextDisabled={currentChapter === chapters.length - 1}
        prevDisabled={currentChapter === 0}
        onOpenChapters={() =>
          document
            .getElementById("episode-modal")
            ?.classList.remove("translate-x-full")
        }
        onFullscreen={toggleFullscreen}
      />

      {dramaDetail && (
        <InfoModal
          isOpen={showInfo}
          data={dramaDetail}
          onClose={() => setShowInfo(false)}
        />
      )}

      <ChapterModal
        chapters={chapters}
        current={currentChapter}
        onSelect={(idx: any) => {
          setCurrentChapter(idx);
          document
            .getElementById("episode-modal")
            ?.classList.add("translate-x-full");
        }}
      />

      <CustomStyles />
    </div>
  );
}
