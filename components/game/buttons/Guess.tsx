import { useGameStore } from "@/stores/game";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { toast } from "sonner";
import { mutate } from "swr";

export const Guess = ({
  gameid,
  roundid,
}: {
  gameid: string;
  roundid: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const guessXY = useGameStore((state) => state.guessXY);
  const handleGuess = async () => {
    setIsLoading(true);
    try {
      const req = await fetch(`/api/games/${gameid}/rounds/${roundid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guessXY,
        }),
      });
      if (!req.ok) {
        toast.error("Try again later");
        router.replace("/");
      }
      const res = await req.json();
      if (res.success) {
        mutate(`/api/games/${gameid}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={() => handleGuess()}
      disabled={isLoading || !guessXY}
      className="text-2xl h-12 bg-ficsit-primary text-white font-bold flex items-center justify-center relative group hover:cursor-pointer disabled:bg-text/12.5 disabled:text-ghost disabled:pointer-events-none"
    >
      {isLoading ? <FaGear className="animate-spin" /> : "GUESS"}

      <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height]"></span>
    </button>
  );
};
