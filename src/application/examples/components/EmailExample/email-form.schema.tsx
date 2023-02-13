import * as Yup from "yup"; 

export const emailValidationSchema = Yup.object().shape({
  from: Yup.string()
    .required("From Email is Required.")
    .email("Email is invalid"),
  to: Yup.array()
    .of(Yup.string().email("Email is invalid"))
    .min(1, "At least one receiver is required."),
  cc: Yup.array().of(Yup.string().email("Email is invalid")),
  bcc: Yup.array().of(Yup.string().email("Email is invalid")),
  subject: Yup.string().required("Subject is Required."),
  body: Yup.string().required("Email Body is Required."),
});
