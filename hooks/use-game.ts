import { fetcher } from "@/helpers/fetcher";
import useSWR from "swr";

export function useGame(gameId: string) {
  const { data, error, isLoading, isValidating } = useSWR<{
    success: boolean;
    message: string;
    game: {
      score: number;
      mode: "casual" | "countdown" | "survive";
      round: number;
      phase: "countdown" | "pending" | "guessing" | "round_end" | "game_end";
      duration: number;
      gameRounds: {
        distance: number | null;
        score: number;
        round: number;
        startedAt: Date;
        slug: string;
        guessX: number | null;
        guessY: number | null;
        isFinished: boolean;
        location: {
          author: string;
          pov: number;
          zoom: number;
          slug: string;
          x: number;
          y: number;
          cameraMode: "firstperson" | "selfie" | "decoupled";
        };
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
