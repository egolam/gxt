import { start } from "@/actions/game/start";
import { Duration, Mode } from "@/types/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaGear } from "react-icons/fa6";
import { toast } from "sonner";

export const StartButton = ({
  gameMode,
  duration,
}: {
  gameMode: Mode;
  duration: Duration;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStartGame = async () => {
    if (isPending) return;
    try {
      const res = await start(gameMode, duration);

      if (!res.success) {
        toast.error(res.message);
      }

      router.push(`/game/${res.data}`);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await handleStartGame();
        });
      }}
      className="text-2xl bg-ficsit-primary text-white font-bold w-64 h-12 flex items-center justify-center hover:cursor-pointer relative group disabled:bg-text/12.5 disabled:text-ghost disabled:pointer-events-none"
    >
      {isPending ? <FaGear className="animate-spin" /> : <>START</>}

      <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height]"></span>
    </button>
  );
};
