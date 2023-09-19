/* eslint-disable */
import * as React from "react"; 
import { getSP } from "@common/pnp"; 
import {
  EmailTemplateFormType, 
} from "./EmailTemplateFormSchema"; 
import { FormikHelpers } from "formik";
import { IEmailTemplateFormProps } from "./EmailTemplateForm";
 
export function useEmailTemplateForm(props: IEmailTemplateFormProps) {
  const defaultValues = React.useMemo(() => {
    return {
      Title: "",
      Subject: "",
      TemplateKey: "",
      Body: "",
      Users: [],
    } as EmailTemplateFormType;
  }, []);

  const pageTitle = React.useMemo(() => {
    switch (props.displayMode) {
      case "new":
        return "New Email Template";
      case "edit":
        return "Edit Email Template";
      case "display":
      default:
        return "Email Template";
    }
  }, [props.displayMode]);

  const handleSubmit = React.useCallback(
    async (
      data: EmailTemplateFormType,
      actions: FormikHelpers<EmailTemplateFormType>
    ) => {
      try {
        actions.setSubmitting(true);
        console.log("onSubmit", data, actions);

        const sp = await getSP();

        const apiData = {
          Title: data.Title,
          Subject: data.Subject,
          TemplateKey: data.TemplateKey,
          Body: data.Body,
          UsersId: data.Users.map((u) => u.id),
        };

        if (props.displayMode === "new") {
          await sp.web.lists.getByTitle("EmailTemplates").items.add(apiData);
        } else if (props.displayMode === "edit") {
          await sp.web.lists
            .getByTitle("EmailTemplates")
            .items.getById(props.itemId)
            .update(apiData);
        }
         
        props.onClose();
      } catch (error) {
        console.error(error);
      } finally {
        actions.setSubmitting(false);
      }
    },
    []
  );

  return {
    defaultValues,
    handleSubmit,
    pageTitle,
  } as const;
}
