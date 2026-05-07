"use client";

import { useSettingsStore } from "@/stores/settings";

export default function SettingsPage() {
  const mode = useSettingsStore((state) => state.duration);
  const setMode = useSettingsStore((state) => state.setDuration);

  console.log(mode);

  return (
    <div>
      <button className="bg-red-500 w-32 h-8 text-text" onClick={() => setMode("inc")}>inc</button>
      <button className="bg-red-500 w-32 h-8 text-text" onClick={() => setMode("dec")}>dec</button>
    </div>
  );
}
