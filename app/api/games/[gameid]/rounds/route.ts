import { db } from "@/db";
import { gameSessions } from "@/db/schema";
import { addSeconds } from "@/helpers/add-seconds";
import { getSessionFromRequest } from "@/helpers/auth/get-session";
import { finishGameSession } from "@/helpers/db/finish-game-session";
import { goToNextRound } from "@/helpers/db/go-to-next-round";
import { selectRandomLocation } from "@/helpers/db/select-random-location";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
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
    await db.transaction(async (tx) => {
      const startedAt = new Date();
      const gameEnded =
        activeGame.round === 5 && activeGame.phase === "round_end";

      if (gameEnded) {
        const finishGameSessionResponse = await finishGameSession(
          gameid,
          tx,
          startedAt,
        );
        if (!finishGameSessionResponse) {
          tx.rollback();
          throw new Error("Failed to finish the game");
        }
      } else {
        const randomLocation = await selectRandomLocation(tx);
        if (randomLocation === false) {
          tx.rollback();
          throw new Error("no location found");
        }
        const duration =
          activeGame.mode === "casual"
            ? null
            : activeGame.mode === "survive"
              ? 30
              : activeGame.duration;
        const mustFinishBefore = !duration
          ? null
          : addSeconds(startedAt, duration);
        const goToNextRoundResponse = await goToNextRound(
          gameid,
          tx,
          activeGame.round,
          randomLocation.locationId,
          startedAt,
          mustFinishBefore,
        );
        if (!goToNextRoundResponse) {
          tx.rollback();
          throw new Error("Failed to update game");
        }
      }
    });
    return NextResponse.json({ success: true, message: "" }, { status: 201 });
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
