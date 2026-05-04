"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Duration, Mode } from "@/types/types";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { gameRounds, gameSessions, locations } from "@/db/schema";
import { nanoid } from "nanoid";

export async function start(gameMode: Mode, duration: Duration) {
  let userId: string = "";
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      const anon = await auth.api.signInAnonymous({
        headers: await headers(),
      });

      if (!anon) {
        return {
          success: false,
          message: "Anonymous sign-in failed. Contact Admin.",
        };
      }

      userId = anon.user.id;
    } else {
      userId = session?.user.id as string;
    }

    await db
      .update(gameSessions)
      .set({ status: "abandoned" })
      .where(
        and(
          eq(gameSessions.userId, userId),
          eq(gameSessions.status, "playing"),
        ),
      );

    const newGame = await db
      .insert(gameSessions)
      .values({
        id: nanoid(),
        userId: userId,
        mode: gameMode,
        status: "playing",
        phase: "guessing",
        duration: duration,
      })
      .returning();

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
      gameId: newGame[0].id,
      locationId: randomLocation[0].id,
    });

    return {
      success: true,
      message: "Game created successfully",
      data: newGame[0].id,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "",
    };
  }
}
