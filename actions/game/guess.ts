"use server";

import { db } from "@/db";
import { gameRounds, gameSessions } from "@/db/schema";
import { getDistance } from "@/helpers/distance";
import { getScore } from "@/helpers/score";
import { auth } from "@/lib/auth";
import { and, eq, sql } from "drizzle-orm";
import { refresh } from "next/cache";
import { headers } from "next/headers";

export async function guess(guess: [number, number] | null, gameId: string) {
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
      with: {
        gameRounds: {
          with: {
            locations: {
              columns: {
                x: true,
                y: true,
              },
            },
          },
        },
      },
      where: and(
        eq(gameSessions.userId, session.user.id),
        eq(gameSessions.id, gameId),
        eq(gameSessions.phase, "guessing"),
        eq(gameSessions.status, "playing"),
      ),
    });

    if (!activeGame) {
      return {
        success: false,
        message: "Game not found",
      };
    }

    const exactX = activeGame.gameRounds[activeGame.round - 1].locations.x;
    const exactY = activeGame.gameRounds[activeGame.round - 1].locations.y;
    const distance = getDistance(guess, [exactX, exactY]);
    const score = getScore(distance);

    await db
      .update(gameSessions)
      .set({
        score: activeGame.score + score,
        phase: "round_end",
      })
      .where(
        and(
          eq(gameSessions.userId, session.user.id),
          eq(gameSessions.id, gameId),
          eq(gameSessions.phase, "guessing"),
          eq(gameSessions.status, "playing"),
        ),
      );

    await db
      .update(gameRounds)
      .set({
        guessedAt: sql`now()`,
        score,
        guessX: guess?.[0],
        guessY: guess?.[1],
        isFinished: true,
        distance,
      })
      .where(
        and(
          eq(gameRounds.gameId, gameId),
          eq(gameRounds.round, activeGame.round),
        ),
      );

    refresh();
    return {
      success: true,
      message: "Round finished",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
