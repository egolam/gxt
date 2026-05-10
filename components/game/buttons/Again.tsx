import { useGameStore } from "@/stores/game";
import { useRouter } from "next/navigation";

export const Again = () => {
  const router = useRouter();

  const reset = useGameStore((state) => state.reset);

  return (
    <button
      onClick={() => {
        reset();
        router.replace("/play");
      }}
      className="text-2xl h-12 bg-ficsit-primary text-white font-bold flex items-center justify-center relative group hover:cursor-pointer"
    >
      PLAY AGAIN
      <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height]"></span>
    </button>
  );
};
