import { db } from "@/db";
import { gameRounds, gameSessions } from "@/db/schema";
import { getDistance } from "@/helpers/distance";
import { getScore } from "@/helpers/score";
import { auth } from "@/lib/auth";
import { guessSchema } from "@/schemas/game/guess";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ gameid: string; roundid: string }> },
) {
  const guessedAt = new Date();

  const { gameid, roundid } = await params;
  const body = await request.json();

  const parsedBody = await guessSchema.safeParseAsync(body);

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
      const activeGame = await db.query.gameSessions.findFirst({
        with: {
          gameRounds: {
            with: {
              locations: true,
            },
            where: and(
              eq(gameRounds.id, roundid),
              eq(gameRounds.isFinished, false),
            ),
          },
        },
        where: and(
          eq(gameSessions.userId, session.user.id),
          eq(gameSessions.id, gameid),
          eq(gameSessions.status, "playing"),
        ),
      });

      if (!activeGame) {
        tx.rollback();
        throw new Error("game not found");
      }

      const mustFinishedBefore =
        activeGame.mode === "casual"
          ? null
          : activeGame.gameRounds[0].mustFinishedBefore;

      const expired: boolean = !mustFinishedBefore
        ? false
        : guessedAt > mustFinishedBefore;
      const exactX = activeGame.gameRounds[0].locations.x;
      const exactY = activeGame.gameRounds[0].locations.y;

      const distance =
        expired || !parsedBody.success
          ? null
          : getDistance(parsedBody.data.guessXY, [exactX, exactY]);

      const score =
        expired || !parsedBody.success || !distance ? 0 : getScore(distance);

      await tx
        .update(gameSessions)
        .set({
          score: activeGame.score + score,
          phase: "round_end",
        })
        .where(eq(gameSessions.id, activeGame.id));

      await tx
        .update(gameRounds)
        .set({
          score: score,
          distance: distance,
          guessedAt: expired ? null : guessedAt,
          guessX:
            !expired && parsedBody.success ? parsedBody.data.guessXY[0] : null,
          guessY:
            !expired && parsedBody.success ? parsedBody.data.guessXY[1] : null,
          isFinished: true,
        })
        .where(eq(gameRounds.id, activeGame.gameRounds[0].id));
    });

    return NextResponse.json(
      {
        success: true,
        message: "round ended successfully",
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "something went wrong" },
      { status: 500 },
    );
  }
}
