"use client";

import { guess } from "@/actions/game/guess";
import { useGameStore } from "@/stores/game";
import { notFound } from "next/navigation";
import { useTransition } from "react";
import { FaGear } from "react-icons/fa6";

export const Guess = ({ gameId }: { gameId: string }) => {
  const [isPending, startTransition] = useTransition();
  const guessXY = useGameStore((state) => state.guessXY);

  const handleGuess = async () => {
    if (!guessXY || isPending) return;
    const res = await guess(guessXY, gameId);
    if (!res.success) {
      notFound();
    }
  };

  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await handleGuess();
        });
      }}
      className="text-2xl h-12 bg-ficsit-primary text-white font-bold flex items-center justify-center relative group hover:cursor-pointer disabled:bg-text/12.5 disabled:text-ghost disabled:pointer-events-none"
      disabled={isPending || !guessXY}
    >
      {isPending ? <FaGear className="animate-spin" /> : "GUESS"}
      <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height]"></span>
    </button>
  );
};
