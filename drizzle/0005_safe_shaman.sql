CREATE TABLE "stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"location_count" integer DEFAULT 0 NOT NULL,
	"user_count" integer DEFAULT 0 NOT NULL,
	"total_games_played" integer DEFAULT 0 NOT NULL
);
