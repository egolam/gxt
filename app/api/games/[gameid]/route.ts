import { db } from "@/db";
import { gameSessions } from "@/db/schema";
import { getSessionFromRequest } from "@/helpers/auth/get-session";
import { updateGameByGuess } from "@/helpers/db/update-game-by-guess";
import { getDistance } from "@/helpers/game/distance";
import { getScore } from "@/helpers/game/score";
import { auth } from "@/lib/auth";
import { guessSchema } from "@/schemas/game/guess";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ gameid: string }> },
) {
  const { gameid } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
      { status: 401 },
    );
  }

  const activeGame = await db.query.gameSessions.findFirst({
    columns: {
      userId: false,
      streak: false,
      startedAt: false,
    },
    with: {
      gameRounds: {
        columns: {
          gameId: false,
          guessedAt: false,
          locationId: false,
          isFinished: false,
        },
        with: {
          locations: {
            columns: {
              reported: false,
              difficulty: false,
              createdAt: false,
              updatedAt: false,
              cameraMode: false,
            },
          },
        },
      },
    },

    where: and(
      eq(gameSessions.id, Number(gameid)),
      eq(gameSessions.userId, session.user.id),
    ),
  });

  if (!activeGame) {
    return NextResponse.json(
      { success: false, message: "Game not found" },
      { status: 404 },
    );
  }

  const activeRound =
    activeGame.phase !== "game_end"
      ? [
          activeGame?.gameRounds.find(
            (round) => round.round === activeGame.round,
          )!,
        ]
      : activeGame.gameRounds!;

  const publicData = {
    id: activeGame.id,
    mode: activeGame.mode,
    round: activeGame.round,
    phase: activeGame.phase,
    score: activeGame.score,
    duration: activeGame.mode === "casual" ? null : activeGame.duration,
    gameRounds: activeRound.map((round) => {
      return {
        id: round.id,
        round: round.round,
        score: activeGame.phase === "guessing" ? null : round.score,
        distance: activeGame.phase === "guessing" ? null : round.distance,
        gx: activeGame.phase === "guessing" ? null : round.guessX,
        gy: activeGame.phase === "guessing" ? null : round.guessY,
        startedAt: round.startedAt,
        mustFinishBefore: round.mustFinishBefore,
        locations: {
          id: round.locations.id,
          zoom: round.locations.zoom,
          pov: round.locations.pov,
          author: round.locations.author,
          ex: activeGame.phase === "guessing" ? null : round.locations.x,
          ey: activeGame.phase === "guessing" ? null : round.locations.y,
          url: round.locations.url,
        },
      };
    }),
  };

  return NextResponse.json(
    { success: true, message: "game found", game: publicData },
    { status: 200 },
  );
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ gameid: string }> },
) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized access",
      },
      { status: 401 },
    );
  }
  const { gameid } = await params;
  const gameidToNumber = Number(gameid);
  const body = await request.json();
  const parsedBody = await guessSchema.safeParseAsync(body);
  const activeGame = await db.query.gameSessions.findFirst({
    with: {
      gameRounds: {
        with: {
          locations: true,
        },
      },
    },
    where: and(
      eq(gameSessions.id, gameidToNumber),
      eq(gameSessions.userId, session.user.id),
    ),
  });

  if (!activeGame) {
    return NextResponse.json(
      { success: false, message: "Game not found" },
      { status: 404 },
    );
  }
  try {
    const guessedAt = new Date();
    const currentRound = activeGame.gameRounds.find(
      (round) => round.round === activeGame.round && round.isFinished === false,
    );

    if (!currentRound) {
      return NextResponse.json(
        { success: false, message: "Round not found" },
        { status: 404 },
      );
    }
    const expired =
      parsedBody.success || !currentRound.mustFinishBefore
        ? false
        : guessedAt > currentRound.mustFinishBefore;
    const exactX = currentRound.locations.x;
    const exactY = currentRound.locations.y;
    const distance =
      expired || !parsedBody.success
        ? null
        : getDistance(parsedBody.data?.guessXY, [exactX, exactY]);
    const score =
      expired || !parsedBody.success || !distance ? 0 : getScore(distance);
    await db.transaction(async (tx) => {
      const updateGameByGuessResponse = await updateGameByGuess(
        gameid,
        currentRound.id,
        tx,
        activeGame.score,
        score,
        distance,
        expired,
        guessedAt,
        parsedBody.data?.guessXY as [number, number] | null,
      );
      if (!updateGameByGuessResponse) {
        tx.rollback();
        throw new Error("Failed to update game");
      }
    });

    return NextResponse.json({ success: true, message: "" }, { status: 200 });
  } catch (error: any) {
    if (error.message === "Rollback") {
      return NextResponse.json(
        { success: false, message: "Database error" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Unknown error" },
      { status: 500 },
    );
  }
}
