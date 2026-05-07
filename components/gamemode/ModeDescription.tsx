import { useSettingsStore } from "@/stores/settings";

export const ModeDescription = () => {
  const mode = useSettingsStore((state) => state.mode);
  return <p className="text-balance">{mode.desc}</p>;
};
