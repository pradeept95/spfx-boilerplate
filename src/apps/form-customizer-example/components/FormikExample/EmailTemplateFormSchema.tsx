/* eslint-disable */
import { getSP } from "@common/pnp";
import * as yup from "yup";

export const emailTemplateFormSchema = yup.object({
  Title: yup.string().required("Title is required").default(""),
  Subject: yup.string().required("Subject is Required").default(""),
  TemplateKey: yup.string().required("Template Key is Required.").default(""),
  Body: yup.string().required("Body is Required").default(""),

  Users: yup.array(yup.object()).min(1, "Please Select User.").default([]),
});

export const emailTemplateTransformToForm = emailTemplateFormSchema.transform(
  async (data) => {
    const userIds = data.UsersId || [];

    const sp = await getSP();

    const users = await sp.web.siteUsers.filter(
      `Id in (${userIds.join(",")})`
    )();

    console.log("users", users);

    return {
      ...data,
      Users: users,
    };
  }
);

export const emailTemplateTransformToApi = emailTemplateFormSchema.transform(
  (value, originalValue) => {
    return {
      ...value,
      UsersId: value.Users?.map((u) => u.Id),
    };
  }
);

export const emailTemplateFormSchemaDefault = emailTemplateFormSchema.default({
  Title: "",
  Subject: "",
  TemplateKey: "",
  Body: "",
  Users: [],
});

export type EmailTemplateFormType = yup.InferType<
  typeof emailTemplateFormSchema
>;
