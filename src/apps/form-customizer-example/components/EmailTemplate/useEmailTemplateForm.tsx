/* eslint-disable */
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSP } from "@common/pnp";
import { IFormCustomizerExampleProps } from "src/extensions/formCustomizerExample/components/FormCustomizerExample";
import {
  EmailTemplateFormType,
  emailTemplateFormSchema,  
} from "./EmailTemplateFormSchema";
import { FormDisplayMode } from "@microsoft/sp-core-library";
import { zodDefault } from "@common/shared/utils";

export function useEmailTemplateForm(props: IFormCustomizerExampleProps) {
 
  const currentItem = React.useMemo(() => {
    const result = emailTemplateFormSchema.safeParse(props.context.item);
    if (result.success) {
      return result.data;
    }
    return zodDefault(emailTemplateFormSchema);
  }, []);

  const formName = React.useMemo(() => {
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
 
  const {
    register,
    handleSubmit,
    setValue,
    watch, 
    formState: { errors, isSubmitting },
  } = useForm<EmailTemplateFormType>({
    resolver: zodResolver(emailTemplateFormSchema),
    defaultValues: currentItem,
  }); 

  const onSubmit: SubmitHandler<EmailTemplateFormType> = async (
    data: EmailTemplateFormType
  ) => {
    console.log("onSubmit", data);

    try {
      const sp = await getSP();
      if (props.displayMode === FormDisplayMode.New) {
        await sp.web.lists.getByTitle("EmailTemplates").items.add(data);
      } else if (props.displayMode === FormDisplayMode.Edit) {
        await sp.web.lists
          .getByTitle("EmailTemplates")
          .items.getById(props.context.itemId)
          .update(data);
      } 
      props.onSave();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    currentItem,
    onSubmit,
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    isSubmitting,
    formName,
  };
}
