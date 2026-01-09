import {
  List,
  Maximize,
  Pause,
  SkipBack,
  SkipForward,
  Play,
} from "lucide-react";

export const BottomControls = ({
  show,
  playing,
  progress,
  onTogglePlay,
  onSeek,
  onNext,
  onPrev,
  nextDisabled,
  prevDisabled,
  onOpenChapters,
  onFullscreen,
}: any) => (
  <div
    className={`absolute bottom-0 left-0 w-full p-4 lg:p-6 bg-linear-to-t from-black to-transparent transition-all duration-500 z-50 ${
      show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
    }`}
  >
    <input
      type="range"
      min="0"
      max="100"
      value={progress || 0}
      onChange={(e) => onSeek(parseFloat(e.target.value))}
      className="w-full h-1 mb-5 bg-white/20 appearance-none cursor-pointer rounded-full accent-cyan-500"
    />
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5 md:gap-8">
        <button
          onClick={onTogglePlay}
          className="text-white hover:text-cyan-400 transition"
        >
          {playing ? (
            <Pause size={28} fill="currentColor" />
          ) : (
            <Play size={28} fill="currentColor" />
          )}
        </button>
        <div className="flex items-center gap-6">
          <button
            disabled={prevDisabled}
            onClick={onPrev}
            className={`text-white transition ${prevDisabled && "opacity-20"}`}
          >
            <SkipBack size={24} fill="currentColor" />
          </button>
          <button
            disabled={nextDisabled}
            onClick={onNext}
            className={`text-white transition ${nextDisabled && "opacity-20"}`}
          >
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenChapters}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full text-cyan-400 text-[10px] font-black border border-cyan-500/30 uppercase tracking-widest"
        >
          <List size={16} />
          <span>Chapter</span>
        </button>
        <button
          onClick={onFullscreen}
          className="text-white hover:text-cyan-400 transition"
        >
          <Maximize size={22} />
        </button>
      </div>
    </div>
  </div>
);
