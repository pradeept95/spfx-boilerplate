import { z } from "zod";

export const NomineeSchema = z.object({
  id: z.number().nullish().default(0),
  key: z.string().nullish().default(""),

  nomineeId: z.number().nullable(),
  title: z.string().default(""),
  name: z.string().default(""),
  firstName: z.string().default(""),
  lastName: z.string().default(""),
  email: z.string().default(""),
  userName: z.string().default(""),

  division: z.string().default(""),
  divisionId: z.number().nullish().default(0),

  office: z.string().default(""),

  supervisor: z.string().default(""),
  supervisorEmail: z.string().default(""),
  supervisorId: z.number().nullable(),

  NEDId: z.string().default(""),
  SACCode: z.string().default(""),
  ORGCode: z.string().default(""),
  employeeType: z.string().default(""),

  user: z.array(z.object({
    id: z.number().nullable(),
    title: z.string().default(""),
    name: z.string().default(""),
    firstName: z.string().default(""),
    lastName: z.string().default(""),
    email: z.string().default(""),
    userName: z.string().default(""),
  })).nullable(),
});

export type Nominee = z.infer<typeof NomineeSchema>;
