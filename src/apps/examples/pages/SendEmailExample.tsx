/* eslint-disable */
import * as React from "react";
import { EmailExampleForm } from "../components/EmailExample";
import { useTrackPageView } from "@common/hooks/useTrackPageView";

const SendEmailExample: React.FunctionComponent<{}> = (props) => {
  useTrackPageView({
    name: "Send Email Example",
  });

  return (
    <>
      <EmailExampleForm />
    </>
  );
};

export default SendEmailExample;
