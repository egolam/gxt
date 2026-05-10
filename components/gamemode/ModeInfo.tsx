import { useSettingsStore } from "@/stores/settings";

export const ModeInfo = () => {
  const mode = useSettingsStore((state) => state.mode);
  return (
    <div className="absolute top-5 -left-2 flex flex-col gap-3">
      <div className="bg-ficsit-primary md:px-5 md:py-2 flex flex-col justify-center gap-1 text-white max-w-fit shadow-md shadow-secondary">
        <p className="leading-none">Game Mode:</p>
        <h2 className="leading-none md:text-xl font-semibold tracking-wider">
          {mode.display}
        </h2>
      </div>
      <div className="md:px-5 md:py-1 flex gap-1 text-text tracking-wider">
        {mode.sub}
      </div>
    </div>
  );
};
