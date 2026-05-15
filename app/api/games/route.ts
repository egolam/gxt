import { db } from "@/db";
import { createGameSchema } from "@/schemas/game/create";
import { NextRequest, NextResponse } from "next/server";
import { addSeconds } from "@/helpers/add-seconds";
import { signInAnonymously } from "@/helpers/auth/sign-in-anonymously";
import { abandonActiveGames } from "@/helpers/db/abandon-active-games";
import { selectRandomLocation } from "@/helpers/db/select-random-location";
import { insertNewGame } from "@/helpers/db/insert-new-game";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const parsedBody = await createGameSchema.safeParseAsync(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { success: false, message: "Invalid input" },
      { status: 400 },
    );
  }

  const anonymousSignIn = await signInAnonymously();
  if (anonymousSignIn === false) {
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
      { status: 401 },
    );
  }
  try {
    const startNewGame = await db.transaction(async (tx) => {
      const abandonActiveGamesResponse = await abandonActiveGames(
        anonymousSignIn.userId,
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
        anonymousSignIn.userId,
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
