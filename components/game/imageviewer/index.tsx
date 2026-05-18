import { useGame } from "@/hooks/use-game";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";

export const ImageViewer = () => {
  const [isLoading, setLoading] = useState(true);
  const { gameid } = useParams();
  const { data } = useGame(gameid as string);
  const currentRound = data?.game.gameRounds[0];
  return (
    <div className="sm:flex-1 w-full aspect-square sm:border border-white/20 inset-shadow-md inset-shadow-background relative">
      <div className="absolute bottom-0 right-0 bg-background/80 flex items-center text-[0.625rem] sm:text-xs gap-4 px-4 py-1 -z-1 leading-none">
        <div className="flex items-center gap-2">
          <h3 className="text-white/50 font-medium">Zoom</h3>
          <p className="text-white font-semibold">
            {currentRound?.locations.zoom}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-white/50 font-medium">POV</h3>
          <p className="text-white font-semibold">
            {currentRound?.locations.pov}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-white/50 font-medium">Author</h3>
          <p className="text-white font-semibold">
            {currentRound?.locations.author}
          </p>
        </div>
      </div>
      <div className="relative w-full h-full -z-10">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <FaGear className="animate-spin text-white/50" />
          </div>
        )}
        <Image
          alt="in-game photo"
          src={`https://assets.satisguessry.com/compressed/${currentRound?.locations.url}.webp`}
          fill
          quality={100}
          loading="lazy"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};
