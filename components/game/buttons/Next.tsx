import { useGame } from "@/hooks/use-game";
import { useGameStore } from "@/stores/game";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { toast } from "sonner";

export const Next = ({ gameid }: { gameid: string }) => {
  const nextRef = useRef(false);
  const router = useRouter();
  const { mutate } = useGame(gameid);
  const [isLoading, setIsLoading] = useState(false);
  const reset = useGameStore((state) => state.reset);
  const handleNext = async () => {
    if (nextRef.current) return;
    nextRef.current = true;
    setIsLoading(true);
    try {
      const req = await fetch(`/api/games/${gameid}/rounds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const res = await req.json();

      if (!res.success) {
        router.replace("/play");
        return toast.error(res.message);
      } else {
        reset();
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
    <button
      onClick={() => handleNext()}
      disabled={isLoading}
      className="text-2xl h-12 w-full bg-ficsit-primary text-white font-bold flex items-center justify-center relative group hover:cursor-pointer disabled:bg-background/50 disabled:text-white/50 disabled:pointer-events-none transition-colors duration-75"
    >
      {isLoading ? <FaGear className="animate-spin text-white/50" /> : "NEXT"}

      <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height] duration-75"></span>
    </button>
  );
};
