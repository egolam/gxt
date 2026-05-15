import "server-only";

import { gameRounds, gameSessions } from "@/db/schema";
import { Transaction } from "@/db";

export async function insertNewGame(
  userId: string,
  mode: "casual" | "countdown" | "survive",
  duration: number | null,
  startedAt: Date,
  locationId: number,
  mustFinishBefore: Date | null,
  tx: Transaction,
) {
  try {
    const [id]: { id: number }[] = await tx
      .insert(gameSessions)
      .values({
        userId,
        duration,
        mode,
        status: "playing",
        phase: "guessing",
        startedAt,
      })
      .returning({ id: gameSessions.id });

    await tx.insert(gameRounds).values({
      gameId: id.id,
      locationId,
      startedAt: startedAt,
      mustFinishBefore,
    });

    return { gameid: id.id };
  } catch (e) {
    return false;
  }
}
