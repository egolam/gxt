export type GameMode = "casual" | "survive" | "countdown";
interface IGameModes {
  id: number;
  value: GameMode;
  display: string;
  sub: string;
  desc: string;
  round: string;
}

export const gameModes: IGameModes[] = [
  {
    id: 1,
    value: "casual",
    display: "CASUAL",
    sub: "Ideal for first-time pioneers.",
    desc: "No time limit in this mode. Just play and chill.",
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

export const durations = [1, 2, 5, 10, 15, 20, 30, 45, 60] as const;
export type Duration = (typeof durations)[number];
