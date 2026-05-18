import { useGame } from "@/hooks/use-game";
import { useParams } from "next/navigation";

export const RoundEnd = () => {
  const { gameid } = useParams();
  const { data } = useGame(gameid as string);
  const currentRound = data?.game.gameRounds[0];
  return (
    <div className="flex w-full h-16 sm:w-auto justify-evenly sm:justify-center items-center sm:h-fit sm:gap-4 sm:px-4 py-1 sm:py-2 leading-none sm:border-r-2 border-ficsit-primary bg-background border-b-2 sm:border-b-0 sm:bg-background/50">
      <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-2 sm:border-r border-white/20 sm:pr-4">
        {!currentRound?.distance ? (
          <p className="text-red-500 font-bold">TIME'S UP!</p>
        ) : (
          <>
            <h2 className="text-white/50 font-semibold text-xs sm:text-base">
              DISTANCE
            </h2>
            <p className="font-bold text-white text-sm sm:text-base">
              <span className="lowercase">{currentRound?.distance} meters</span>
            </p>
          </>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-2">
        <h2 className="text-white/50 font-semibold text-xs sm:text-base">
          ROUND SCORE
        </h2>
        <p className="font-bold text-white text-sm sm:text-base">
          {currentRound?.score}
        </p>
      </div>
    </div>
  );
};
