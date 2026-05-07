ALTER TABLE "game_rounds" ALTER COLUMN "distance" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "game_rounds" ALTER COLUMN "distance" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "time_sanity" CHECK ("game_sessions"."finished_at" > "game_sessions"."started_at");