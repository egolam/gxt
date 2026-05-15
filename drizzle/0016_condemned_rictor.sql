ALTER TABLE "game_rounds" DROP CONSTRAINT "round_range";--> statement-breakpoint
ALTER TABLE "game_rounds" DROP CONSTRAINT "time_sanity";--> statement-breakpoint
ALTER TABLE "game_rounds" DROP CONSTRAINT "distance";--> statement-breakpoint
ALTER TABLE "game_sessions" DROP CONSTRAINT "max_round_range";--> statement-breakpoint
ALTER TABLE "game_sessions" DROP CONSTRAINT "duration_range";--> statement-breakpoint
ALTER TABLE "game_sessions" DROP CONSTRAINT "score_range";--> statement-breakpoint
ALTER TABLE "game_sessions" DROP CONSTRAINT "time_sanity";--> statement-breakpoint
DROP INDEX "game_id_idx";--> statement-breakpoint
DROP INDEX "user_games_idx";--> statement-breakpoint
DROP INDEX "casual_leaderboard_idx";--> statement-breakpoint
DROP INDEX "countdown_leaderboard_idx";--> statement-breakpoint
DROP INDEX "survive_leaderboard_idx";--> statement-breakpoint
DROP INDEX "finished_at_idx";--> statement-breakpoint
DROP INDEX "status_finished_idx";--> statement-breakpoint
DROP INDEX "mode_finished_idx";--> statement-breakpoint
CREATE INDEX "game_rounds_game_round_idx" ON "game_rounds" USING btree ("game_id","round");--> statement-breakpoint
CREATE INDEX "game_rounds_game_finished_idx" ON "game_rounds" USING btree ("game_id","is_finished");--> statement-breakpoint
CREATE INDEX "game_rounds_location_idx" ON "game_rounds" USING btree ("location_id");--> statement-breakpoint
CREATE INDEX "game_sessions_user_started_idx" ON "game_sessions" USING btree ("user_id","started_at" desc);--> statement-breakpoint
CREATE INDEX "game_sessions_mode_status_score_idx" ON "game_sessions" USING btree ("mode","status","score" desc);--> statement-breakpoint
CREATE INDEX "game_sessions_user_status_idx" ON "game_sessions" USING btree ("user_id","status");