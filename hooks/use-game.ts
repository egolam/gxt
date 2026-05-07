import { fetcher } from "@/helpers/fetcher";
import useSWR from "swr";

export function useGame(gameId: string) {
  const { data, error, isLoading, isValidating } = useSWR<{
    success: boolean;
    message: string;
    game: {
      mode: "casual" | "countdown" | "survive";
      phase: "countdown" | "pending" | "guessing" | "round_end" | "game_end";
      round: number;
      score: number;
      duration: number;
      gameRounds: {
        id: string;
        round: number;
        score: number;
        guessX: number | null;
        guessY: number | null;
        distance: number | null;
        locationId: string;
        zoom: number;
        pov: number;
        author: string;
        cameraMode: "firstperson" | "selfie" | "decoupled";
        exactX: number | null;
        exactY: number | null;
      }[];
    };
  }>(`/api/games/${gameId}`, fetcher);
  return {
    data,
    error,
    isLoading,
    isValidating,
  };
}
