DROP INDEX "game_rounds_game_finished_idx";--> statement-breakpoint
DROP INDEX "game_rounds_location_idx";--> statement-breakpoint
DROP INDEX "game_rounds_game_round_idx";--> statement-breakpoint
CREATE INDEX "game_rounds_game_round_idx" ON "game_rounds" USING btree ("game_id","location_id");