import { integer, pgTable, serial } from "drizzle-orm/pg-core";

export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  locationCount: integer("location_count").notNull().default(0),
  userCount: integer("user_count").notNull().default(0),
  totalGamesPlayed: integer("total_games_played").notNull().default(0),
});
