import { durations } from "@/constants/game-modes";
import { z } from "zod";

export const createGameSchema = z.object({
  gameMode: z.enum(["casual", "countdown", "survive"]),
  duration: z
    .number()
    .refine((val) => durations.includes(val as any))
    .nullable(),
});

export type Duration = z.infer<typeof createGameSchema>;
