/* eslint-disable */
import * as React from "react";  
import { EmailTemplateForm } from "../components/ExampleForm/EmailTemplateForm";
// import { useLoading } from "@common/features/loading";

const FormExampleWithState: React.FunctionComponent<{}> = (props) => {

  // const { showLoader } = useLoading();

  // React.useEffect(() => {
  //   showLoader && showLoader("Loading...");
  // }, []);

  return (
    <>
      <section>
        <h3>Form Example with State</h3> <hr />
        <EmailTemplateForm displayMode="new"/> 
      </section>
    </>
  );
};

export default FormExampleWithState;
 