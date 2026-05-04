import { find } from "@/actions/game/find";
import { Finish } from "@/components/game/buttons/Finish";
import { Guess } from "@/components/game/buttons/Guess";
import { Next } from "@/components/game/buttons/Next";
import { ImageInfo } from "@/components/game/imageinfo";
import { LazyMap } from "@/components/game/map/LazyMap";
import { ImageViewer } from "@/components/game/photo/ImageViewer";
import { RoundEndBoard } from "@/components/game/roundendboard";
import { ScoreBoard } from "@/components/game/scoreboard";
import CountdownTimer from "@/components/game/timer/Countdown";
import { Heading } from "@/components/shared/Heading";
import { notFound, redirect } from "next/navigation";

export default async function InGamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await find(id);

  if (!res.success) {
    notFound();
  }

  const game = res.game!;

  if (game.status === "finished") {
    redirect("/profile");
  }

  return (
    <div className="flex flex-col items-center gap-2 w-6xl">
      <div className="flex items-center justify-between w-full gap-4">
        <h1 className="text-2xl font-bold text-ficsit-primary flex-1">
          <Heading />
        </h1>
        {game.mode === "countdown" && (
          <CountdownTimer
            duration={game.duration}
            serverNow={Date.now()}
            startedAt={game.gameRounds[game.round - 1].startedAt.toISOString()}
          />
        )}
        {game.phase === "guessing" ? (
          <ScoreBoard mode={game.mode} round={game.round} score={game.score} />
        ) : (
          game.phase === "round_end" && (
            <RoundEndBoard
              distance={game.gameRounds[game.round - 1].distance}
              score={game.gameRounds[game.round - 1].score}
            />
          )
        )}
      </div>
      <div className="flex gap-2 w-full items-center">
        <div className="flex-1 aspect-square border border-ghost inset-shadow-md relative">
          <ImageInfo
            author={game.gameRounds[game.round - 1].locations.author as string}
            pov={game.gameRounds[game.round - 1].locations.pov as number}
            zoom={game.gameRounds[game.round - 1].locations.zoom as number}
          />
          <ImageViewer
            src={game.gameRounds[game.round - 1].locationId as string}
          />
        </div>
        <div className="flex-1 aspect-square flex flex-col gap-2">
          <div className="flex-1 flex inset-shadow-md">
            <LazyMap
              exactXY={[
                game.gameRounds[game.round - 1].locations.x,
                game.gameRounds[game.round - 1].locations.y,
              ]}
              guessXY={
                game.phase === "guessing"
                  ? null
                  : [
                      game.gameRounds[game.round - 1].guessX as number,
                      game.gameRounds[game.round - 1].guessY as number,
                    ]
              }
              phase={game.phase}
            />
          </div>

          {res.game?.phase === "round_end" && res.game.round === 5 ? (
            <Finish gameId={id} />
          ) : res.game?.phase === "round_end" ? (
            <Next gameId={id} />
          ) : res.game?.phase === "guessing" ? (
            <Guess gameId={id} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
