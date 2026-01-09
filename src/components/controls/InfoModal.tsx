import { X } from "lucide-react";

export const InfoModal = ({ isOpen, data, onClose }: any) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0f0f0f] border border-white/10 w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-32 w-full overflow-hidden">
          <img
            src={data.cover}
            className="w-full h-full object-cover opacity-20 blur-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-black/40 rounded-full text-white border border-white/10"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-6 pb-8 -mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row gap-5 items-end mb-6">
            <img
              src={data.cover}
              className="w-28 h-40 rounded-2xl border border-white/10 object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-black text-white mb-2 uppercase">
                {data.bookName}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {data.tags?.map((t: string) => (
                  <span
                    key={t}
                    className="text-[9px] font-bold px-3 py-1 bg-white/5 text-cyan-400 border border-white/10 rounded-full uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3 pt-4 border-t border-white/5">
            <h3 className="text-white font-black uppercase text-[10px] tracking-widest">
              Deskripsi
            </h3>
            <div className="text-zinc-400 text-sm leading-relaxed">
              {data.introduction}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
