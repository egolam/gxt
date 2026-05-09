ALTER TABLE "game_rounds" DROP CONSTRAINT "time_sanity";--> statement-breakpoint
ALTER TABLE "game_sessions" DROP CONSTRAINT "time_sanity";--> statement-breakpoint
DROP INDEX "difficulty_idx";--> statement-breakpoint
ALTER TABLE "game_rounds" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "game_rounds" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "game_rounds_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "game_rounds" ALTER COLUMN "game_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "game_sessions" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "game_sessions" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "game_sessions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "locations" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "locations" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "locations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "game_rounds" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "game_sessions" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "locations" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_difficulty" ON "locations" USING btree ("difficulty");--> statement-breakpoint
ALTER TABLE "game_rounds" ADD CONSTRAINT "game_rounds_url_unique" UNIQUE("url");--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "game_sessions_url_unique" UNIQUE("url");--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_url_unique" UNIQUE("url");--> statement-breakpoint
ALTER TABLE "game_rounds" ADD CONSTRAINT "time_sanity" CHECK ("game_rounds"."guessed_at" >= "game_rounds"."started_at");--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "time_sanity" CHECK ("game_sessions"."finished_at" >= "game_sessions"."started_at");