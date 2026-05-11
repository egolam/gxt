import { Divider } from "../shared/Divider";
import { createGame } from "@/actions/game/create";
import { Start } from "./Start";

export const Mode = () => {
  return (
    <form className="flex flex-col gap-4" action={createGame}>
      <fieldset className="flex flex-col gap-4">
        <legend className="sr-only">
          <span>select game mode</span>
        </legend>
        <Divider>select game mode</Divider>
        <div className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 border border-border text-text">
          <label
            htmlFor="casual"
            className="has-checked:bg-feature has-checked:text-white h-24 md:h-auto md:aspect-1/2 bg-card-bg hover:bg-feature inset-shadow-sm inset-shadow-secondary/50 hover:cursor-pointer relative hover:text-white"
          >
            <span className="text-sm md:text-base block absolute right-1 lg:right-2 bottom-1 lg:bottom-2 leading-none font-medium">
              CASUAL
            </span>
            <input
              type="radio"
              id="casual"
              name="mode"
              className="hidden"
              defaultChecked
              defaultValue="casual"
            />
          </label>
          <label
            htmlFor="countdown"
            className="has-checked:bg-feature has-checked:text-white h-24 md:h-auto md:border-x border-y md:border-y-0 border-border md:aspect-1/2 bg-card-bg hover:bg-feature inset-shadow-sm inset-shadow-secondary/50 hover:cursor-pointer relative hover:text-white"
          >
            <span className="text-sm md:text-base block absolute right-1 lg:right-2 bottom-1 lg:bottom-2 leading-none font-medium">
              COUNTDOWN
            </span>
            <input
              defaultValue="countdown"
              type="radio"
              id="countdown"
              name="mode"
              className="hidden"
            />
          </label>
          <label
            htmlFor="survive"
            className="has-checked:bg-feature has-checked:text-white h-24 md:h-auto md:aspect-1/2 bg-card-bg hover:bg-feature inset-shadow-sm inset-shadow-secondary/50 hover:cursor-pointer relative hover:text-white"
          >
            <span className="text-sm md:text-base block absolute right-1 lg:right-2 bottom-1 lg:bottom-2 leading-none font-medium">
              SURVIVE
            </span>
            <input
              defaultValue="survive"
              type="radio"
              id="survive"
              name="mode"
              className="hidden"
            />
          </label>
        </div>
      </fieldset>
      <Start />
    </form>
  );
};
