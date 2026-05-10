import { useSettingsStore } from "@/stores/settings";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const ModeForward = () => {
  const setMode = useSettingsStore((state) => state.setMode);
  return (
    <button
      onClick={() => setMode("inc")}
      className="text-white w-8 md:w-16 flex items-center justify-center hover:cursor-pointer group"
    >
      <div className="border border-ficsit-primary text-ficsit-primary size-8 flex items-center justify-center group-hover:bg-ficsit-primary group-hover:border-ficsit-primary group-hover:text-white ">
        <FaArrowRight />
      </div>
    </button>
  );
};
