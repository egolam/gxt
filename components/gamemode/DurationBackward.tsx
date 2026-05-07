import { useSettingsStore } from "@/stores/settings";
import { FaChevronDown } from "react-icons/fa";

export const DurationBackward = () => {
  const setDuration = useSettingsStore((state) => state.setDuration);
  return (
    <button
      onClick={() => setDuration("dec")}
      className="size-8 flex items-center justify-center text-text hover:text-ficsit-secondary hover:cursor-pointer transition-transform"
    >
      <FaChevronDown />
    </button>
  );
};
