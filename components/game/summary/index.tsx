import { Again } from "../buttons/Again";
import { Breakdown } from "./Breakdown";
import { GameInfo } from "./GameInfo";
import { TotalScore } from "./TotalScore";

export const Summary = () => {
  return (
    <div className="flex-1 aspect-square relative border border-ghost bg-secondary">
      <div className="h-full flex flex-col justify-between p-4">
        <TotalScore />
        <Breakdown />
        <GameInfo />
        <Again />
      </div>
    </div>
  );
};
