/* eslint-disable */
import * as React from 'react';
import { EmailTemplateForm } from '../components/ExampleForm/EmailTemplateForm';
import { useTrackPageView } from '@common/hooks/useTrackPageView';
// import { useLoading } from "@common/features/loading";

const FormExampleWithState: React.FunctionComponent<{}> = (props) => {
   useTrackPageView({
      name: 'Form Example',
   });

   return (
      <>
         <section>
            <h3>Form Example with State</h3> <hr />
            <EmailTemplateForm displayMode="new" />
         </section>
      </>
   );
};

export default FormExampleWithState;
