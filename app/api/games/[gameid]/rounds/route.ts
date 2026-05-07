import { db } from "@/db";
import { gameRounds, gameSessions, locations } from "@/db/schema";
import { addSeconds } from "@/helpers/add-seconds";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ gameid: string }> },
) {
  const { gameid } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { success: false, message: "unauthorized access" },
      { status: 429 },
    );
  }

  try {
    const res = await db.transaction(async (tx) => {
      const game = await tx.query.gameSessions.findFirst({
        columns: {
          id: true,
          phase: true,
          round: true,
          duration: true,
          mode: true,
        },
        where: and(
          eq(gameSessions.userId, session.user.id),
          eq(gameSessions.id, gameid),
          eq(gameSessions.status, "playing"),
          eq(gameSessions.phase, "round_end"),
        ),
      });

      if (!game) {
        tx.rollback();
        throw new Error("game not found");
      }

      const startedAt = new Date();
      const mustFinishedBefore = addSeconds(startedAt, game.duration);

      const gameEnded = game.round === 5 && game.phase === "round_end";
      if (gameEnded) {
        await tx
          .update(gameSessions)
          .set({
            phase: "game_end",
            status: "finished",
            finishedAt: startedAt,
          })
          .where(eq(gameSessions.id, game.id));
      } else {
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
          .update(gameSessions)
          .set({
            round: game.round + 1,
            phase: "guessing",
          })
          .where(eq(gameSessions.id, game.id));
        await tx.insert(gameRounds).values({
          id: roundId,
          gameId: game.id,
          locationId: randomLocation.id,
          startedAt: startedAt,
          mustFinishedBefore:
            game.mode !== "casual" ? mustFinishedBefore : null,
          round: game.round + 1,
        });
      }

      return {
        gameEnded,
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: res.gameEnded
          ? "game ended successfully"
          : "new round created successfully",
      },
      { status: res.gameEnded ? 200 : 201 },
    );
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "something went wrong" },
      { status: 500 },
    );
  }
}
