import { useGame } from "@/hooks/use-game";
import { useParams } from "next/navigation";

export const Guessing = () => {
  const { gameid } = useParams();
  const { data } = useGame(gameid as string);
  return (
    <div className="flex w-full h-16 sm:w-auto justify-evenly sm:justify-center items-center sm:h-fit sm:gap-4 sm:px-4 bg-background border-b-2 sm:border-b-0 sm:bg-background/50 py-1 sm:py-2 leading-none sm:border-r-2 border-ficsit-primary">
      <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-2">
        <h2 className="text-white/50 font-semibold text-xs sm:text-base">
          GAME MODE
        </h2>
        <p className="font-bold text-white text-sm sm:text-base uppercase">
          {data?.game.mode}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-2 sm:border-x border-white/20 sm:px-4">
        <h2 className="text-white/50 font-semibold text-xs sm:text-base">
          ROUND
        </h2>
        <p className="font-bold text-white text-sm sm:text-base">
          {data?.game.round}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-2">
        <h2 className="text-white/50 font-semibold text-xs sm:text-base">
          TOTAL SCORE
        </h2>
        <p className="font-bold text-white text-sm sm:text-base">
          {data?.game.score}
        </p>
      </div>
    </div>
  );
};
