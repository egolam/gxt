import { Mode } from "@/types/types";

interface Props {
  mode: Mode;
  round: number;
  score: number;
}
export const ScoreBoard = ({ mode, round, score }: Props) => {
  return (
    <div className="flex justify-center items-center h-fit gap-4 px-4 bg-card-bg py-2 leading-none">
      <div className="flex items-center justify-center gap-2 border-r border-border pr-4">
        <h2 className="text-text font-semibold">GAME MODE:</h2>
        <p className="font-bold text-white uppercase">{mode}</p>
      </div>
      <div className="flex items-center justify-center gap-2 border-r border-border pr-4">
        <h2 className="text-text font-semibold">ROUND:</h2>
        <p className="font-bold text-white">{round}</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-text font-semibold">TOTAL SCORE:</h2>
        <p className="font-bold text-white">{score}</p>
      </div>
    </div>
  );
};
