import { useGame } from "@/hooks/use-game";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";

export const ImageViewer = () => {
  const [isLoading, setLoading] = useState(true);
  const { gameslug } = useParams();
  const { data } = useGame(gameslug as string);
  const currentRound = data?.game.gameRounds[0];
  return (
    <div className="flex-1 aspect-square border border-ghost inset-shadow-md relative">
      <div className="absolute bottom-0 right-0 bg-ghost/75 flex items-center text-xs gap-4 px-4 py-1 -z-1 leading-none">
        <div className="flex items-center gap-2">
          <h3 className="text-text font-medium">Zoom</h3>
          <p className="text-white font-semibold">
            {currentRound?.location.zoom}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-text font-medium">POV</h3>
          <p className="text-white font-semibold">
            {currentRound?.location.pov}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-text font-medium">Author</h3>
          <p className="text-white font-semibold">
            {currentRound?.location.author}
          </p>
        </div>
      </div>
      <div className="relative w-full h-full -z-10">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card-bg">
            <FaGear className="animate-spin text-text" />
          </div>
        )}
        <Image
          alt="in-game photo"
          src={`https://assets.satisguessry.com/compressed/${currentRound?.location.slug}.webp`}
          fill
          quality={100}
          loading="lazy"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};
