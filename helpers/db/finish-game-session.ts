import "server-only";
import { Transaction } from "@/db";
import { gameSessions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function finishGameSession(
  id: string,
  tx: Transaction,
  startedAt: Date,
) {
  try {
    await tx
      .update(gameSessions)
      .set({
        phase: "game_end",
        status: "finished",
        finishedAt: startedAt,
      })
      .where(eq(gameSessions.id, Number(id)));

    return true;
  } catch {
    return false;
  }
}
