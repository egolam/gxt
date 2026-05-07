import { db } from "@/db";
import { gameRounds, gameSessions, locations } from "@/db/schema";
import { auth } from "@/lib/auth";
import { createGameSchema } from "@/schemas/game/create";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { addSeconds } from "@/helpers/add-seconds";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsedBody = await createGameSchema.safeParseAsync(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { success: false, message: "invalid input" },
      { status: 400 },
    );
  }

  const startedAt = new Date();
  const mustFinishedBefore = addSeconds(startedAt, parsedBody.data.duration);

  let userId: string = "";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const anonymous = await auth.api.signInAnonymous({
      headers: await headers(),
    });

    if (!anonymous) {
      return NextResponse.json(
        { success: false, message: "unauthorized access" },
        { status: 429 },
      );
    }
    userId = anonymous.user.id;
  } else {
    userId = session.user.id;
  }

  try {
    const newGame = await db.transaction(async (tx) => {
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

      const gameId = nanoid();
      const [inserted] = await tx
        .insert(gameSessions)
        .values({
          id: gameId,
          userId,
          duration: parsedBody.data.duration,
          mode: parsedBody.data.mode,
          status: "playing",
          phase: "guessing",
          startedAt,
        })
        .returning();

      const totalLocations = await tx.query.stats.findFirst({
        columns: { locationCount: true },
      });

      if (
        !totalLocations?.locationCount ||
        totalLocations?.locationCount <= 0
      ) {
        tx.rollback();
        throw new Error("location count not found");
      }

      const randomIndex = Math.floor(
        Math.random() * totalLocations.locationCount,
      );

      const [randomLocation] = await tx
        .select()
        .from(locations)
        .limit(1)
        .offset(randomIndex);

      if (!randomLocation) {
        tx.rollback();
        throw new Error("location not found");
      }

      const roundId = nanoid();
      await tx
        .insert(gameRounds)
        .values({
          id: roundId,
          gameId: inserted.id,
          locationId: randomLocation.id,
          startedAt: startedAt,
          mustFinishedBefore:
            parsedBody.data.mode !== "casual" ? mustFinishedBefore : null,
        })
        .returning();

      return {
        gameId,
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: "game created successfully",
        gameId: newGame.gameId,
      },
      { status: 201 },
    );
  } catch (e) {
    console.error("failed to start game:", e);
    return NextResponse.json(
      { success: false, message: "could not initialize game" },
      { status: 500 },
    );
  }
}
