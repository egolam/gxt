import {
  boolean,
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./auth-schema";
import { desc, relations, sql } from "drizzle-orm";
import { locations } from "./location-schema";

export const gameModeEnum = pgEnum("game_mode_enum", [
  "casual",
  "countdown",
  "survive",
]);

export const gameStatusEnum = pgEnum("game_status_enum", [
  "created",
  "playing",
  "finished",
  "abandoned",
]);

export const gamePhaseEnum = pgEnum("game_phase_enum", [
  "pending",
  "countdown",
  "guessing",
  "round_end",
  "game_end",
]);

export const gameSessions = pgTable(
  "game_sessions",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    mode: gameModeEnum("mode").notNull().default("casual"),
    status: gameStatusEnum("status").notNull().default("created"),
    phase: gamePhaseEnum("phase").notNull().default("pending"),
    round: integer("round").notNull().default(1),
    duration: integer("duration"),
    score: integer("score").notNull().default(0),
    streak: integer("streak").notNull().default(0),
    startedAt: timestamp("started_at").notNull(),
    finishedAt: timestamp("finished_at"),
  },
  (table) => [
    uniqueIndex("one_active_game_per_user_idx")
      .on(table.userId)
      .where(sql`${table.status} = 'playing'`),
    check("round_check", sql`${table.round} >= 1 AND ${table.round} <= 5`),
    check(
      "duration_check",
      sql`${table.duration} >= 1 AND ${table.duration} <= 60`,
    ),
    check(
      "score_check",
      sql`${table.duration} >= 0 AND ${table.duration} <= 10000`,
    ),
    check("streak_check", sql`${table.duration} >= 0`),
    check("started_at_check", sql`${table.finishedAt} >= ${table.startedAt}`),
  ],
);

export const gameRounds = pgTable(
  "game_rounds",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    gameId: integer("game_id")
      .notNull()
      .references(() => gameSessions.id, { onDelete: "cascade" }),
    locationId: integer("location_id")
      .notNull()
      .references(() => locations.id),
    round: integer("round").notNull().default(1),
    guessX: integer("guess_x"),
    guessY: integer("guess_y"),
    distance: integer("distance"),
    score: integer("score").notNull().default(0),
    isFinished: boolean("is_finished").notNull().default(false),
    startedAt: timestamp("started_at").notNull(),
    mustFinishBefore: timestamp("must_finish_before"),
    guessedAt: timestamp("guessed_at"),
  },
  (table) => [
    index("game_rounds_game_round_idx").on(table.gameId, table.locationId),
    check("round_check", sql`${table.round} >= 1 AND ${table.round} <= 5`),
    check("distance_check", sql`${table.distance} >= 0`),
    check("score_check", sql`${table.score} >= 0 AND ${table.score} <= 2000`),
    check("guessed_at_check", sql`${table.guessedAt} >= ${table.startedAt}`),
  ],
);

export const gameSessionsRelations = relations(
  gameSessions,
  ({ one, many }) => ({
    users: one(users, {
      fields: [gameSessions.userId],
      references: [users.id],
    }),
    gameRounds: many(gameRounds),
  }),
);

export const gameRoundsGameSessionsRelations = relations(
  gameRounds,
  ({ one }) => ({
    gameSessions: one(gameSessions, {
      fields: [gameRounds.gameId],
      references: [gameSessions.id],
    }),
    locations: one(locations, {
      fields: [gameRounds.locationId],
      references: [locations.id],
    }),
  }),
);

export const locationsGameRoundsSchema = relations(locations, ({ many }) => ({
  gameRounds: many(gameRounds),
}));
