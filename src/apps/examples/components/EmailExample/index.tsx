/* eslint-disable */
import { Form, Formik } from "formik";
import * as React from "react";
import { useEmailService } from "../../../shared/services/EmailService";
import { emailInitialValues, emailValidationSchema } from "./email-form.schema";
import { Button } from "@fluentui/react-components";
import { PeopleInput } from "@common/components/Forms";
import { Input, RichInput } from "@prt-ts/fluent-formik";
import { IEmailProps } from "@common/shared/Builder/EmailBuilder";

const { sendTestEmail } = useEmailService();
export const EmailExampleForm: React.FunctionComponent<{}> = (props) => {
  const onSubmit = async (data) => {
    console.log(JSON.stringify(data, null, 2));

    const emailData: IEmailProps = {
      from: data.from,
      to: data.to?.map((item) => item.email),
      cc: data.cc?.map((item) => item.email),
      bcc: data.bcc?.map((item) => item.email),
      subject: data.subject,
      body: data.body,
    };

    await sendTestEmail(emailData);
  };

  return (
    <div style={{ paddingLeft: 15, paddingRight: 15 }}>
      <h1>Email Sender Example</h1> <hr />
      <div className="container">
        <Formik
          initialValues={emailInitialValues}
          validationSchema={emailValidationSchema}
          onSubmit={onSubmit}
        >
          {(fProps) => {
            const { values, errors } = fProps;
            return (
              <Form>
                <PeopleInput name="to" label="To:" required={true} />
                <PeopleInput name="cc" label="CC:" />
                <PeopleInput name="bcc" label="BCC:" />
                <Input name="subject" label="Subject:" required={true} />
                <RichInput name="body" label="Body:" required={true} />

                <Button appearance="primary" type="submit">
                  Submit
                </Button>

                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
