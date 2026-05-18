import { db } from "@/db";
import { createGameSchema } from "@/schemas/game/create";
import { NextRequest, NextResponse } from "next/server";
import { addSeconds } from "@/helpers/add-seconds";
import { abandonActiveGames } from "@/helpers/db/abandon-active-games";
import { selectRandomLocation } from "@/helpers/db/select-random-location";
import { insertNewGame } from "@/helpers/db/insert-new-game";
import { getSessionFromRequest } from "@/helpers/auth/get-session";
import { isRateLimited } from "@/helpers/rate-limiter";

export async function POST(request: NextRequest) {
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
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const limiter = await isRateLimited(ip, "create-game", {
    limit: 5,
    windowSeconds: 10,
  });

  if (!limiter.success) {
    return NextResponse.json(
      {
        success: false,
        message: "You can create 2 games in a minute",
      },
      {
        status: 429,
        headers: {
          "Retry-After": "10",
          "X-RateLimit-Limit": limiter.limit.toString(),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  const body = await request.json();

  const parsedBody = await createGameSchema.safeParseAsync(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { success: false, message: "Invalid input" },
      { status: 400 },
    );
  }

  try {
    const startNewGame = await db.transaction(async (tx) => {
      const abandonActiveGamesResponse = await abandonActiveGames(
        session.session.userId,
        tx,
      );
      if (!abandonActiveGamesResponse) {
        tx.rollback();
        throw new Error("Failed to abandon active games");
      }
      const randomLocation = await selectRandomLocation(tx);
      if (randomLocation === false) {
        tx.rollback();
        throw new Error("No location found");
      }
      const startedAt = new Date();
      const mustFinishBefore = !parsedBody.data.duration
        ? null
        : addSeconds(startedAt, parsedBody.data.duration);

      const insertNewGameResponse = await insertNewGame(
        session.user.id,
        parsedBody.data.gameMode,
        parsedBody.data.duration,
        startedAt,
        randomLocation.locationId,
        mustFinishBefore,
        tx,
      );

      if (insertNewGameResponse === false) {
        tx.rollback();
        throw new Error("Failed to create game");
      }

      return { gameid: insertNewGameResponse.gameid };
    });
    return NextResponse.json(
      {
        success: true,
        message: "Game created successfully",
        gameid: startNewGame.gameid,
      },
      { status: 201 },
    );
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
