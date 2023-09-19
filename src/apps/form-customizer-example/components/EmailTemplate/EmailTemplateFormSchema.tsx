import { z } from "zod";

export const emailTemplateFormSchema = z.object({
  Title: z.string().nonempty("Title is required").default(""),
  Subject: z.string().nonempty("Subject is Required").default(""),
  TemplateKey: z.string().nonempty("Template Key is Required.").default(""),
  Body: z.string().nonempty("Body is Required").default(""),

  Users: z.array(z.any()).default([]),
});

export type EmailTemplateFormType = z.infer<typeof emailTemplateFormSchema>;
