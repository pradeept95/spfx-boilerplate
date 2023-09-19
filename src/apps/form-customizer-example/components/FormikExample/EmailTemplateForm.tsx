/* eslint-disable */

import { Form, Formik, FormikProps } from "formik";
import * as React from "react";
import { IFormCustomizerExampleProps } from "src/extensions/formCustomizerExample/components/FormCustomizerExample";
import {
  EmailTemplateFormType,
  emailTemplateFormSchema,
} from "./EmailTemplateFormSchema";
import { useEmailTemplateForm } from "./useEmailTemplateForm";
import { useEmailTemplateFormStyles } from "./useEmailTemplateFormStyles";
import { FocusConnectedError, Input, RichInput } from "@prt-ts/fluent-formik"; 
import { PeopleInput } from "@common/components/Forms/PeopleInputField";
import { Button } from "@fluentui/react-components";
import { FormDisplayMode } from "@microsoft/sp-core-library";
import { getSP } from "@common/pnp";
import { UserInfo } from "@common/components/PeoplePicker/PeoplePickerTypes";
import { PersonRegular } from "@fluentui/react-icons";

export const EmailTemplateForm = (props: IFormCustomizerExampleProps) => {
  const { defaultValues, handleSubmit, pageTitle } =
    useEmailTemplateForm(props);

  const classes = useEmailTemplateFormStyles();

  console.log("currentItem", defaultValues);

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
          const { isSubmitting } = fProps;

          React.useEffect(() => {
            if (props.displayMode !== FormDisplayMode.New) {
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
                  <div className={classes.row}>
                    <div className={classes.column}>
                      <Input
                        name="Title"
                        label="Title"
                        required={true}
                        contentBefore={<PersonRegular />}
                      />
                    </div>
                    <div className={classes.column}>
                      <Input name="Subject" label="Subject" required={true} />
                    </div>
                  </div>
                  <Input
                    name="TemplateKey"
                    label="TemplateKey"
                    required={true}
                  />
                  <RichInput name="Body" label="Body" required={true} />
                  <PeopleInput
                    name="Users"
                    label="Users"
                    personSelectionLimit={10}
                    required={true}
                    peoplePickerType="List"
                    pickerType="user-and-group"
                    info={
                      <div style={{ maxWidth: "200px" }}>
                        <h1>Hello People</h1>
                        <p>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Saepe, magni dolorum aut cupiditate pariatur
                          deserunt sunt? Inventore magni nulla pariatur incidunt
                          nesciunt tempora eius maxime reiciendis doloremque
                          dolore, animi omnis?
                        </p>
                      </div>
                    }
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

              {/* <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre> */}
            </>
          );
        }}
      </Formik>
    </div>
  );
};
