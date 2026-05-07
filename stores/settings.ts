import { create } from "zustand";

interface IModes {
  id: number;
  value: "casual" | "survive" | "countdown";
  display: string;
  sub: string;
  desc: string;
  round: string;
}
const DURATIONS_ARRAY = [1, 2, 5, 10, 15, 20, 30, 45, 60] as const;
type Duration = (typeof DURATIONS_ARRAY)[number];

const modes: IModes[] = [
  {
    id: 1,
    value: "casual",
    display: "CASUAL",
    sub: "Ideal for first-time pioneers.",
    desc: "No time and guess limit in this mode. Just play and chill.",
    round: "5 rounds",
  },
  {
    id: 2,
    value: "countdown",
    display: "COUNTDOWN",
    sub: "Good for more experienced pioneers.",
    desc: "Select a time limit and proceed. I must warn you, this mode is not ideal for first-time pioneers.",
    round: "5 rounds",
  },
  {
    id: 3,
    value: "survive",
    display: "SURVIVE",
    sub: "Recommended for advanced pioneers.",
    desc: "You will be playing entire catalogue of locations. You must guess within 50 meters of exact location. Otherwise the STREAK will come to an end...",
    round: "???",
  },
] as const;

interface State {
  mode: IModes;
  duration: Duration;
  setMode: (value: "inc" | "dec") => void;
  setDuration: (value: "inc" | "dec") => void;
  reset: () => void;
}

export const useSettingsStore = create<State>((set, get) => ({
  mode: modes[0],
  duration: 30,

  setMode: (value) => {
    set((state) => ({
      mode:
        value === "inc"
          ? modes.find(
              (mode) =>
                mode.id ===
                (state.mode.id === modes.length ? 1 : state.mode.id + 1),
            )
          : modes.find(
              (mode) =>
                mode.id === (state.mode.id === 1 ? 3 : state.mode.id - 1),
            ),
    }));
  },
  setDuration: (value) => {
    set((state) => ({
      duration:
        value === "inc"
          ? DURATIONS_ARRAY.find(
              (duration) =>
                duration ===
                DURATIONS_ARRAY[
                  DURATIONS_ARRAY.indexOf(state.duration) ===
                  DURATIONS_ARRAY.length - 1
                    ? 0
                    : DURATIONS_ARRAY.indexOf(state.duration) + 1
                ],
            )
          : DURATIONS_ARRAY.find(
              (duration) =>
                duration ===
                DURATIONS_ARRAY[
                  DURATIONS_ARRAY.indexOf(state.duration) === 0
                    ? DURATIONS_ARRAY.length - 1
                    : DURATIONS_ARRAY.indexOf(state.duration) - 1
                ],
            ),
    }));
  },
  reset: () => {
    set(() => ({
      mode: modes[0],
      duration: 30,
    }));
  },
}));
