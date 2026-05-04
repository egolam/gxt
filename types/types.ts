import { DURATIONS_ARRAY } from "@/constants/game-settings";
import {
  gameModeEnum,
  gamePhaseEnum,
  gameStatusEnum,
} from "@/db/schemas/game-schema";
import { locationDifficulty } from "@/db/schemas/location-schema";

export type Duration = (typeof DURATIONS_ARRAY)[number];
export type Mode = (typeof gameModeEnum.enumValues)[number];
export type Status = (typeof gameStatusEnum.enumValues)[number];
export type Phase = (typeof gamePhaseEnum.enumValues)[number];
export type Difficulty = (typeof locationDifficulty.enumValues)[number];
export type ActionResponse<T = any> =
  | { success: true; data: T }
  | { success: false; error: string };
