import {
  boolean,
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
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
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    mode: gameModeEnum("mode").notNull().default("casual"),
    status: gameStatusEnum("status").notNull().default("created"),
    phase: gamePhaseEnum("phase").notNull().default("pending"),
    round: integer("round").notNull().default(1),
    duration: integer("duration").notNull().default(30),
    score: integer("score").notNull().default(0),
    streak: integer("streak").notNull().default(0),
    startedAt: timestamp("started_at").notNull(),
    finishedAt: timestamp("finished_at"),
  },
  (table) => [
    check("max_round_range", sql`${table.round} >= 1 AND ${table.round} <= 5`),
    check(
      "duration_range",
      sql`${table.duration} >= 1 AND ${table.duration} <= 60`,
    ),
    check("score_range", sql`${table.score} >= 0 AND ${table.score} <= 10000`),
    check("time_sanity", sql`${table.finishedAt} > ${table.startedAt}`),
    index("user_games_idx").on(table.userId, desc(table.finishedAt)),
    index("casual_leaderboard_idx")
      .on(desc(table.score))
      .where(sql`${table.mode} = 'casual' AND ${table.status} = 'finished'`),
    index("countdown_leaderboard_idx")
      .on(desc(table.score), table.duration)
      .where(sql`${table.mode} = 'countdown' AND ${table.status} = 'finished'`),
    index("survive_leaderboard_idx")
      .on(desc(table.streak))
      .where(sql`${table.mode} = 'survive' AND ${table.status} = 'finished'`),
    index("finished_at_idx").on(desc(table.finishedAt)),

    index("status_finished_idx").on(table.status, desc(table.finishedAt)),

    index("mode_finished_idx").on(table.mode, desc(table.finishedAt)),
  ],
);

export const gameRounds = pgTable(
  "game_rounds",
  {
    id: text("id").primaryKey(),
    gameId: text("game_id")
      .notNull()
      .references(() => gameSessions.id, { onDelete: "cascade" }),
    locationId: text("location_id")
      .notNull()
      .references(() => locations.id),
    round: integer("round").notNull().default(1),
    guessX: integer("guess_x"),
    guessY: integer("guess_y"),
    distance: integer("distance"),
    score: integer("score").notNull().default(0),
    isFinished: boolean("is_finished").notNull().default(false),
    startedAt: timestamp("started_at").notNull(),
    mustFinishedBefore: timestamp("must_finished_before"),
    guessedAt: timestamp("guessed_at"),
  },
  (table) => [
    index("game_id_idx").on(table.gameId),
    check("round_range", sql`${table.round} >= 1 AND ${table.round} <= 5`),
    check("time_sanity", sql`${table.guessedAt} > ${table.startedAt}`),
    check("distance", sql`${table.distance} >= 0`),
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
