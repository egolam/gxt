import { useGame } from "@/hooks/use-game";
import { useParams } from "next/navigation";

export const TotalScore = () => {
  const { gameid } = useParams();
  const { data } = useGame(gameid as string);
  const width = (data?.game.score! / 10000) * 100;

  return (
    <div className="flex flex-col gap-2 text-2xl font-bold">
      <h2 className="text-white leading-none">
        TOTAL<span className="text-ficsit-primary">SCORE</span>
      </h2>

      <div className="bg-ghost h-12 w-full relative flex items-center justify-center">
        <p className="text-white z-10">{data?.game.score}</p>
        <div
          style={{ width: `${width}%` }}
          className="bg-ficsit-primary absolute h-full left-0 top-0"
        ></div>
      </div>
    </div>
  );
};
