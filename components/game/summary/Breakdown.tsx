import { useGame } from "@/hooks/use-game";
import { useParams } from "next/navigation";

export const Breakdown = () => {
  const { gameid } = useParams();
  const { data } = useGame(gameid as string);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-white leading-none text-2xl font-bold">
        BREAK<span className="text-ficsit-primary">DOWN</span>
      </h2>
      <ul className="flex flex-col gap-2">
        <li className="flex items-center">
          <p className="text-text flex-1">Round</p>
          <p className="text-white">Score</p>
          <p className="flex-1 text-right text-white">Distance (meters)</p>
        </li>
        {data?.game.gameRounds.map((round) => (
          <li
            key={round.round}
            className="flex h-12 px-4 bg-ghost items-center"
          >
            <h3 className="text-text flex-1">{round.round}</h3>
            <p className="text-white font-bold">{round.score}</p>
            {!round.distance ? (
              <p className="text-red-500 font-bold flex-1 text-right">
                TIME'S UP!
              </p>
            ) : (
              <p className="flex-1 text-right text-white font-bold">
                {round.distance}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
