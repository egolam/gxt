import { useSettingsStore } from "@/stores/settings";
import { FaArrowLeft } from "react-icons/fa";

export const ModeBackward = () => {
  const setMode = useSettingsStore((state) => state.setMode);
  return (
    <button
      onClick={() => setMode("dec")}
      className="text-white w-8 md:w-16 flex items-center justify-center hover:cursor-pointer group"
    >
      <div className="border border-ficsit-primary text-ficsit-primary size-8 flex items-center justify-center group-hover:bg-ficsit-primary group-hover:border-ficsit-primary group-hover:text-white ">
        <FaArrowLeft />
      </div>
    </button>
  );
};
