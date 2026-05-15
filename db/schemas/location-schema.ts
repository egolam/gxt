import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const locationDifficulty = pgEnum("location_difficulty_enum", [
  "easy",
  "medium",
  "hard",
  "goodluck",
]);

export const cameraMode = pgEnum("camera_mode_enum", [
  "firstperson",
  "selfie",
  "decoupled",
]);

export const locations = pgTable(
  "locations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    url: text("url").notNull().unique(),
    x: integer("x").notNull(),
    y: integer("y").notNull(),
    zoom: integer("zoom").notNull(),
    pov: integer("pov").notNull(),
    cameraMode: cameraMode("camere_mode").notNull().default("firstperson"),
    reported: integer("reported").notNull().default(0),
    author: text("author").notNull().default("admin"),
    difficulty: locationDifficulty("difficulty").notNull().default("medium"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("idx_difficulty").on(table.difficulty)],
);
