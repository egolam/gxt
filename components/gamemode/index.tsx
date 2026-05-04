"use client";

import { useState } from "react";
import { StartButton } from "./StartButton";
import { DURATIONS_ARRAY, gameModes } from "@/constants/game-settings";
import { Duration } from "@/types/types";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { GameModeTitle } from "./GameModeTitle";
import { GameModeReminder } from "./GameModeReminder";

export const GameModeSelection = () => {
  const [index, setIndex] = useState(0);
  const [duration, setDuration] = useState<Duration>(30);

  const handleSelection = (direction: "back" | "forward") => {
    if (direction === "back") {
      if (index == 0) {
        setIndex(gameModes.length - 1);
      } else {
        setIndex((prev) => prev - 1);
      }
    } else {
      if (index === gameModes.length - 1) {
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
    }
  };

  const handleDuration = (action: "inc" | "dec") => {
    const nextValue = DURATIONS_ARRAY.indexOf(duration);

    if (action === "inc") {
      if (nextValue === DURATIONS_ARRAY.length - 1) {
        setDuration(DURATIONS_ARRAY[0]);
      } else {
        setDuration(DURATIONS_ARRAY[nextValue + 1]);
      }
    } else {
      if (nextValue === 0) {
        setDuration(DURATIONS_ARRAY[DURATIONS_ARRAY.length - 1]);
      } else {
        setDuration(DURATIONS_ARRAY[nextValue - 1]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex">
        <button
          onClick={() => handleSelection("back")}
          className="text-white w-16 flex items-center justify-center hover:cursor-pointer group"
        >
          <div className="border border-ficsit-primary text-ficsit-primary size-8 flex items-center justify-center group-hover:bg-ficsit-primary group-hover:border-ficsit-primary group-hover:text-white ">
            <FaArrowLeft />
          </div>
        </button>

        <div className="flex flex-col gap-2 w-64 aspect-1/2">
          <div className="bg-text/12.5 relative h-full flex-1">
            <div className="absolute top-5 -left-2 flex flex-col gap-3 pr-9">
              <GameModeTitle display={gameModes[index].display} />
              <GameModeReminder sub={gameModes[index].sub} />
            </div>

            <div className="h-full flex flex-col justify-end p-4 text-text gap-2 select-none">
              <p className="text-balance">{gameModes[index].desc}</p>
              {gameModes[index].value === "countdown" && (
                <div className="flex items-center justify-center gap-2 w-full">
                  <button
                    onClick={() => handleDuration("dec")}
                    className="size-8 flex items-center justify-center text-text hover:text-ficsit-secondary hover:cursor-pointer transition-transform"
                  >
                    <FaChevronDown />
                  </button>
                  <div className="border-b w-16 h-8 flex items-center justify-center border-ghost">
                    <p className="text-white">{duration}sec</p>
                  </div>
                  <button
                    onClick={() => handleDuration("inc")}
                    className="size-8 flex items-center justify-center text-text hover:text-ficsit-secondary hover:cursor-pointer transition-transform"
                  >
                    <FaChevronUp />
                  </button>
                </div>
              )}
            </div>
          </div>
          <StartButton duration={duration} gameMode={gameModes[index].value} />
        </div>
        <button
          onClick={() => handleSelection("forward")}
          className="text-white w-16 flex items-center justify-center hover:cursor-pointer group"
        >
          <div className="border border-ficsit-primary text-ficsit-primary size-8 flex items-center justify-center group-hover:bg-ficsit-primary group-hover:border-ficsit-primary group-hover:text-white">
            <FaArrowRight />
          </div>
        </button>
      </div>
    </div>
  );
};
