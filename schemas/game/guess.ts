import { z } from "zod";

export const guessSchema = z.object({
  guessXY: z.tuple([z.number(), z.number()]).nullable(),
});

export type Guess = z.infer<typeof guessSchema>;
