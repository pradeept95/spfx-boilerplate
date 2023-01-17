/* eslint-disable */
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { ExampleLayout } from "./layout/ExampleLayout";
import EditorExample from "./pages/EditorExample";
import ESignatureExample from "./pages/ESignatureExample";
import LoadingExample from "./pages/LoadingExample";
import NotifyExample from "./pages/NotifyExample";
import PeoplePickerExample from "./pages/PeolpePickerExample";

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
          </Route>
        </Routes>
      </section>
    </>
  );
};

export default ExampleEntryPage;
