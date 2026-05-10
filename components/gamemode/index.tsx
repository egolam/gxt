"use client";

import { StartButton } from "./StartButton";
import { useSettingsStore } from "@/stores/settings";
import { ModeForward } from "./ModeForward";
import { ModeBackward } from "./ModeBackward";
import { DurationBackward } from "./DurationBackward";
import { DurationForward } from "./DurationForward";
import { ModeDuration } from "./ModeDuration";
import { ModeInfo } from "./ModeInfo";
import { ModeDescription } from "./ModeDescription";

export const GameModeSelection = () => {
  const mode = useSettingsStore((state) => state.mode);
  return (
    <>
      <ModeBackward />
      <div className="flex flex-col gap-2 h-96 md:h-auto md:w-64 md:aspect-1/2">
        <div className="bg-ghost relative h-full flex-1">
          <ModeInfo />
          <div className="h-full flex flex-col justify-end sm:p-4 text-text sm:gap-2 select-none">
            <ModeDescription />
            {mode.value === "countdown" && (
              <div className="flex items-center justify-center gap-2 w-full">
                <DurationBackward />
                <ModeDuration />
                <DurationForward />
              </div>
            )}
          </div>
        </div>
        <StartButton />
      </div>
      <ModeForward />
    </>
  );
};
