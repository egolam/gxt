import { fetcher } from "@/helpers/fetcher";
import useSWR from "swr";

export function useGame(gameid: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<{
    success: boolean;
    message: string;
    game: {
      id: number;
      mode: "casual" | "countdown" | "survive";
      round: number;
      phase: "countdown" | "pending" | "guessing" | "round_end" | "game_end";
      score: number;
      duration: number | null;
      gameRounds: {
        id: number;
        round: number;
        score: number | null;
        distance: number | null;
        gx: number | null;
        gy: number | null;
        startedAt: Date;
        mustFinishBefore: Date | null;
        locations: {
          id: number;
          zoom: number;
          pov: number;
          author: string;
          ex: number | null;
          ey: number | null;
          url: string;
        };
      }[];
    };
  }>(`/api/games/${gameid}`, fetcher);
  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
