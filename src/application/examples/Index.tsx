/* eslint-disable */
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { ExampleLayout } from "../layouts/ExampleLayout";
import EditorExample from "./EditorExample";
import LoadingExample from "./LoadingExample";
import NotifyExample from "./NotifyExample";
import PeoplePickerExample from "./PeolpePickerExample";

const ExampleEntryPage: React.FunctionComponent<{}> = (props) => {

  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<ExampleLayout />} >
            <Route index element={<>Example Home</>} />
            <Route path="loading" element={<LoadingExample />} />
            <Route path="people" element={<PeoplePickerExample />} />
            <Route path="notify" element={<NotifyExample />} />
            <Route path="editor" element={<EditorExample />} /> 
          </Route>
        </Routes>
      </section>
    </>
  );
};

export default ExampleEntryPage;
