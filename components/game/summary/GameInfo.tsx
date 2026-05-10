import { useGame } from "@/hooks/use-game";
import { useParams } from "next/navigation";

export const GameInfo = () => {
  const { gameslug } = useParams();
  const { data } = useGame(gameslug as string);
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center gap-2 border-r border-ghost pr-4">
        <h2 className="text-ghost font-semibold">GAME MODE:</h2>
        <p className="text-white font-bold uppercase">{data?.game.mode}</p>
      </div>
      <div className="flex items-center justify-center gap-2 pl-4">
        <h2 className="text-ghost font-semibold">ROUND DURATION:</h2>
        <p className="text-white font-bold">{data?.game.duration}sec</p>
      </div>
    </div>
  );
};
