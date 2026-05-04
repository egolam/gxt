ALTER TABLE "game_rounds" ADD COLUMN "distace" integer DEFAULT 9999 NOT NULL;--> statement-breakpoint
ALTER TABLE "game_rounds" ADD CONSTRAINT "distance" CHECK ("game_rounds"."distace" < 0);