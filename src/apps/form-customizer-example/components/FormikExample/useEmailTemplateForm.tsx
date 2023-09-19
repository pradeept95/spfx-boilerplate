/* eslint-disable */
import * as React from "react"; 
import { getSP } from "@common/pnp";
import { IFormCustomizerExampleProps } from "src/extensions/formCustomizerExample/components/FormCustomizerExample";
import {
  EmailTemplateFormType, 
} from "./EmailTemplateFormSchema";
import { FormDisplayMode } from "@microsoft/sp-core-library"; 
import { FormikHelpers } from "formik";
 
export function useEmailTemplateForm(props: IFormCustomizerExampleProps) {
 
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
      case FormDisplayMode.New:
        return "New Email Template";
      case FormDisplayMode.Edit:
        return "Edit Email Template";
      case FormDisplayMode.Display:
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

        if (props.displayMode === FormDisplayMode.New) {
          await sp.web.lists.getByTitle("EmailTemplates").items.add(apiData);
        } else if (props.displayMode === FormDisplayMode.Edit) {
          await sp.web.lists
            .getByTitle("EmailTemplates")
            .items.getById(props.context.itemId)
            .update(apiData);
        }
        props.onSave();
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
