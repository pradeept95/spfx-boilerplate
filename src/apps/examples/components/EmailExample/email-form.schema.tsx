import * as Yup from "yup";

export const emailValidationSchema = Yup.object().shape({
  from: Yup.string()
    .required("From Email is Required.")
    .email("Email is invalid"),
  to: Yup.array()
    .of(
      Yup.object({
        id: Yup.number(),
        title: Yup.string(),
        email: Yup.string().email("Email is invalid"),
        username: Yup.string(),
      })
    )
    .min(1, "At least one receiver is required."),
  cc: Yup.array().of(
    Yup.object({
      id: Yup.number(),
      title: Yup.string(),
      email: Yup.string().email("Email is invalid"),
      username: Yup.string(),
    })
  ),
  bcc: Yup.array().of(
    Yup.object({
      id: Yup.number(),
      title: Yup.string(),
      email: Yup.string().email("Email is invalid"),
      username: Yup.string(),
    })
  ),
  subject: Yup.string().required("Subject is Required."),
  body: Yup.string().required("Email Body is Required."),
});

export type EmailFormTypes = Yup.InferType<typeof emailValidationSchema>;

export const emailInitialValues = {
  from: "pradeep.thapaliya@nih.gov",
  to: [],
  cc: [],
  bcc: [],
  subject: "",
  body: "",
};
