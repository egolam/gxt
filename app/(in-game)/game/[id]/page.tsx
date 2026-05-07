"use client";

import { Finish } from "@/components/game/buttons/Finish";
import { Guess } from "@/components/game/buttons/Guess";
import { Next } from "@/components/game/buttons/Next";
import { ImageInfo } from "@/components/game/imageinfo";
import { LazyMap } from "@/components/game/map/LazyMap";
import { ImageViewer } from "@/components/game/photo/ImageViewer";
import { RoundEndBoard } from "@/components/game/roundendboard";
import { ScoreBoard } from "@/components/game/scoreboard";
import { Heading } from "@/components/shared/Heading";
import { useGame } from "@/hooks/use-game";
import { notFound } from "next/navigation";
import { use } from "react";
import { FaGear } from "react-icons/fa6";

export default function InGamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const gameId = use(params).id;

  const { data, error, isLoading, isValidating } = useGame(gameId);
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

  const currentRound = data.game.gameRounds.find(
    (round) => round.round === data.game.round,
  )!;

  return (
    <div className="flex flex-col items-center gap-2 w-6xl">
      <div className="flex items-center justify-between w-full gap-4">
        <h1 className="text-2xl font-bold text-ficsit-primary flex-1">
          <Heading />
        </h1>
        {data.game.phase === "round_end" ? (
          <RoundEndBoard
            distance={currentRound.distance}
            score={currentRound.score}
          />
        ) : (
          <ScoreBoard
            mode={data?.game.mode}
            round={data?.game.round}
            score={data?.game.score}
          />
        )}
      </div>
      <div className="flex gap-2 w-full items-center">
        <div className="flex-1 aspect-square border border-ghost inset-shadow-md relative">
          <ImageInfo
            author={currentRound.author}
            pov={currentRound.pov}
            zoom={currentRound.zoom}
          />
          <ImageViewer src={currentRound.locationId} />
        </div>
        <div className="flex-1 aspect-square flex flex-col gap-2">
          <div className="flex-1 flex inset-shadow-md">
            <LazyMap />
          </div>
          {data.game.phase === "round_end" && data.game.round === 5 ? (
            <Finish gameid={gameId} />
          ) : data.game.phase === "round_end" ? (
            <Next gameid={gameId} />
          ) : data.game.phase === "guessing" ? (
            <Guess gameid={gameId} roundid={currentRound.id} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
