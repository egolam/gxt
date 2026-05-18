ALTER TABLE "sessions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "verifications" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "sessions" CASCADE;--> statement-breakpoint
DROP TABLE "verifications" CASCADE;--> statement-breakpoint
ALTER TABLE "game_rounds" ADD CONSTRAINT "round_check" CHECK ("game_rounds"."round" >= 1 AND "game_rounds"."round" <= 5);--> statement-breakpoint
ALTER TABLE "game_rounds" ADD CONSTRAINT "distance_check" CHECK ("game_rounds"."distance" >= 0);--> statement-breakpoint
ALTER TABLE "game_rounds" ADD CONSTRAINT "score_check" CHECK ("game_rounds"."score" >= 0 AND "game_rounds"."score" <= 2000);--> statement-breakpoint
ALTER TABLE "game_rounds" ADD CONSTRAINT "guessed_at_check" CHECK ("game_rounds"."guessed_at" >= "game_rounds"."started_at");--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "round_check" CHECK ("game_sessions"."round" >= 1 AND "game_sessions"."round" <= 5);--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "duration_check" CHECK ("game_sessions"."duration" >= 1 AND "game_sessions"."duration" <= 60);--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "score_check" CHECK ("game_sessions"."duration" >= 0 AND "game_sessions"."duration" <= 10000);--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "streak_check" CHECK ("game_sessions"."duration" >= 0);--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "started_at_check" CHECK ("game_sessions"."finished_at" >= "game_sessions"."started_at");