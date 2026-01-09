import { Play } from "lucide-react";

export const BigPlayButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute p-7 bg-cyan-500/10 backdrop-blur-md rounded-full text-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.3)] border border-cyan-500/30 active:scale-90 transition-all z-40"
  >
    <Play size={40} fill="currentColor" />
  </button>
);
