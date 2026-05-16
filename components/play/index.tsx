"use client";

import { Divider } from "../shared/Divider";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Duration, durations, gameModes } from "@/constants/game-modes";
import { Start } from "./Start";
import { FaChevronUp } from "react-icons/fa";

export const Mode = () => {
  const [gameMode, setGameMode] = useState(gameModes[0]);
  const [duration, setDuration] = useState<Duration>(30);

  const handleDuration = (direction: "inc" | "dec") => {
    const currentDurationIndex = durations.indexOf(duration);
    if (direction === "dec") {
      if (currentDurationIndex === 0) {
        setDuration(durations[durations.length - 1]);
      } else {
        setDuration(durations[currentDurationIndex - 1]);
      }
    } else {
      if (currentDurationIndex === durations.length - 1) {
        setDuration(durations[0]);
      } else {
        setDuration(durations[currentDurationIndex + 1]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <Divider>select game mode</Divider>
      <ul className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 border border-border text-text">
        {gameModes.map((oneGameMode) => (
          <li
            key={oneGameMode.id}
            role="button"
            tabIndex={0}
            onClick={() =>
              setGameMode(
                gameModes.find((mode) => mode.value === oneGameMode.value)!,
              )
            }
            className={cn(
              "flex flex-col justify-between p-2 h-24 md:h-auto md:aspect-1/2 relative bg-card-bg hover:bg-ficsit-primary hover:text-white hover:cursor-pointer inset-shadow-sm inset-shadow-secondary/50 transition-colors duration-75",
              oneGameMode.value === "countdown" &&
                "md:border-x border-y md:border-y-0 border-border",
              gameMode.value === oneGameMode.value &&
                "bg-ficsit-primary text-white",
            )}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-sm md:text-base font-medium text-center">
                {oneGameMode.display}
              </h2>
              <p className="text-xs md:text-sm text-center leading-none">
                {oneGameMode.sub}
              </p>
            </div>
            {gameMode.value === "countdown" &&
              oneGameMode.value === "countdown" && (
                <div className="flex items-center justify-center gap-2 md:gap-0">
                  <button
                    className="hover:cursor-pointer size-8 flex items-center justify-center hover:text-ficsit-secondary"
                    onClick={() => handleDuration("dec")}
                  >
                    <p className="sr-only">decrease duration</p>
                    <FaChevronUp className="rotate-180" />
                  </button>
                  <p className="text-center font-medium md:flex-1 text-sm md:text-base ">
                    {duration} sec
                  </p>
                  <button
                    className="hover:cursor-pointer size-8 flex items-center justify-center hover:text-ficsit-secondary"
                    onClick={() => handleDuration("inc")}
                  >
                    <p className="sr-only">increase duration</p>
                    <FaChevronUp />
                  </button>
                </div>
              )}
          </li>
        ))}
      </ul>
      <Divider>ready?</Divider>
      <Start gameMode={gameMode.value} duration={duration} />
    </div>
  );
};
