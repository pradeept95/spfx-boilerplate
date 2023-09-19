import { z } from "zod";

export const AwardCategorySchema = z
  .object({
    ID: z.number().positive(),
    Title: z.string().default(""),
    CategoryHeader: z.string().nullish().default(""),
    CategoryDetails: z.string().nullish().default(""),
    DefaultJustification: z.string().nullish().default(""),
  })
  .transform((value) => { 
    return {
      id: value.ID ?? 0,
      title: value.Title,
      categoryHeader: value.CategoryHeader,
      categoryDetails: value.CategoryDetails,
      defaultJustification: value.DefaultJustification,
    };
  });

export type AwardCategory = z.infer<typeof AwardCategorySchema>;
