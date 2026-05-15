ALTER TABLE "game_rounds" DROP CONSTRAINT "game_rounds_slug_unique";--> statement-breakpoint
ALTER TABLE "game_sessions" DROP CONSTRAINT "game_sessions_slug_unique";--> statement-breakpoint
ALTER TABLE "locations" DROP CONSTRAINT "locations_slug_unique";--> statement-breakpoint
DROP INDEX "game_sessions_user_status_idx";--> statement-breakpoint
ALTER TABLE "game_rounds" DROP COLUMN "slug";--> statement-breakpoint
ALTER TABLE "game_sessions" DROP COLUMN "slug";--> statement-breakpoint
ALTER TABLE "locations" DROP COLUMN "slug";