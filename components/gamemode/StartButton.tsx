import { useSettingsStore } from "@/stores/settings";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { toast } from "sonner";

export const StartButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const mode = useSettingsStore((state) => state.mode);
  const duration = useSettingsStore((state) => state.duration);

  const handleStart = async () => {
    setIsLoading(true);
    try {
      const req = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: mode.value,
          duration,
        }),
      });

      if (!req.ok) {
        toast.error("Try again later");
        router.replace("/");
      }

      const res = await req.json();
      router.push(`/game/${res.gameId}`);
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={() => {
        if (isLoading) return;
        handleStart();
      }}
      disabled={isLoading}
      className="text-2xl bg-ficsit-primary text-white font-bold w-64 h-12 flex items-center justify-center hover:cursor-pointer relative group disabled:bg-text/12.5 disabled:text-ghost disabled:pointer-events-none"
    >
      {isLoading ? <FaGear className="animate-spin" /> : "START"}

      <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height]"></span>
    </button>
  );
};
