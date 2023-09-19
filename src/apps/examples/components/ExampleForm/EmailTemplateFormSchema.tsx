/* eslint-disable */ 
import * as yup from "yup";

export const emailTemplateFormSchema = yup.object({
  Title: yup
    .string()
    .required("Title is required")
    .min(3, "Should be minimum 3 characters")
    .max(10, "Maximum 10 characters is allowed")
    .default(""),
  Subject: yup.string().required("Subject is Required").default(""),
  TemplateKey: yup
    .string()
    .required("Template Key is Required.")
    .when("Title", (Title, schema) => {
      if (Title) {
        return schema.max(
          Title.length,
          "Template Key should be less than Title length"
        );
      }
    })
    .default(""),
  Body: yup.string().required("Body is Required").default(""),

  Users: yup.array(yup.object()).min(1, "Please Select User.").default([]),
}); 

export const emailTemplateFormSchemaDefault = emailTemplateFormSchema.default({
  Title: "",
  Subject: "",
  TemplateKey: "",
  Body: "",
  Users: [],
  Date: new Date(),
});

export type EmailTemplateFormType = yup.InferType<
  typeof emailTemplateFormSchema
>;
