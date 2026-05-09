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
        <h1 className="text-2xl font-bold text-ficsit-primary flex-1">
          <Heading />
        </h1>

        {data.game.phase === "round_end" ? (
          <RoundEndBoard
            distance={data.game.gameRounds[0].distance}
            score={data.game.gameRounds[0].score}
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
            author={data.game.gameRounds[0].location.author}
            pov={data.game.gameRounds[0].location.pov}
            zoom={data.game.gameRounds[0].location.zoom}
          />
          <ImageViewer src={data.game.gameRounds[0].location.slug} />
        </div>
        <div className="flex-1 aspect-square flex flex-col gap-2">
          <div className="flex-1 flex inset-shadow-md">
            <LazyMap />
          </div>
          {data.game.phase === "round_end" && data.game.round === 5 ? (
            <Finish gameid={gameSlug} />
          ) : data.game.phase === "round_end" ? (
            <Next gameid={gameSlug} />
          ) : data.game.phase === "guessing" ? (
            <Guess
              gameid={gameSlug}
              roundid={data.game.gameRounds[0].slug}
              duration={data.game.duration}
              mode={data.game.mode}
              phase={data.game.phase}
              startedAt={data.game.gameRounds[0].startedAt}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
