"use client";

import { Duration } from "@/components/play/Duration";
import { Mode } from "@/components/play/Mode";
import { useSettingsStore } from "@/stores/settings";

export default function PlayPage() {
  const mode = useSettingsStore((state) => state.mode);

  return (
    <section className="flex flex-col items-center sm:gap-8 justify-center w-full h-full">
      <div className="flex flex-col w-full h-full md:pb-8 md:h-auto md:aspect-1/2 max-h-128 max-w-64 md:max-w-72 py-4">
        <div className="flex-1 flex flex-col p-4 justify-between bg-feature">
          <div className="flex flex-col gap-2">
            <div className="flex items-center relative">
              {/* <p className="font-medium leading-none">GAME MODE: </p> */}
              <h2 className="font-semibold text-xl text-white leading-none mt-1">
                {mode.display}
              </h2>
            </div>
            <p className="text-text leading-none">{mode.sub}</p>
          </div>

          <div className="flex flex-col gap-2">
            {/* <p className="leading-none text-text">{mode.desc}</p> */}
            {mode.value === "countdown" && <Duration />}
          </div>
        </div>
        <Mode />
      </div>
    </section>
  );
}
