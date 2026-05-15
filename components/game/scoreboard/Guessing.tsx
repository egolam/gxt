import { useGame } from "@/hooks/use-game";
import { useParams } from "next/navigation";

export const Guessing = () => {
  const { gameid } = useParams();
  const { data } = useGame(gameid as string);
  return (
    <div className="flex justify-center items-center h-fit gap-4 px-4 bg-card-bg border border-border py-2 leading-none">
      <div className="flex items-center justify-center gap-2 border-r border-border pr-4">
        <h2 className="text-text font-semibold">GAME MODE:</h2>
        <p className="font-bold text-white uppercase">{data?.game.mode}</p>
      </div>
      <div className="flex items-center justify-center gap-2 border-r border-border pr-4">
        <h2 className="text-text font-semibold">ROUND:</h2>
        <p className="font-bold text-white">{data?.game.round}</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-text font-semibold">TOTAL SCORE:</h2>
        <p className="font-bold text-white">{data?.game.score}</p>
      </div>
    </div>
  );
};
