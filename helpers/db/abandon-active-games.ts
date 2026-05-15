import "server-only";

import { Transaction } from "@/db";
import { gameSessions } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function abandonActiveGames(userId: string, tx: Transaction) {
  try {
    await tx
      .update(gameSessions)
      .set({
        status: "abandoned",
      })
      .where(
        and(
          eq(gameSessions.userId, userId),
          eq(gameSessions.status, "playing"),
        ),
      );
    return true;
  } catch {
    return false;
  }
}
