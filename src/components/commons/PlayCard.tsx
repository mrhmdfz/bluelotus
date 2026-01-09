import Link from "next/link";
import { PlayIcon } from "lucide-react";
import { PlayCardProps } from "@/types/play-card";
import Image from "next/image";

export default function PlayCard(props: PlayCardProps) {
  const { bookName, chapterCount, cover, bookId } = props;

  return (
    <Link
      href={`/drama/${bookId}`}
      className="group relative block w-full aspect-2/3 sm:aspect-3/5
        rounded-xl overflow-hidden
        border border-transparent
        hover:border-cyan-500
        transition-all duration-300
      "
    >
      <Image
        src={cover || "/default-cover.jpg"}
        alt={bookName}
        fill
        sizes="(max-width: 640px) 45vw,
         (max-width: 1024px) 22vw,
         15vw"
        loading="eager"
        className="
          object-cover
          transition-transform duration-500 ease-out
          group-hover:scale-110
        "
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />

      <div
        className="
          absolute left-3 right-3 bottom-3 z-10
          text-xs sm:text-[13px]
          font-medium
          line-clamp-2
          text-white
          transition-all duration-300

          md:group-hover:text-cyan-400
          md:group-hover:text-sm
          md:group-hover:font-semibold
        "
      >
        {bookName}
      </div>

      {chapterCount && (
        <div
          className="
          absolute right-2 top-2 z-10
          bg-black/60 backdrop-blur
          rounded-full
          px-2 py-0.5
          text-[10px] sm:text-xs
          flex items-center gap-1
          text-white
        "
        >
          <PlayIcon size={12} />
          {chapterCount} Eps
        </div>
      )}
    </Link>
  );
}
