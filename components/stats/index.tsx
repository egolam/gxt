import { TotalPioneers } from "./TotalPioneers";
import { TotalPlayed } from "./TotalPlayed";
import { UniqueLocations } from "./UniqueLocations";

export const Stats = () => {
  return (
    <div className="border-t border-ghost flex items-center divide-x divide-ghost w-full h-16">
      <TotalPlayed />
      <UniqueLocations />
      <TotalPioneers />
    </div>
  );
};
