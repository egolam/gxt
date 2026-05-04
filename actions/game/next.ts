"use server";

import { db } from "@/db";
import { gameRounds, gameSessions, locations } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { refresh } from "next/cache";
import { headers } from "next/headers";

export async function next(gameId: string) {
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
        eq(gameSessions.phase, "round_end"),
        eq(gameSessions.status, "playing"),
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
      .set({ phase: "guessing", round: activeGame.round + 1 })
      .where(
        and(
          eq(gameSessions.userId, session.user.id),
          eq(gameSessions.id, gameId),
          eq(gameSessions.phase, "round_end"),
          eq(gameSessions.status, "playing"),
        ),
      );

    const totalLocations = await db.query.stats.findFirst({
      columns: { locationCount: true },
    });

    if (!totalLocations?.locationCount || totalLocations?.locationCount <= 0) {
      return {
        success: false,
        message: "Settings not found",
      };
    }

    const randomIndex = Math.floor(
      Math.random() * totalLocations.locationCount,
    );

    const randomLocation = await db
      .select()
      .from(locations)
      .limit(1)
      .offset(randomIndex);

    if (!randomLocation || randomLocation.length <= 0) {
      return {
        success: false,
        message: "Location not found. Contact Admin",
      };
    }

    await db.insert(gameRounds).values({
      id: nanoid(),
      gameId,
      locationId: randomLocation[0].id,
      round: activeGame.round + 1,
    });

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
