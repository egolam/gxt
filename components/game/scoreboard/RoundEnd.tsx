import { useGame } from "@/hooks/use-game";
import { useParams } from "next/navigation";

export const RoundEnd = () => {
  const { gameid } = useParams();
  const { data } = useGame(gameid as string);
  const currentRound = data?.game.gameRounds[0];
  return (
    <div className="flex justify-center items-center h-fit gap-4 px-4 bg-card-bg py-2 leading-none border border-border">
      <div className="flex items-center justify-center gap-2 border-r border-border pr-4">
        {!currentRound?.distance ? (
          <p className="text-red-500 font-bold">TIME'S UP!</p>
        ) : (
          <>
            <h2 className="text-text font-semibold">DISTANCE:</h2>
            <p className="font-bold text-white uppercase">
              <span className="lowercase">{currentRound?.distance} meters</span>
            </p>
          </>
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-text font-semibold">ROUND SCORE:</h2>
        <p className="font-bold text-white">{currentRound?.score}</p>
      </div>
    </div>
  );
};
