import "server-only";
import { Transaction } from "@/db";
import { gameRounds, gameSessions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function goToNextRound(
  id: string,
  tx: Transaction,
  currentRound: number,
  locationId: number,
  startedAt: Date,
  mustFinishBefore: Date | null,
) {
  try {
    await tx
      .update(gameSessions)
      .set({
        round: currentRound + 1,
        phase: "guessing",
      })
      .where(eq(gameSessions.id, Number(id)));
    await tx.insert(gameRounds).values({
      gameId: Number(id),
      locationId,
      startedAt: startedAt,
      mustFinishBefore,
      round: currentRound + 1,
    });
    return true;
  } catch {
    return false;
  }
}
