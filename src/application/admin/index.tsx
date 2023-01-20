/* eslint-disable */
import * as React from "react";
import { Routes, Route } from "react-router-dom"; 
import { PageNotFound } from "../../common/components/PageNotFound";
import { AdminLayout } from "./layout/AdminLayout";
import { AdminHome } from "./pages/AdminHome";

const AdminEntryPage: React.FunctionComponent<{}> = (props) => {
  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </section>
    </>
  );
};

export default AdminEntryPage;
