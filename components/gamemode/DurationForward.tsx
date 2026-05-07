import { useSettingsStore } from "@/stores/settings";
import { FaChevronUp } from "react-icons/fa";

export const DurationForward = () => {
  const setDuration = useSettingsStore((state) => state.setDuration);
  return (
    <button
      onClick={() => setDuration("inc")}
      className="size-8 flex items-center justify-center text-text hover:text-ficsit-secondary hover:cursor-pointer transition-transform"
    >
      <FaChevronUp />
    </button>
  );
};
