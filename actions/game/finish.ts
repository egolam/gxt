"use server";

import { db } from "@/db";
import { gameSessions } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq, sql } from "drizzle-orm";
import { refresh } from "next/cache";
import { headers } from "next/headers";

export async function finish(gameId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const activeGame = await db.query.gameSessions.findFirst({
      where: and(
        eq(gameSessions.userId, session.user.id),
        eq(gameSessions.id, gameId),
        eq(gameSessions.phase, "round_end"),
        eq(gameSessions.status, "playing"),
        eq(gameSessions.round, 5),
      ),
    });

    if (!activeGame) {
      return {
        success: false,
        message: "Game not found",
      };
    }

    await db
      .update(gameSessions)
      .set({
        phase: "game_end",
        status: "finished",
        finishedAt: sql`now()`,
      })
      .where(
        and(
          eq(gameSessions.userId, session.user.id),
          eq(gameSessions.id, gameId),
          eq(gameSessions.phase, "round_end"),
          eq(gameSessions.status, "playing"),
          eq(gameSessions.round, 5),
        ),
      );

    return {
      success: true,
      message: "Game finished",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
