import { useGameStore } from "@/stores/game";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { toast } from "sonner";
import { mutate } from "swr";
import CountdownTimer from "../timer/Countdown";
import { useGame } from "@/hooks/use-game";

export const Guess = () => {
  const submittedRef = useRef(false);
  const { gameslug } = useParams();
  const { data } = useGame(gameslug as string);
  const currentRound = data?.game.gameRounds[0];
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const guessXY = useGameStore((state) => state.guessXY);
  const handleGuess = async () => {
    if (submittedRef.current) return;

    submittedRef.current = true;
    setIsLoading(true);
    try {
      const req = await fetch(
        `/api/games/${gameslug}/rounds/${currentRound?.slug}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({
            guessXY,
          }),
        },
      );
      if (!req.ok) {
        toast.error("Try again later");
        router.replace("/");
      }
      const res = await req.json();
      if (res.success) {
        mutate(`/api/games/${gameslug}`);
      }
    } catch (e) {
      console.error(e);
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
        className="text-2xl h-12 w-full bg-ficsit-primary text-white font-bold flex items-center justify-center relative group hover:cursor-pointer disabled:bg-text/12.5 disabled:text-ghost disabled:pointer-events-none"
      >
        {isLoading ? <FaGear className="animate-spin" /> : "GUESS"}

        <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height]"></span>
      </button>
    </div>
  );
};
