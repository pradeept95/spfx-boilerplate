import { z } from "zod";

export const AwardHistorySchema = z.object({
  id: z.number().nullish().default(0),
  role: z.string().default(""),
  action: z.string().default(""),
  comments: z.string().default(""),
  internalNotes: z.string().default(""),
  approver: z.string().default(""),
  approverEmails: z.string().default(""),
  created: z.date(),
});

export type AwardHistory = z.infer<typeof AwardHistorySchema>;
