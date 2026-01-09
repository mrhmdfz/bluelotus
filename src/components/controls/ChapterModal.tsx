import { X } from "lucide-react";

export const ChapterModal = ({ chapters, current, onSelect }: any) => (
  <div
    id="episode-modal"
    className="fixed top-0 right-0 w-full sm:w-80 h-full bg-[#080808]/98 backdrop-blur-2xl z-[120] translate-x-full transition-transform duration-500 border-l border-white/5 p-8"
  >
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-xl font-black text-white italic uppercase">
        Chapter
      </h2>
      <button
        onClick={() =>
          document
            .getElementById("episode-modal")
            ?.classList.add("translate-x-full")
        }
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white border border-white/10"
      >
        <X size={20} />
      </button>
    </div>
    <div className="space-y-2.5 overflow-y-auto h-[calc(100vh-180px)] pr-2 custom-scrollbar">
      {chapters.map((c: any) => (
        <button
          key={c.chapterIndex}
          onClick={() => onSelect(c.chapterIndex)}
          className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all border ${
            current === c.chapterIndex
              ? "bg-cyan-500 text-black border-cyan-400 font-bold"
              : "bg-white/5 text-zinc-400 border-transparent hover:bg-white/10"
          }`}
        >
          <span
            className={`text-xs font-black ${
              current === c.chapterIndex ? "text-black" : "text-cyan-500"
            }`}
          >
            {String(c.chapterIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-xs truncate">Chapter {c.chapterIndex + 1}</span>
        </button>
      ))}
    </div>
  </div>
);
