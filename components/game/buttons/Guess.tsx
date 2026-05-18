import { useGameStore } from "@/stores/game";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { toast } from "sonner";
import CountdownTimer from "../timer/Countdown";
import { useGame } from "@/hooks/use-game";

export const Guess = ({ gameid }: { gameid: string }) => {
  const submittedRef = useRef(false);
  const { data, mutate } = useGame(gameid);
  const currentRound = data?.game.gameRounds[0];
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const guessXY = useGameStore((state) => state.guessXY);

  const handleGuess = async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setIsLoading(true);
    try {
      const req = await fetch(`/api/games/${gameid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          guessXY,
        }),
      });
      const res = await req.json();

      if (!res.success) {
        router.replace("/play");
        return toast.error(res.message);
      } else {
        await mutate();
      }
    } catch (e) {
      router.replace("/play");
      return toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center">
      {data?.game.mode !== "casual" && (
        <CountdownTimer
          duration={data?.game.duration as number}
          serverNow={Date.now()}
          startedAt={currentRound?.startedAt as Date}
          onFinish={() => handleGuess()}
        />
      )}
      <button
        onClick={() => handleGuess()}
        disabled={isLoading || !guessXY}
        className="text-2xl h-12 w-full bg-ficsit-primary text-white font-bold flex items-center justify-center relative group hover:cursor-pointer disabled:bg-background/50 disabled:text-white/50 disabled:pointer-events-none transition-colors duration-75"
      >
        {isLoading ? (
          <FaGear className="animate-spin text-white/50" />
        ) : (
          "GUESS"
        )}

        <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height] duration-75"></span>
      </button>
    </div>
  );
};
