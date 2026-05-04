ALTER TABLE "game_rounds" RENAME COLUMN "distace" TO "distance";--> statement-breakpoint
ALTER TABLE "game_rounds" DROP CONSTRAINT "distance";--> statement-breakpoint
ALTER TABLE "game_rounds" ADD CONSTRAINT "distance" CHECK ("game_rounds"."distance" >= 0);