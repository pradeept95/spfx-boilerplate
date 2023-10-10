/* eslint-disable */
import { ErrorMessage, useField } from "formik";
import * as React from "react";
import { RichTextEditor } from "../RichTextEditor";
import { ReactQuillProps } from "react-quill";
import {
  Body1Stronger,
  Field,
  FieldProps,
  LabelProps,
  useId,
} from "@fluentui/react-components";
import { InfoLabel, InfoLabelProps } from "@fluentui/react-components/unstable";

export const RichInputField: React.FunctionComponent<
  Partial<
    ReactQuillProps &
      InfoLabelProps &
      FieldProps & {
        name: string;
      }
  >
> = ({
  name,
  label, 
  ...props
}) => {
  const inputId = useId("rich-input");

  //formik specific config
  const [_, { value, touched, error }, { setValue, setTouched }] = useField(name);
  const hasError = React.useMemo(() => touched && error?.length > 0, [touched, error]);
  

  // Fluent UI specific config
  const { ...fieldsProps }: FieldProps = props;
  const { ...infoLabelProps }: InfoLabelProps = props;
  const { ...reactQuillProps }: ReactQuillProps = props;

  return (
    <>
      <Field
        {...fieldsProps}
        label={
          {
            children: (_: unknown, props: LabelProps) => (
              <InfoLabel
                {...infoLabelProps}
                htmlFor={inputId} 
              >
                <Body1Stronger>{label}</Body1Stronger>
              </InfoLabel>
            ),
          } as LabelProps
        }
        validationState={hasError ? "error" : undefined}
        validationMessage={hasError ? <ErrorMessage name={name} /> : undefined} 
      >
        {(fieldProps) => (
          <RichTextEditor
            id={inputId}
            {...reactQuillProps}
            value={value}
            onChange={(
              content: string,
              delta: any,
              source: any,
              editor: any
            ) => {
              setValue(content === "<p><br></p>" ? "" : content);
              reactQuillProps?.onChange &&
                reactQuillProps?.onChange(content, delta, source, editor);
            }}
            onBlur={() => setTouched(true, true)}
            {...fieldProps}
          />
        )}
      </Field>
    </>
  );
};
