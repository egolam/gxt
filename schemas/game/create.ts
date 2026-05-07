import { z } from "zod";

const durations = [1, 2, 5, 10, 15, 20, 30, 45, 60] as const;
export const createGameSchema = z.object({
  mode: z.enum(["casual", "countdown", "survive"]),
  duration: z.number().refine((val) => durations.includes(val as any)),
});
