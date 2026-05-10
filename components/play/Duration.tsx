import { useSettingsStore } from "@/stores/settings";
import { FaChevronDown } from "react-icons/fa";

export const Duration = () => {
  const duration = useSettingsStore((state) => state.duration);
  const setDuration = useSettingsStore((state) => state.setDuration);
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => setDuration("dec")}
        className="size-8 flex items-center justify-center text-text hover:cursor-pointer hover:text-white"
      >
        <FaChevronDown />
      </button>
      <p className="text-white border-b border-text  w-16 text-center">
        {duration} sec
      </p>
      <button
        onClick={() => setDuration("inc")}
        className="size-8 flex items-center justify-center text-text hover:cursor-pointer hover:text-white"
      >
        <FaChevronDown className="rotate-180" />
      </button>
    </div>
  );
};
