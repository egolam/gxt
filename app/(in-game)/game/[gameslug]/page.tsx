"use client";

import { Finish } from "@/components/game/buttons/Finish";
import { Guess } from "@/components/game/buttons/Guess";
import { Next } from "@/components/game/buttons/Next";
import { ImageViewer } from "@/components/game/imageviewer";
import { LazyMap } from "@/components/game/map/LazyMap";
import { Guessing } from "@/components/game/scoreboard/Guessing";
import { RoundEnd } from "@/components/game/scoreboard/RoundEnd";
import { Summary } from "@/components/game/summary";
import { useGame } from "@/hooks/use-game";
import { notFound } from "next/navigation";
import { use } from "react";
import { FaGear } from "react-icons/fa6";

export default function InGamePage({
  params,
}: {
  params: Promise<{ gameslug: string }>;
}) {
  const gameSlug = use(params).gameslug;

  const { data, error, isLoading, isValidating } = useGame(gameSlug);
  if (error) return notFound();
  if (isLoading || isValidating)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <FaGear className="animate-spin text-text" size={24} />
        </div>
      </div>
    );

  if (!data?.success) return notFound();

  return (
    <div className="flex flex-col items-center gap-2 w-6xl">
      <div className="flex items-center justify-between w-full gap-2">
        {/* <InGameHeader /> */}
        {data.game.phase === "guessing" && <Guessing />}
        {data.game.phase === "round_end" && <RoundEnd />}
      </div>
      <div className="flex gap-2 w-full items-center">
        {data.game.phase !== "game_end" ? <ImageViewer /> : <Summary />}

        <div className="flex-1 aspect-square flex flex-col gap-2">
          <div className="flex-1 flex inset-shadow-md">
            <LazyMap />
          </div>
          {data.game.phase === "round_end" && data.game.round === 5 ? (
            <Finish />
          ) : data.game.phase === "round_end" ? (
            <Next />
          ) : data.game.phase === "guessing" ? (
            <Guess />
          ) : null}
        </div>
      </div>
    </div>
  );
}
