import { useSettingsStore } from "@/stores/settings";

export const ModeDuration = () => {
  const duration = useSettingsStore((state) => state.duration);
  return (
    <div className="border-b w-16 h-8 flex items-center justify-center border-ghost">
      <p className="text-white">{duration}sec</p>
    </div>
  );
};
