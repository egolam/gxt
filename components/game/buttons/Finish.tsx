import { useGame } from "@/hooks/use-game";
import { useGameStore } from "@/stores/game";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { toast } from "sonner";

export const Finish = ({ gameid }: { gameid: string }) => {
  const finishRef = useRef(false);
  const router = useRouter();
  const { mutate } = useGame(gameid);
  const [isLoading, setIsLoading] = useState(false);
  const reset = useGameStore((state) => state.reset);
  const handleFinish = async () => {
    if (finishRef.current) return;
    finishRef.current = true;
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
      onClick={() => handleFinish()}
      disabled={isLoading}
      className="text-2xl h-12 w-full bg-ficsit-primary text-white font-bold flex items-center justify-center relative group hover:cursor-pointer disabled:bg-background/50 disabled:text-white/50 disabled:pointer-events-none transition-colors duration-75"
    >
      {isLoading ? <FaGear className="animate-spin" /> : "FINISH"}

      <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height]"></span>
    </button>
  );
};
