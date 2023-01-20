/* eslint-disable */
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { ExampleLayout } from "../layouts/ExampleLayout";
import DataTableExamplePage from "./DataTableExample";
import EditorExample from "./EditorExample";
import ESignatureExample from "./ESignatureExample";
import LoadingExample from "./LoadingExample";
import NotifyExample from "./NotifyExample";
import PeoplePickerExample from "./PeolpePickerExample";

const ExampleEntryPage: React.FunctionComponent<{}> = (props) => {

  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<ExampleLayout />} >
            <Route index element={<>
              <LoadingExample />
              <PeoplePickerExample />
              <NotifyExample />
              <EditorExample />
              <ESignatureExample />
            </>} />
            <Route path="loading" element={<LoadingExample />} />
            <Route path="people" element={<PeoplePickerExample />} />
            <Route path="notify" element={<NotifyExample />} />
            <Route path="editor" element={<EditorExample />} /> 
            <Route path="esignature" element={<ESignatureExample />} /> 
            <Route path="datatable" element={<DataTableExamplePage />} /> 
          </Route>
        </Routes>
      </section>
    </>
  );
};

export default ExampleEntryPage;
