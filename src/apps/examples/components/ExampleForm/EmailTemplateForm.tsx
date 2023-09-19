/* eslint-disable */

import { Form, Formik, FormikProps } from "formik";
import * as React from "react";
import {
  EmailTemplateFormType,
  emailTemplateFormSchema,
} from "./EmailTemplateFormSchema";
import { useEmailTemplateForm } from "./useEmailTemplateForm";
import { useEmailTemplateFormStyles } from "./useEmailTemplateFormStyles";
import {
  CheckboxGroup,
  DatePicker,
  Dropdown,
  FocusConnectedError,
  Input,
  RadioGroup,
  RichInput,
} from "@prt-ts/fluent-formik"; 
import { PeopleInput } from "@common/components/Forms/PeopleInputField";
import { Button } from "@fluentui/react-components";
import { getSP } from "@common/pnp";
import { UserInfo } from "@common/components/PeoplePicker/PeoplePickerTypes";
import useChoiceField from "@common/hooks/useChoiceField";
import useChoiceList from "@common/hooks/useChoiceList";

export interface IEmailTemplateFormProps {
  itemId?: number;
  displayMode: "new" | "edit" | "display";
  onClose: () => void;
}

export const EmailTemplateForm = (props) => {
  const { defaultValues, handleSubmit, pageTitle } =
    useEmailTemplateForm(props);

  const classes = useEmailTemplateFormStyles();

  console.log("currentItem", defaultValues);

  const options = useChoiceField("EmailTemplates", "EmailType");
  const options2 = useChoiceList("EmailTemplates", {
    valueField: "Id",
    labelField: "TemplateKey",
    // filterContext: "IsActive eq 1",
  });

  return (
    <div className={classes.root}>
      <h1>{pageTitle}</h1>

      <Formik<EmailTemplateFormType>
        initialValues={defaultValues}
        validationSchema={emailTemplateFormSchema}
        onSubmit={handleSubmit}
        onReset={() => {}}
      >
        {(fProps: FormikProps<EmailTemplateFormType>) => {
          const { isSubmitting, values, errors } = fProps;

          React.useEffect(() => {
            if (props.displayMode !== "new") {
              const getById = async () => {
                const sp = await getSP();
                const item = await sp.web.lists
                  .getByTitle("EmailTemplates")
                  .items.getById(props.context.item.ID)
                  .expand("Users")
                  .select(
                    "Id, Title, Subject, TemplateKey, Body, Users/Id, Users/Title, Users/EMail, Users/UserName"
                  )();
                console.log("item", item);

                const editItem = {
                  Title: item.Title,
                  Subject: item.Subject,
                  TemplateKey: item.TemplateKey,
                  Body: item.Body,
                  Users: (item.Users || [])?.map((u) => {
                    return {
                      id: u.Id,
                      title: u.Title,
                      email: u.EMail,
                      username: u.UserName,
                    } as UserInfo;
                  }),
                };

                fProps.setValues(editItem);
              };

              getById();
            }
          }, [props.context?.item?.ID]);

          return (
            <>
              <Form>
                <FocusConnectedError />
                <div className={classes.formContainer}>
                  <Input
                    name="Title"
                    label="Title"
                    required={true}
                    placeholder="Enter a title"
                    orientation="horizontal"
                  />
                  <Input
                    name="Subject"
                    label="Subject"
                    required={true}
                    placeholder="Enter a Subject"
                  />
                  <Input
                    name="TemplateKey"
                    label="TemplateKey"
                    required={true}
                    placeholder="Enter a template key"
                  />
                  <Dropdown
                    name="TemplateKey1"
                    label="TemplateKey1"
                    required={true}
                    placeholder="Enter a template key"
                    options={options}
                    multiselect={true}
                  />

                  <RadioGroup
                    name="TemplateKey4"
                    label="TemplateKey4"
                    required={true}
                    placeholder="Enter a template key"
                    options={options as any}
                  />

                  <CheckboxGroup
                    name="TemplateKey5"
                    label="TemplateKey5"
                    required={true}
                    placeholder="Enter a template key"
                    options={options2 as any}
                  />

                  <Dropdown
                    name="TemplateKey2"
                    label="TemplateKey2"
                    required={true}
                    placeholder="Enter a template key"
                    options={options2}
                  />
                  <DatePicker
                    name="Date"
                    label="Date"
                    required={true}
                    placeholder="Enter a date"
                    info={<HelpContent />}
                    minDate={new Date()}
                    showCloseButton={true}
                  />
                  <RichInput
                    name="Body"
                    label="Body"
                    required={true}
                    placeholder="Enter a body"
                    info={<HelpContent />}
                    hint={"This is a hint"}
                  />
                  <PeopleInput
                    name="Users"
                    label="Users to send to"
                    personSelectionLimit={10}
                    required={true}
                    // showSecondaryText={true}
                    peoplePickerType="List"
                    pickerType="user-and-group"
                    placeholder="Enter name to search"
                    info={<HelpContent />}
                    orientation="horizontal"
                  />

                  <DatePicker
                    name="Date"
                    label="Date"
                    required={true}
                    placeholder="Enter a date"
                    info={<HelpContent />}
                  />

                  <div className={classes.actionContainer}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      appearance="primary"
                    >
                      Save Template
                    </Button>
                    <Button
                      type="button"
                      disabled={isSubmitting}
                      appearance="secondary"
                      onClick={() => props.onClose()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      disabled={isSubmitting}
                      appearance="secondary"
                      onClick={() => props.onClose()}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Form>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export const HelpContent: React.FC = () => {
  return (
    <div style={{ maxWidth: "300px" }}>
      <h1>Hello People</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, magni
        dolorum aut cupiditate pariatur deserunt sunt? Inventore magni nulla
        pariatur incidunt nesciunt tempora eius maxime reiciendis doloremque
        dolore, animi omnis?
      </p>
    </div>
  );
};
