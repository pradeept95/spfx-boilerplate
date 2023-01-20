/* eslint-disable */ 
import * as React from "react"; 
import FormExample from "../components/ExampleForm";
  
const FormExampleWithState: React.FunctionComponent<{}> = (props) => {
  
  return (
    <>
      <section>
        <h3>Form Example with State</h3> <hr />
         <FormExample />
      </section>
    </>
  );
};

export default FormExampleWithState;
