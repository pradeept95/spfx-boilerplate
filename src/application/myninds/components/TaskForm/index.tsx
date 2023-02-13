/* eslint-disable */
import {
  Checkbox,
  DefaultButton,
  IStackTokens,
  mergeStyleSets,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { useFormik } from "formik";
import * as React from "react";
import {
  renderFieldErrorMessage,
  renderFieldLabelWithHelp,
} from "../../../../common/components/FormElement";
import { PeoplePicker } from "../../../../common/components/PeoplePicker";
import { RichTextEditor } from "../../../../common/components/RichTextEditor";
import AppContext from "../../../../common/config/app-context.config";
import { useCreateAndAssignTask } from "../../shared/hooks/useCreateTask";
import { useGetPendingActionById } from "../../shared/hooks/useGetAllPendingActions";
import { taskValidationSchema } from "./task-form.schema";

const classNames = mergeStyleSets({
  fieldGroup: {
    minWidth: 300,
  },
});

const wrapStackTokens: IStackTokens = { childrenGap: 5 };
const currentContext = AppContext.getInstance();
export const TaskForm: React.FunctionComponent<{
  id: string;
  onCancel: () => void;
}> = ({ id, onCancel }) => {
  const [createAndAssignTask] = useCreateAndAssignTask();
  
  // for edit
  const [pendingAction, getActionById] = useGetPendingActionById(); 
  React.useEffect(() => {
    if (+id > 0) {
      getActionById(id);
    }
  }, [id]); 
  React.useEffect(() => {
    console.log(pendingAction);

    if(pendingAction){
      formik.setValues({
        actionURL: pendingAction.actionUrl,
        assignedTo: [],
        application: pendingAction.application,
        applicationId: pendingAction.applicationId,
        taskAction: pendingAction.action,
        taskDetails: pendingAction.details,
        active : pendingAction.active
      });
    }

  }, [pendingAction]);

  const formik = useFormik({
    initialValues: {
      actionURL: "",
      assignedTo: [],
      application: "",
      applicationId: "",
      taskAction: "",
      taskDetails: "",
      active : true
    },
    validationSchema: taskValidationSchema,
    validateOnChange: true,
    onSubmit: async (data) => {
      await createAndAssignTask(data);
      onCancel();
    },
    onReset: () => {
      onCancel();
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <Stack
          enableScopedSelectors
          horizontal
          wrap
          tokens={wrapStackTokens}
          styles={{ root: { width: 650 } }}
        >
          <span className={classNames.fieldGroup}>
            <PeoplePicker
              label="Assigned To:"
              required={true}
              onPeopleSelectChange={(peoples) => {
                formik.setFieldValue("assignedTo", peoples, true);
                if (peoples?.length)
                  formik.setFieldTouched("assignedTo", false);
              }}
              onBlur={() => {
                formik.setFieldTouched("assignedTo", true);
              }}
              errorMessage={
                formik.touched?.assignedTo && formik.errors?.assignedTo
                  ? (formik.errors?.assignedTo as string)
                  : ""
              }
            />
          </span>
          <span className={classNames.fieldGroup}>
            <TextField
              required={true}
              name="actionURL"
              label="Action URL:"
              placeholder="Enter Action URL"
              value={formik?.values?.actionURL}
              validateOnFocusIn={true}
              validateOnFocusOut={true}
              validateOnLoad={true}
              onChange={formik?.handleChange}
              onBlur={() => {
                formik?.setFieldTouched("actionURL", true);
              }}
              onRenderLabel={(fieldProps) =>
                renderFieldLabelWithHelp(fieldProps)
              }
              invalid={
                formik.touched?.actionURL &&
                formik.errors?.actionURL?.length > 0
              }
            />
            {formik.touched?.actionURL && formik.errors?.actionURL?.length > 0
              ? renderFieldErrorMessage(formik.errors?.actionURL)
              : ""}
          </span>
          <span className={classNames.fieldGroup}>
            <TextField
              name="application"
              label="Application:"
              placeholder="Enter Application Name"
              value={formik?.values?.application}
              onChange={formik?.handleChange}
              onBlur={() => {
                formik?.setFieldTouched("application", true);
              }}
              onRenderLabel={(fieldProps) =>
                renderFieldLabelWithHelp(fieldProps)
              }
              invalid={
                formik.touched?.application &&
                formik.errors?.application?.length > 0
              }
            />
            {formik.touched?.application &&
            formik.errors?.application?.length > 0
              ? renderFieldErrorMessage(formik.errors?.application)
              : ""}
          </span>
          <span className={classNames.fieldGroup}>
            <TextField
              name="applicationId"
              label="Application ID:"
              placeholder="Enter Application ID"
              value={formik?.values?.applicationId}
              onChange={formik?.handleChange}
              onBlur={() => {
                formik?.setFieldTouched("applicationId", true);
              }}
              onRenderLabel={(fieldProps) =>
                renderFieldLabelWithHelp(fieldProps)
              }
              invalid={
                formik.touched?.applicationId &&
                formik.errors?.applicationId?.length > 0
              }
            />
            {formik.touched?.applicationId &&
            formik.errors?.applicationId?.length > 0
              ? renderFieldErrorMessage(formik.errors?.applicationId)
              : ""}
          </span>
          <span className={classNames.fieldGroup}>
            <TextField
              name="taskAction"
              label="Action:"
              placeholder="Enter Sort Task Description"
              value={formik?.values?.taskAction}
              onChange={formik?.handleChange}
              onBlur={() => {
                formik?.setFieldTouched("taskAction", true);
              }}
              onRenderLabel={(fieldProps) =>
                renderFieldLabelWithHelp(fieldProps)
              }
              invalid={
                formik.touched?.taskAction &&
                formik.errors?.taskAction?.length > 0
              }
            />
            {formik.touched?.taskAction && formik.errors?.taskAction?.length > 0
              ? renderFieldErrorMessage(formik.errors?.taskAction)
              : ""}
          </span>
        </Stack>
        <Stack enableScopedSelectors horizontal wrap tokens={wrapStackTokens}>
          <span className={classNames.fieldGroup}>
            <RichTextEditor
              label="Task Details:"
              placeholder="Enter Task Details"
              required={true}
              value={formik?.values?.taskDetails}
              onChange={(value) => {
                formik.setFieldValue("taskDetails", value, true);
              }}
              onBlur={() => {
                formik.setFieldTouched("taskDetails", true);
              }}
              errorMessage={
                formik.touched?.taskDetails &&
                formik.errors?.taskDetails?.length > 0
                  ? formik.errors?.taskDetails
                  : ""
              }
            />
          </span>
        </Stack>
        <Stack>
          <Checkbox
            label="Is Active"
            name="active"
            checked={formik.values?.active}
            onChange={formik?.handleChange}
          />
        </Stack>
        <Stack
          horizontal
          tokens={wrapStackTokens}
          styles={{ root: { marginTop: 10 } }}
        >
          <Stack.Item>
            <PrimaryButton text="Submit Task" onClick={formik.submitForm} />
          </Stack.Item>
          <Stack.Item>
            <DefaultButton text="Cancel" onClick={formik.handleReset} />
          </Stack.Item>
        </Stack>
        <Stack horizontal>
          <Stack.Item className={classNames.fieldGroup}>
            {currentContext?.siteSettings?.enableDebugMode && (
              <pre>{JSON.stringify(formik, null, 2)}</pre>
            )}
          </Stack.Item>
        </Stack>
      </form>
    </div>
  );
};
