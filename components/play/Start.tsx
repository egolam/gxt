import { GameMode } from "@/constants/game-modes";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
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
  const startRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStart = async () => {
    if (startRef.current || isLoading) return;
    startRef.current = true;
    setIsLoading(true);
    try {
      const { data: session, error: sessionError } =
        await authClient.getSession();

      if (sessionError) {
        return toast.error(sessionError.message);
      }

      if (!session) {
        const { error: anonymousError } = await authClient.signIn.anonymous();

        if (anonymousError) {
          return toast.error(anonymousError.message);
        }
      }
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
      startRef.current = false;
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={() => handleStart()}
      type="button"
      className="flex items-center justify-center gap-2 hover:cursor-pointer font-medium h-8.5 w-full disabled:pointer-events-none disabled:opacity-50 text-sm md:text-base bg-ficsit-primary text-white transition-colors duration-75 border-b-2 border-background hover:border-ficsit-secondary"
    >
      {isLoading ? (
        <FaGear className="animate-spin size-3" />
      ) : (
        <>
          <FaPlay className="size-3" />
          <span className="mt-0.5">START</span>
        </>
      )}
    </button>
  );
};
