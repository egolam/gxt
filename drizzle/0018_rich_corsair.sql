DROP INDEX "game_sessions_mode_status_score_idx";--> statement-breakpoint
CREATE INDEX "game_sessions_mode_status_score_idx" ON "game_sessions" USING btree ("status","mode","score" desc);