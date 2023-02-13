/* eslint-disable */
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { PageNotFound } from "../../common/components/PageNotFound";
import { MyNINDSLayout } from "./layout/MyNINDSLayout";
import { MyPendingActionPage } from "./pages/MyPendingActionPage";
import { TaskFormPage } from "./pages/TaskFormPage";

const MyNINDSEntryPage: React.FunctionComponent<{}> = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyNINDSLayout />}>
          <Route index element={<MyPendingActionPage />} />
          <Route path="/:id/:mode" element={<TaskFormPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default MyNINDSEntryPage;
