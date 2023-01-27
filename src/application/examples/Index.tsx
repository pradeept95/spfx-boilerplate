/* eslint-disable */
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { PageNotFound } from "../../common/components/PageNotFound";
import { ExampleLayout } from "./layout/ExampleLayout"; 
import { DataTableExamplePage1, DataTableExamplePage2 } from "./pages/DataTableExample";
import DocuSignExample from "./pages/DocuSignFlow";
import EditorExample from "./pages/EditorExample";
import ESignatureExample from "./pages/ESignatureExample";
import FormExampleWithState from "./pages/FormExample";
import LoadingExample from "./pages/LoadingExample";
import NotifyExample from "./pages/NotifyExample";
import PeoplePickerExample from "./pages/PeolpePickerExample";

const ExampleEntryPage: React.FunctionComponent<{}> = (props) => {

  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<ExampleLayout />}>
            <Route
              index
              element={
                <>
                  <LoadingExample />
                  <PeoplePickerExample />
                  <NotifyExample />
                  <EditorExample />
                  <ESignatureExample />
                </>
              }
            />
            <Route path="loading" element={<LoadingExample />} />
            <Route path="people" element={<PeoplePickerExample />} />
            <Route path="notify" element={<NotifyExample />} />
            <Route path="editor" element={<EditorExample />} />
            <Route path="esignature" element={<ESignatureExample />} />
            <Route path="form" element={<FormExampleWithState />} />
            <Route
              path="datatable1"
              element={
                <>
                  <DataTableExamplePage1 />
                  {/* <DataTableExamplePage2 /> */}
                </>
              }
            />
            <Route path="datatable2" element={<DataTableExamplePage2 />} />
            <Route path="docusign" element={<DocuSignExample />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </section>
    </>
  );
};

export default ExampleEntryPage;
