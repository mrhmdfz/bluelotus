export default function SkeletonPlayCard() {
  return (
    <div className="animate-pulse">
      <div className="w-[150px] md:w-[190px]">
        <div className="aspect-[3/4] rounded-xl bg-zinc-800" />
        <div className="mt-3 h-4 w-3/4 rounded bg-zinc-800" />
        <div className="mt-2 h-3 w-1/2 rounded bg-zinc-700" />
      </div>
    </div>
  );
}
