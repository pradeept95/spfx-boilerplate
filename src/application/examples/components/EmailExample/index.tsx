/* eslint-disable */
import {
  DefaultButton,
  IPersonaProps,
  IStackTokens,
  mergeStyleSets,
  PrimaryButton,
  Stack,
  TextField,
  Toggle,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { useFormik } from "formik";
import * as React from "react"; 
import { renderFieldErrorMessage } from "../../../../common/components/FormElement";
import { PeoplePicker } from "../../../../common/components/PeoplePicker";
import { RichTextEditor } from "../../../../common/components/RichTextEditor";
import { IEmailProps } from "../../../../common/shared/Builder/EmailBuilder";
import { useEmailService } from "../../../shared/services/EmailService";
import { emailValidationSchema } from "./email-form.schema";

const classNames = mergeStyleSets({
  inputItem20: {
    width: "20%",
  },
  inputItem25: {
    width: "25%",
  },
  inputItem50: {
    width: "50%",
  },
  inputItem75: {
    width: "75%",
  },
  inputItem100: {
    width: "100%",
  },
});

const gapStackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 5,
};

export const EmailExampleForm: React.FunctionComponent<{}> = (props) => { 
  const [showFormikData, { toggle: toggleFormikData }] = useBoolean(false);

  const { sendTestEmail } = useEmailService();

  const formik = useFormik<IEmailProps>({
    initialValues: {
      from: "",
      to: [],
      cc: [],
      bcc: [],
      subject: "",
      body: "",
    },
    validationSchema: emailValidationSchema,
    //validateOnChange : true,
    onSubmit: async (data) => {
      console.log(JSON.stringify(data, null, 2));
      await sendTestEmail(data);
    },
    onReset: () => { 
    },
  });

  const fieldHasError = (filedName: string): boolean => {
    return (
      (formik?.touched as any)?.[filedName] &&
      (formik.errors as any)?.[filedName]
    );
  };

  return (
    <div style={{ paddingLeft: 15, paddingRight: 15 }}>
      <h1>Email Sender Example</h1> <hr />
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <Stack horizontal tokens={gapStackTokens}>
            <Stack.Item className={classNames.inputItem75}>
              <PeoplePicker
                peoplePickerType="Compact"
                label="From:"
                required={fieldHasError("from")}
                onPeopleSelectChange={(peoples) => {
                  const emails = peoples.map(
                    (x: IPersonaProps) => x?.secondaryText
                  )?.[0];
                  formik.setFieldValue("from", emails, true);
                }}
                onBlur={() => {
                  formik.setFieldTouched("from", true);
                }}
                showSecondaryText={false}
                personSelectionLimit={1}
                errorMessage={
                  fieldHasError("from") ? formik.errors["from"] : ""
                }
                description="Select user to set From Email Address."
              />
            </Stack.Item>
          </Stack>
          <Stack horizontal tokens={gapStackTokens}>
            <Stack.Item className={classNames.inputItem75}>
              <PeoplePicker
                peoplePickerType="Compact"
                label="To:"
                placeholder="Type name or email to search..."
                required={fieldHasError("to")}
                onPeopleSelectChange={(peoples) => {
                  const emails = peoples.map((x) => x?.secondaryText);
                  formik.setFieldValue("to", emails, true);
                }}
                onBlur={() => {
                  formik.setFieldTouched("to", true);
                }}
                showSecondaryText={false}
                personSelectionLimit={30}
                errorMessage={
                  fieldHasError("to") ? (formik.errors["to"] as string) : ""
                }
                description="Select user to set To Email Addresses."
              />
            </Stack.Item>
          </Stack>
          <Stack horizontal tokens={gapStackTokens}>
            <Stack.Item className={classNames.inputItem75}>
              <PeoplePicker
                peoplePickerType="Compact"
                label="CC:"
                placeholder="Type name or email to search..."
                required={fieldHasError("cc")}
                onPeopleSelectChange={(peoples) => {
                  const emails = peoples.map((x) => x?.secondaryText);
                  formik.setFieldValue("cc", emails, true);
                }}
                onBlur={() => {
                  formik.setFieldTouched("cc", true);
                }}
                showSecondaryText={false}
                personSelectionLimit={30}
                errorMessage={
                  fieldHasError("cc") ? (formik.errors["to"] as string) : ""
                }
                description="Select user to set CC Email Address."
              />
            </Stack.Item>
          </Stack>
          <Stack horizontal tokens={gapStackTokens}>
            <Stack.Item className={classNames.inputItem75}>
              <PeoplePicker
                peoplePickerType="Compact"
                label="BCC:"
                placeholder="Type name or email to search..."
                required={fieldHasError("bcc")}
                onPeopleSelectChange={(peoples) => {
                  const emails = peoples.map((x) => x?.secondaryText);
                  formik.setFieldValue("bcc", emails, true);
                }}
                onBlur={() => {
                  formik.setFieldTouched("bcc", true);
                }}
                showSecondaryText={false}
                personSelectionLimit={30}
                errorMessage={
                  fieldHasError("bcc") ? (formik.errors["to"] as string) : ""
                }
                description="Select user to set BCC Email Address."
              />
            </Stack.Item>
          </Stack>

          <Stack horizontal tokens={gapStackTokens}>
            <Stack.Item className={classNames.inputItem75}>
              <TextField
                label="Subject:"
                name="subject"
                placeholder="Enter your email subject..."
                required={fieldHasError("subject")}
                onChange={formik.handleChange}
                value={formik.values.subject}
              />
              {fieldHasError("subject")
                ? renderFieldErrorMessage(formik.errors["subject"])
                : ""}
            </Stack.Item>
          </Stack>

          <Stack horizontal tokens={gapStackTokens}>
            <Stack.Item className={classNames.inputItem75}>
              <RichTextEditor
                label="Email Body:"
                placeholder="Compose your Email Message...."
                required={fieldHasError("description")}
                value={formik?.values?.body}
                onChange={(value) => {
                  formik.setFieldValue("body", value, true);
                }}
                onBlur={() => {
                  formik.setFieldTouched("body", true);
                }}
                errorMessage={
                  fieldHasError("body") ? formik.errors["body"] : ""
                }
                description="You can format message."
              />
            </Stack.Item>
          </Stack>

          <Stack horizontal tokens={gapStackTokens}>
            <Stack.Item>
              <PrimaryButton text="Send Email" onClick={formik.submitForm} />
            </Stack.Item>
            <Stack.Item>
              <DefaultButton text="Reset Form" onClick={formik.handleReset} />
            </Stack.Item>
          </Stack>
          <Stack horizontal tokens={gapStackTokens}>
            <Stack.Item className={classNames.inputItem75}>
              <Toggle
                label="Enable or Disable Edit Mode"
                defaultChecked={showFormikData}
                onText="Showing Formik Data"
                offText="Hiding Formik Data"
                onChange={toggleFormikData}
              />
              {showFormikData && <pre>{JSON.stringify(formik, null, 2)}</pre>}
            </Stack.Item>
          </Stack>
        </form>
      </div>
    </div>
  );
};
