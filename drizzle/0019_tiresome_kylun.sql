DROP INDEX "game_sessions_user_started_idx";--> statement-breakpoint
DROP INDEX "game_sessions_mode_status_score_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "one_active_game_per_user_idx" ON "game_sessions" USING btree ("user_id") WHERE "game_sessions"."status" = 'playing';