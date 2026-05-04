"use client";

import { finish } from "@/actions/game/finish";
import { useGameStore } from "@/stores/game";
import { notFound, useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaGear } from "react-icons/fa6";

export const Finish = ({ gameId }: { gameId: string }) => {
  const [isPending, startTransition] = useTransition();
  const reset = useGameStore((state) => state.reset);
  const router = useRouter();

  const handleFinish = async () => {
    if (isPending) return;
    const res = await finish(gameId);
    if (!res.success) {
      notFound();
    } else {
      reset();
      router.replace("/profile");
    }
  };
  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await handleFinish();
        });
      }}
      className="text-2xl h-12 bg-ficsit-primary text-white font-bold flex items-center justify-center relative group hover:cursor-pointer disabled:bg-text/12.5 disabled:text-ghost disabled:pointer-events-none"
      disabled={isPending}
    >
      {isPending ? <FaGear className="animate-spin" /> : "FINISH"}
      <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height]"></span>
    </button>
  );
};
