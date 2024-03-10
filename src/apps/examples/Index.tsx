/* eslint-disable */
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageNotFound } from '@prt-ts/fluent-common-features';
import { Layout } from './layout/ExampleLayout';
import DocuSignExample from './pages/DocuSignFlow';
import EditorExample from './pages/EditorExample';
import ESignatureExample from './pages/ESignatureExample';
import FileUploadExample from './pages/FileUploadExample';
import FormExampleWithState from './pages/FormExample';
import LoadingExample from './pages/LoadingExample';
import NotifyExample from './pages/NotifyExample';
import PDFMakeExample from './pages/PDFMakeExample';
import PeoplePickerExample from './pages/PeolpePickerExample';
import SendEmailExample from './pages/SendEmailExample';
import { RealTimeExample } from './pages/RealTimeExample';
import { TableExample } from './pages/TableExample';
import { TableExample2 } from './pages/DataTableExample';
import { SPOData } from '@common/pnp';
import ConfirmExample from './pages/ConfirmExample';
import { ChartExample } from './pages/Chart';
import AllFeatureExamples from './pages/Features';
import ControlFlow from './pages/ControlFlow';

type TestModel = {
   ProjectStatus: string;
   Deadline: Date;
   AO: {
      title: string;
      userName: string;
      email: string;
   };
};

const ExampleEntryPage: React.FunctionComponent<{}> = (props) => {
   React.useEffect(() => {
      const filterQuery = SPOData.Where()
         .Some([
            SPOData.Where().All([
               SPOData.Where<TestModel>().TextField('ProjectStatus').NotEqualTo('Done'),
               SPOData.Where<TestModel>().DateField('Deadline').LessThan(new Date()),
            ]),
            SPOData.Where().All([SPOData.Where<any>().TextField('ProjectStatus').EqualTo('Critical')]),
            SPOData.Where().Some([
               SPOData.Where<any>().LookupField('AO').TextField('Title').EqualTo('John Doe'),
               SPOData.Where<any>().LookupField('AO').TextField('UserName').Contains('doeja'),
               SPOData.Where<any>().LookupField('AO').TextField('Email').EqualTo('john.doe@example.come'),
            ]),
         ])
         .ToString();

      console.log('filterQuery', filterQuery);
   }, []);

   return (
      <>
         <section>
            <Routes>
               <Route path="/" element={<Layout />}>
                  <Route
                     index
                     element={
                        <>
                           <h2>Welcome to SPFx Sharepoint Framework Examples</h2>
                           <p>
                              This is a collection of examples for the SPFx Sharepoint Framework. The examples are built
                              using the Fluent UI V9 and Custom Common Features libraries.
                           </p>
                        </>
                     }
                  />
                  <Route path="loading" element={<LoadingExample />} />
                  <Route path="real-time" element={<RealTimeExample />} />
                  <Route path="people" element={<PeoplePickerExample />} />
                  <Route path="notify" element={<NotifyExample />} />
                  <Route path="confirm" element={<ConfirmExample />} />
                  <Route path="editor" element={<EditorExample />} />
                  <Route path="esignature" element={<ESignatureExample />} />
                  <Route path="form" element={<FormExampleWithState />} />
                  <Route
                     path="table"
                     element={
                        <>
                           <TableExample />
                        </>
                     }
                  />
                  <Route
                     path="table2"
                     element={
                        <>
                           <TableExample2 />
                        </>
                     }
                  />

                  <Route path="docusign" element={<DocuSignExample />} />
                  <Route path="email" element={<SendEmailExample />} />
                  <Route path="pdf" element={<PDFMakeExample />} />
                  <Route path="file" element={<FileUploadExample />} />
                  <Route path="chart" element={<ChartExample />} />
                  <Route path="all-features" element={<AllFeatureExamples />} />
                  <Route path="controls" element={<ControlFlow />} />
                  <Route path="*" element={<PageNotFound />} />
               </Route>
            </Routes>
         </section>
      </>
   );
};

export default ExampleEntryPage;
