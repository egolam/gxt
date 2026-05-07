import { db } from "@/db";
import { gameSessions } from "@/db/schema";
import { auth } from "@/lib/auth";
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
      { success: false, message: "unauthorized access" },
      { status: 429 },
    );
  }

  try {
    const activeGame = await db.query.gameSessions.findFirst({
      columns: {
        mode: true,
        phase: true,
        round: true,
        score: true,
        duration: true,
      },
      with: {
        gameRounds: {
          columns: {
            id: true,
            distance: true,
            score: true,
            round: true,
            guessX: true,
            guessY: true,
            isFinished: true,
          },
          with: {
            locations: {
              columns: {
                id: true,
                author: true,
                zoom: true,
                pov: true,
                cameraMode: true,
                x: true,
                y: true,
              },
            },
          },
        },
      },
      where: and(
        eq(gameSessions.userId, session.user.id),
        eq(gameSessions.id, gameid),
        eq(gameSessions.status, "playing"),
      ),
    });

    if (!activeGame) {
      return NextResponse.json(
        { success: false, message: "game not found" },
        { status: 404 },
      );
    }

    const publicData = {
      mode: activeGame.mode,
      phase: activeGame.phase,
      round: activeGame.round,
      score: activeGame.score,
      duration: activeGame.duration,
      gameRounds: activeGame.gameRounds.map((round) => {
        return {
          id: round.id,
          round: round.round,
          score: round.score,
          guessX: round.isFinished ? round.guessX : null,
          guessY: round.isFinished ? round.guessY : null,
          distance: round.distance,
          locationId: round.locations.id,
          zoom: round.locations.zoom,
          pov: round.locations.pov,
          author: round.locations.author,
          cameraMode: round.locations.cameraMode,
          exactX: round.isFinished ? round.locations.x : null,
          exactY: round.isFinished ? round.locations.y : null,
        };
      }),
    };

    return NextResponse.json(
      { success: true, message: "Game found", game: publicData },
      { status: 200 },
    );
  } catch (e) {
    console.error("something went wrong");
    return NextResponse.json(
      { success: false, message: "something went wrong" },
      { status: 500 },
    );
  }
}
