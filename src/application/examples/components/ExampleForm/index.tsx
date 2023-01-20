/* eslint-disable */
import { IPersonaProps, IStackTokens, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { useFormik } from "formik";
import * as React from "react";
import {
  renderFieldDescription,
  renderFieldErrorMessage,
  renderFieldLabelWithHelp,
} from "../../../../common/components/FormElement";
import { PeoplePicker } from "../../../../common/components/PeoplePicker";
import { RichTextEditor } from "../../../../common/components/RichTextEditor";
import AppContext from "../../../../common/config/app-context.config";
import { ExampleFormSchema } from "./example-form.schema";
import * as formStyle from "../../../../common/components/styles/FormStyle.module.scss"

const gapStackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 5,
}; 

const appContext = AppContext.getInstance();
const FormExample: React.FunctionComponent<{}> = (props) => {

  const [members, setMembers] = React.useState<IPersonaProps[]>([]); 
  React.useEffect(() => {
    const allAdmins = appContext.accessGroupUsers.Member?.map((admin) => {
      return {
        id: `${admin.Id}`,
        text: admin.Title,
        secondaryText: admin.Email,
        tertiaryText: admin.UserPrincipalName,
      } as IPersonaProps;
    });

    setMembers(allAdmins);
  }, []);

  // define form
  const formik = useFormik({
    initialValues: {
      users: [],
      user: {},
      textField: "",
      dropdownField: "Some Default Value",
      someComment: "Some Default Value",
    },
    validationSchema: ExampleFormSchema,
    validateOnChange: true,
    onSubmit: (data) => {
      console.log(JSON.stringify(data, null, 2));
    },
    onReset: () => {},
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack horizontal wrap tokens={gapStackTokens}>
          <Stack.Item className={formStyle.default.inputItem50}>
            <PeoplePicker
              label="Multiple User Select"
              peoplePickerType="List"
              defaultSelectedUsers={members}
              personSelectionLimit={20}
              required={true}
              onPeopleSelectChange={async (users) => {
                formik.setFieldValue("users", users);
              }}
            ></PeoplePicker>
          </Stack.Item>
          <Stack.Item className={formStyle.default.inputItem50}>
            <PeoplePicker
              label="Single User Select"
              required={true}
              onPeopleSelectChange={async (users) => {
                formik.setFieldValue("user", users?.[0]);
              }}
            ></PeoplePicker>
          </Stack.Item>
        </Stack>

        <Stack horizontal wrap tokens={gapStackTokens}>
          <Stack.Item grow>
            <TextField
              required={true}
              name="textField"
              label="Some Text Field"
              value={formik?.values.textField}
              placeholder="Some Placeholder Text"
              validateOnFocusIn={true}
              validateOnFocusOut={true}
              validateOnLoad={true}
              description="For Example, In recognition of outstanding service in implementing the HEAL Diversity Supplement Program or for excellence in [AWARD CATEGORY] to the NINDS Office of Management."
              onChange={formik?.handleChange}
              onRenderDescription={renderFieldDescription}
              onBlur={() => {
                formik?.setFieldTouched("textField", true);
              }}
              onRenderLabel={(fieldProps) =>
                renderFieldLabelWithHelp(fieldProps)
              }
              invalid={
                formik.touched?.textField &&
                formik.errors?.textField?.length > 0
              }
            />
            {formik.touched?.textField && formik.errors?.textField?.length > 0
              ? renderFieldErrorMessage(formik.errors?.textField)
              : ""}
          </Stack.Item>
          <Stack.Item grow></Stack.Item>
        </Stack>

        <Stack horizontal wrap tokens={gapStackTokens}>
          <Stack.Item grow>
            <RichTextEditor
              label="Some Comment"
              placeholder="Comment Placeholder ..."
              value={formik?.values?.someComment}
              errorMessage={formik?.errors?.someComment}
              showHelp={true}
              description="The narrative of accomplishments must focus on the nominee's distinct contributions, including how they exceeded normal expectations and the specific impact of their contributions. Routine responsibilities should be mentioned only as they establish a context for the accomplishment cited. Include relevant time frame."
              onChange={(value) => {
                formik.setFieldValue("someComment", value, true);
              }}
              onBlur={() => {
                formik.setFieldTouched("someComment", true);
              }}
            />
          </Stack.Item>
        </Stack>

        {/* Form Actions */}
        <Stack horizontal tokens={gapStackTokens}>
          <Stack.Item>
            <PrimaryButton text="Submit Form" onClick={formik.submitForm} />
          </Stack.Item>
          {/* <Stack.Item>
            <DefaultButton text="Reset Form" onClick={formik.handleReset} />
          </Stack.Item> */}
        </Stack>

        {/* For Debug Only */}
        <Stack>
          <Stack.Item grow>
            {appContext?.siteSettings?.enableDebugMode && (
              <pre>{JSON.stringify(formik, null, 2)}</pre>
            )}
          </Stack.Item>
        </Stack>
      </form>
    </>
  );
};

export default FormExample;
