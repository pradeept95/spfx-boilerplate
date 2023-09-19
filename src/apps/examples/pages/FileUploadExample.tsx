/* eslint-disable */
import { Button } from "@fluentui/react-components";
import { FileInput } from "@prt-ts/fluent-formik";
import { Form, Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";

const schema = Yup.object().shape({
  file: Yup.mixed().required("File is required"),
});

const FileUploadExample: React.FunctionComponent<{}> = (props) => {
  return (
    <>
      <Formik
        initialValues={[{ file: null }]}
        validationSchema={schema}
        onSubmit={() => {}}
        onReset={() => {}}
      >
        {() => {
          return (
            <Form>
              <FileInput name="file" label={"Select File To Upload"} />
              
              <Button appearance="primary" type="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FileUploadExample;
