import { db } from "@/db";
import { gameSessions } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq, or } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ gameslug: string }> },
) {
  const { gameslug } = await params;

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
            slug: true,
            distance: true,
            score: true,
            round: true,
            guessX: true,
            guessY: true,
            startedAt: true,
            isFinished: true,
          },
          with: {
            locations: {
              columns: {
                slug: true,
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
        eq(gameSessions.slug, gameslug),
        or(
          eq(gameSessions.status, "playing"),
          eq(gameSessions.status, "finished"),
        ),
      ),
    });

    if (!activeGame) {
      return NextResponse.json(
        { success: false, message: "game not found" },
        { status: 404 },
      );
    }

    const activeRound =
      activeGame.phase !== "game_end"
        ? [
            activeGame.gameRounds.find(
              (round) => round.round === activeGame.round,
            ),
          ]
        : activeGame.gameRounds;
    const publicData = {
      mode: activeGame.mode,
      phase: activeGame.phase,
      round: activeGame.round,
      score: activeGame.score,
      duration: activeGame.duration,
      gameRounds: activeRound.map((round) => {
        return {
          slug: round?.slug,
          round: round?.round,
          score: round?.score,
          startedAt: round?.startedAt,
          guessX: round?.guessX,
          guessY: round?.guessY,
          distance: round?.distance,
          location: {
            slug: round?.locations.slug,
            zoom: round?.locations.zoom,
            author: round?.locations.author,
            pov: round?.locations.pov,
            cameraMode: round?.locations.cameraMode,
            x: activeGame.phase !== "guessing" ? round?.locations.x : null,
            y: activeGame.phase !== "guessing" ? round?.locations.y : null,
          },
        };
      }),
    };

    return NextResponse.json(
      { success: true, message: "game found", game: publicData },
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