import { ChevronLeft, Info } from "lucide-react";

export const TopControls = ({
  show,
  title,
  chapterInfo,
  onBack,
  info,
}: any) => (
  <div
    className={`absolute top-0 left-0 w-full p-4 lg:p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent transition-all duration-500 z-50 ${
      show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    }`}
  >
    <div className="flex items-center gap-4">
      <button
        onClick={onBack}
        className="p-2 bg-white/5 hover:bg-cyan-500/20 rounded-full transition border border-white/10 active:scale-90"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>
      <div className="max-w-[200px] sm:max-w-xs">
        <h1 className="text-white font-bold text-sm md:text-lg truncate">
          {title || "Playing Drama"}
        </h1>
        <p className="text-cyan-400 font-bold text-[9px] md:text-[10px] uppercase tracking-widest opacity-80">
          {chapterInfo}
        </p>
      </div>
    </div>
    {info && (
      <button
        onClick={info}
        className="p-2 bg-white/5 hover:bg-cyan-500/20 rounded-full transition border border-white/10 text-white active:scale-90"
      >
        <Info size={22} />
      </button>
    )}
  </div>
);
