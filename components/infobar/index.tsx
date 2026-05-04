import { Casual } from "./Casual";
import { Countdown } from "./Countdown";
import { Survive } from "./Survive";

export const InfoBar = () => {
  return (
    <aside className="w-64 border-l border-ghost p-4">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-text leading-none pb-4">
          Employee of the Planet
        </h3>
        <Casual />
        <Countdown />
        <Survive />
      </div>
    </aside>
  );
};
