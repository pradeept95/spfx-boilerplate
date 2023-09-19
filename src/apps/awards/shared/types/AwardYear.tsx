import { z } from "zod";

export const AwardYearSchema = z
  .object({
    ID: z.number().nullish().default(0),
    Title: z.string().default(""),
  })
  .transform((value) => {
    return {
      id: value.ID ?? 0,
      title: value.Title,
    };
  });

export type AwardYear = z.infer<typeof AwardYearSchema>;
