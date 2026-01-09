export const LoadingScreen = () => (
  <div className="h-screen w-full bg-[#050505] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
      <p className="text-cyan-500 text-xs font-bold tracking-widest animate-pulse uppercase">
        Memproses Video...
      </p>
    </div>
  </div>
);
