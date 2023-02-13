import * as Yup from "yup";

export const taskValidationSchema = Yup.object().shape({
  actionURL: Yup.string().required("Action URL is Required."),
  assignedTo: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      text: Yup.string(),
      secondaryText: Yup.string(),
      ternaryText: Yup.string(),
    })
  ).min(1, "Please Select User to Assign this Task."),
  applicationId: Yup.string(),
  application: Yup.string(),
  taskAction: Yup.string().required("Sort Description is Required."),
  taskDetails: Yup.string().required("Task Detail is Required."),
});


export type TaskType = Yup.InferType<typeof taskValidationSchema>;
