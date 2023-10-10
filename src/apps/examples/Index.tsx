/* eslint-disable */
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { PageNotFound } from "@prt-ts/fluent-common-features";
import { Layout } from "./layout/ExampleLayout"; 
import { DataTableExamplePage1, DataTableExamplePage2 } from "./pages/DataTableExample";
import DocuSignExample from "./pages/DocuSignFlow";
import EditorExample from "./pages/EditorExample";
import ESignatureExample from "./pages/ESignatureExample";
import FileUploadExample from "./pages/FileUploadExample";
import FormExampleWithState from "./pages/FormExample";
import LoadingExample from "./pages/LoadingExample";
import NotifyExample from "./pages/NotifyExample";
import PDFMakeExample from "./pages/PDFMakeExample";
import PeoplePickerExample from "./pages/PeolpePickerExample";
import SendEmailExample from "./pages/SendEmailExample"; 
import { RealTimeExample } from "./pages/RealTimeExample";
import { LineChartBasicExample } from "./pages/Chart";

const ExampleEntryPage: React.FunctionComponent<{}> = (props) => {

  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<Layout />}>
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
            <Route path="real-time" element={<RealTimeExample />} />
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
                </>
              }
            />
            <Route path="datatable2" element={<DataTableExamplePage2 />} />
            <Route path="docusign" element={<DocuSignExample />} />
            <Route path="email" element={<SendEmailExample />} />
            <Route path="pdf" element={<PDFMakeExample />} />
            <Route path="file" element={<FileUploadExample />} />
            <Route path="chart" element={<LineChartBasicExample />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </section>
    </>
  );
};

export default ExampleEntryPage;
