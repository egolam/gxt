import { db } from "@/db";
import { gameSessions } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq, or } from "drizzle-orm";
import { headers } from "next/headers";

export async function find(gameId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const activeGame = await db.query.gameSessions.findFirst({
      with: {
        gameRounds: {
          with: {
            locations: {
              columns: {
                author: true,
                zoom: true,
                pov: true,
                id: true,
                x: true,
                y: true,
              },
            },
          },
        },
      },
      where: and(
        eq(gameSessions.userId, session?.user.id!),
        eq(gameSessions.id, gameId),
        or(
          eq(gameSessions.status, "playing"),
          eq(gameSessions.phase, "game_end"),
        ),
      ),
    });

    if (!activeGame) {
      return {
        success: false,
        message: "Game not found",
      };
    }

    return {
      success: true,
      message: "",
      game: activeGame,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
