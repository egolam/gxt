import { useSettingsStore } from "@/stores/settings";
import { FaArrowRight } from "react-icons/fa";
export const Mode = () => {
  const mode = useSettingsStore((state) => state.mode);
  const setMode = useSettingsStore((state) => state.setMode);

  return (
    <div className="flex h-12">
      <button
        onClick={() => setMode("dec")}
        className="w-12 bg-ghost text-white flex items-center justify-center hover:cursor-pointer hover:bg-feature"
      >
        <FaArrowRight className="rotate-180" />
        <span className="sr-only">previous game mode</span>
      </button>
      <button className="relative flex-1 text-xl bg-ficsit-primary text-white font-bold hover:cursor-pointer group">
        START
        <span className="h-0 w-full bg-ficsit-secondary absolute left-0 bottom-0 group-hover:h-0.75 transition-[height]"></span>
      </button>
      <button
        onClick={() => setMode("inc")}
        className="w-12 bg-ghost text-white flex items-center justify-center hover:cursor-pointer hover:bg-feature"
      >
        <FaArrowRight />
        <span className="sr-only">next game mode</span>
      </button>
    </div>
  );
};
