import "server-only";

import { Transaction } from "@/db";
import { gameRounds, gameSessions } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function updateGameByGuess(
  id: string,
  roundId: number,
  tx: Transaction,
  totalScore: number,
  roundScore: number,
  distance: number | null,
  expired: boolean,
  guessedAt: Date,
  guessXY: [number, number] | null,
) {
  try {
    await tx
      .update(gameSessions)
      .set({
        score: totalScore + roundScore,
        phase: "round_end",
      })
      .where(eq(gameSessions.id, Number(id)));
    await tx
      .update(gameRounds)
      .set({
        score: roundScore,
        distance: distance,
        guessedAt: expired ? null : guessedAt,
        guessX: guessXY?.[0],
        guessY: guessXY?.[1],
        isFinished: true,
        
      })
      .where(
        and(eq(gameRounds.id, roundId), eq(gameRounds.gameId, Number(id))),
      );

    return true;
  } catch (e) {
    return false;
  }
}
