ALTER TABLE "game_rounds" RENAME COLUMN "url" TO "slug";--> statement-breakpoint
ALTER TABLE "game_sessions" RENAME COLUMN "url" TO "slug";--> statement-breakpoint
ALTER TABLE "locations" RENAME COLUMN "url" TO "slug";--> statement-breakpoint
ALTER TABLE "game_rounds" DROP CONSTRAINT "game_rounds_url_unique";--> statement-breakpoint
ALTER TABLE "game_sessions" DROP CONSTRAINT "game_sessions_url_unique";--> statement-breakpoint
ALTER TABLE "locations" DROP CONSTRAINT "locations_url_unique";--> statement-breakpoint
ALTER TABLE "game_rounds" ADD CONSTRAINT "game_rounds_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "game_sessions_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_slug_unique" UNIQUE("slug");