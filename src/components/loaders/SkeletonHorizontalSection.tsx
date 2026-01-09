import SkeletonPlayCard from "./SkeletonPlayCard";

export default function SkeletonHorizontalSection() {
  return (
    <section className="space-y-4">
      <div className="h-6 w-48 rounded bg-zinc-800 animate-pulse" />
      <div
        className="
          flex gap-4 overflow-x-auto pr-4
          scrollbar-hide
          touch-action-pan-x
          overscroll-x-contain
        "
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonPlayCard key={i} />
        ))}
      </div>
    </section>
  );
}
