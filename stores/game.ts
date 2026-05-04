import { create } from "zustand";

interface State {
  guessXY: [number, number] | null;
  exactXY: [number, number] | null;

  setGuessXY: (value: [number, number] | null) => void;
  setExactXY: (value: [number, number] | null) => void;

  reset: () => void;
}

export const useGameStore = create<State>((set) => ({
  guessXY: null,
  exactXY: null,
  resetZoom: false,

  setGuessXY: (value) => {
    set(() => ({ guessXY: value }));
  },

  setExactXY: (value) => {
    set(() => ({ exactXY: value }));
  },

  reset: () => {
    set((state) => ({
      exactXY: null,
      guessXY: null,
    }));
  },
}));
