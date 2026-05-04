CREATE TYPE "public"."game_mode_enum" AS ENUM('casual', 'countdown', 'survive');--> statement-breakpoint
CREATE TYPE "public"."game_phase_enum" AS ENUM('pending', 'countdown', 'guessing', 'round_end', 'game_end');--> statement-breakpoint
CREATE TYPE "public"."game_status_enum" AS ENUM('created', 'playing', 'finished', 'abandoned');--> statement-breakpoint
CREATE TYPE "public"."location_difficulty_enum" AS ENUM('easy', 'medium', 'hard', 'goodluck');--> statement-breakpoint
CREATE TABLE "game_rounds" (
	"id" text PRIMARY KEY NOT NULL,
	"game_id" text NOT NULL,
	"location_id" text NOT NULL,
	"round" integer DEFAULT 1 NOT NULL,
	"guess_x" integer,
	"guess_y" integer,
	"score" integer DEFAULT 0 NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"guessed_at" timestamp,
	CONSTRAINT "round_range" CHECK ("game_rounds"."round" >= 1 AND "game_rounds"."round" <= 5),
	CONSTRAINT "time_sanity" CHECK ("game_rounds"."guessed_at" > "game_rounds"."started_at")
);
--> statement-breakpoint
CREATE TABLE "game_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"mode" "game_mode_enum" DEFAULT 'casual' NOT NULL,
	"status" "game_status_enum" DEFAULT 'created' NOT NULL,
	"phase" "game_phase_enum" DEFAULT 'pending' NOT NULL,
	"round" integer DEFAULT 1 NOT NULL,
	"duration" integer DEFAULT 30 NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"streak" integer DEFAULT 0 NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"finished_at" timestamp,
	CONSTRAINT "max_round_range" CHECK ("game_sessions"."round" >= 1 AND "game_sessions"."round" <= 5),
	CONSTRAINT "duration_range" CHECK ("game_sessions"."duration" >= 1 AND "game_sessions"."duration" <= 60),
	CONSTRAINT "score_range" CHECK ("game_sessions"."score" >= 0 AND "game_sessions"."score" <= 10000)
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" text PRIMARY KEY NOT NULL,
	"x" integer NOT NULL,
	"y" integer NOT NULL,
	"zoom" integer NOT NULL,
	"pov" integer NOT NULL,
	"reported" integer DEFAULT 0 NOT NULL,
	"author" text DEFAULT 'admin' NOT NULL,
	"difficulty" "location_difficulty_enum" DEFAULT 'medium' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "game_rounds" ADD CONSTRAINT "game_rounds_game_id_game_sessions_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."game_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_rounds" ADD CONSTRAINT "game_rounds_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "game_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "game_id_idx" ON "game_rounds" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "user_games_idx" ON "game_sessions" USING btree ("user_id","finished_at" desc);--> statement-breakpoint
CREATE INDEX "casual_leaderboard_idx" ON "game_sessions" USING btree ("score" desc) WHERE "game_sessions"."mode" = 'casual' AND "game_sessions"."status" = 'finished';--> statement-breakpoint
CREATE INDEX "countdown_leaderboard_idx" ON "game_sessions" USING btree ("score" desc,"duration") WHERE "game_sessions"."mode" = 'countdown' AND "game_sessions"."status" = 'finished';--> statement-breakpoint
CREATE INDEX "survive_leaderboard_idx" ON "game_sessions" USING btree ("streak" desc) WHERE "game_sessions"."mode" = 'survive' AND "game_sessions"."status" = 'finished';--> statement-breakpoint
CREATE INDEX "finished_at_idx" ON "game_sessions" USING btree ("finished_at" desc);--> statement-breakpoint
CREATE INDEX "status_finished_idx" ON "game_sessions" USING btree ("status","finished_at" desc);--> statement-breakpoint
CREATE INDEX "mode_finished_idx" ON "game_sessions" USING btree ("mode","finished_at" desc);--> statement-breakpoint
CREATE INDEX "difficulty_idx" ON "locations" USING btree ("difficulty");