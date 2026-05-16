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
    <div className="flex flex-col gap-4 p-8">
      <Divider>select game mode</Divider>
      <ul className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-0.5">
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
              "flex flex-col justify-between p-2 h-24 md:h-64 relativehover:cursor-pointer transition-colors duration-75 border border-white/20 text-white/50 hover:text-white hover:bg-white/5 hover:cursor-pointer",
              gameMode.value === oneGameMode.value && "bg-white/5 text-white",
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
      <div className="text-xs flex *:flex-1 border border-white/20 p-1">
        <div className="text-white/50 flex flex-col items-center justify-center">
          <h3 className="text-center">NUMBER OF ROUNDS</h3>
          <p className="text-white font-medium text-sm">5</p>
        </div>
        <div className="text-white/50 flex flex-col items-center justify-center border-x border-white/20">
          <h3 className="text-center">TOTAL ROUND SCORE</h3>
          <p className="text-white font-medium text-sm">2000</p>
        </div>
        <div className="text-white/50 flex flex-col items-center justify-center">
          <h3 className="text-center">TOTAL GAME SCORE</h3>
          <p className="text-white font-medium text-sm">10000</p>
        </div>
      </div>
    </div>
  );
};
