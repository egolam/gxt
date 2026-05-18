import { redis } from "@/lib/redis";

export interface ActiveGameState {
  gameId: string;
  userId: string;
  currentRound: number;
  accumulatedScore: number;
  targetCoordinates: { lat: number; lng: number };
  roundStartedAt: number; // Timestamp
}

const GAME_TTL = 3600; // 1 hour in seconds

export async function setActiveGameState(
  gameId: string,
  state: ActiveGameState,
): Promise<void> {
  const key = `active-game:${gameId}`;
  await redis.set(key, JSON.stringify(state), "EX", GAME_TTL);
}

export async function getActiveGameState(
  gameId: string,
): Promise<ActiveGameState | null> {
  const key = `active-game:${gameId}`;
  const data = await redis.get(key);
  if (!data) return null;
  return JSON.parse(data) as ActiveGameState;
}

export async function deleteActiveGameState(gameId: string): Promise<void> {
  const key = `active-game:${gameId}`;
  await redis.del(key);
}
