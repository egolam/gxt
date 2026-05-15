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
      className="text-2xl h-12 bg-ficsit-primary text-white font-bold flex items-center justify-center relative group hover:cursor-pointer disabled:bg-text/12.5 disabled:text-ghost disabled:pointer-events-none"
    >
      {isLoading ? <FaGear className="animate-spin" /> : "NEXT"}

      <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height]"></span>
    </button>
  );
};
