ALTER TABLE "game_sessions" ALTER COLUMN "duration" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "game_sessions" ALTER COLUMN "duration" DROP NOT NULL;