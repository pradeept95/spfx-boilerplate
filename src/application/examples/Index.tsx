/* eslint-disable */
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import LoadingExample from "./LoadingExample";
import PeoplePickerExample from "./PeolpePickerExample";

const ExampleEntryPage: React.FunctionComponent<{}> = (props) => {

  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<AdminLayout />} >
            <Route index element={<>Example Home</>} />
            <Route path="loading" element={<LoadingExample />} />
            <Route path="people" element={<PeoplePickerExample />} />
            <Route
              path="/test"
              element={
                <>
                  Example Test
                </>
              }
            />
          </Route>
        </Routes>
      </section>
    </>
  );
};

export default ExampleEntryPage;
