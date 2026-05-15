import { GameMode } from "@/constants/game-modes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { toast } from "sonner";

export const Start = ({
  gameMode,
  duration,
}: {
  gameMode: GameMode;
  duration: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleStart = async () => {
    setIsLoading(true);
    try {
      const roundDuration =
        gameMode === "casual" ? null : gameMode === "survive" ? 30 : duration;
      const req = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameMode,
          duration: roundDuration,
        }),
      });
      const res = await req.json();

      if (!res.success) {
        return toast.error(res.message);
      }

      router.push(`/game/${res.gameid}`);
    } catch (e) {
      return toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={() => handleStart()}
      type="button"
      className="flex items-center justify-center gap-2 border-border border text-text hover:bg-feature hover:cursor-pointer hover:text-white font-medium bg-card-bg h-8 inset-shadow-sm inset-shadow-secondary/50 w-full disabled:pointer-events-none disabled:opacity-50 text-sm md:text-base"
    >
      {isLoading ? (
        <FaGear className="animate-spin size-3" />
      ) : (
        <>
          <FaPlay className="size-3" />
          START
        </>
      )}
    </button>
  );
};
