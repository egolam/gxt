ALTER TABLE "game_rounds" ALTER COLUMN "started_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "game_sessions" ALTER COLUMN "started_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "game_sessions" ALTER COLUMN "finished_at" SET NOT NULL;