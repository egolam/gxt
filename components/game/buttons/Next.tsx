import { useGameStore } from "@/stores/game";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { toast } from "sonner";
import { mutate } from "swr";

export const Next = () => {
  const { gameslug } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const reset = useGameStore((state) => state.reset);
  const handleNext = async () => {
    setIsLoading(true);
    try {
      const req = await fetch(`/api/games/${gameslug}/rounds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!req.ok) {
        toast.error("Try again later");
        router.replace("/");
      }
      const res = await req.json();
      if (res.success) {
        reset();
        mutate(`/api/games/${gameslug}`);
      }
    } catch (e) {
      console.error(e);
      toast.error("Try again later");
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
