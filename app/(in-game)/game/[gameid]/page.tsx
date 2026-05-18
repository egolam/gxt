"use client";

import { Finish } from "@/components/game/buttons/Finish";
import { Guess } from "@/components/game/buttons/Guess";
import { Next } from "@/components/game/buttons/Next";
import { ImageViewer } from "@/components/game/imageviewer";
import { LazyMap } from "@/components/game/map/LazyMap";
import MapWrapper from "@/components/game/map/MapWrapper";
import { Guessing } from "@/components/game/scoreboard/Guessing";
import { RoundEnd } from "@/components/game/scoreboard/RoundEnd";
import { Summary } from "@/components/game/summary";
import { Heading } from "@/components/header/Heading";
import { useGame } from "@/hooks/use-game";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { use } from "react";
import { FaGear } from "react-icons/fa6";

export default function InGamePage({
  params,
}: {
  params: Promise<{ gameid: string }>;
}) {
  const gameid = use(params).gameid;

  const { data, error, isLoading, isValidating } = useGame(gameid);
  if (error) return notFound();
  if (isLoading || isValidating)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <FaGear className="animate-spin text-white/50" size={24} />
        </div>
      </div>
    );

  if (!data?.success) return notFound();

  return (
    <div className="flex flex-col items-center sm:gap-2 w-full sm:w-6xl">
      <div
        className={cn(
          "flex flex-col sm:flex-row items-center justify-between w-full sm:gap-2",
          data.game.phase === "game_end" && "justify-end",
        )}
      >
        <h1 className="leading-none text-2xl font-semibold hidden sm:block">
          <Heading long={true} />
        </h1>
        {data.game.phase === "guessing" && <Guessing />}
        {data.game.phase === "round_end" && <RoundEnd />}
      </div>
      <div className="flex flex-col h-full sm:h-auto sm:flex-row sm:gap-2 w-full items-center">
        {data.game.phase !== "game_end" ? <ImageViewer /> : <Summary />}

        <div className="flex-1 w-full aspect-square flex flex-col gap-2">
          <div className="flex-1 flex inset-shadow-md">
            <MapWrapper />
          </div>
          {data.game.phase === "round_end" && data.game.round === 5 ? (
            <Finish gameid={gameid} />
          ) : data.game.phase === "round_end" ? (
            <Next gameid={gameid} />
          ) : data.game.phase === "guessing" ? (
            <Guess gameid={gameid} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
