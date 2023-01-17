/* eslint-disable */
import * as React from "react";
import { Routes, Route } from "react-router-dom"; 
import { SiteAdminLayout } from "./layout/SiteAdminLayout";
import SiteAdminHomePage from "./pages/SiteAdminHome";

const SiteAdminEntryPage: React.FunctionComponent<{}> = (props) => {

  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<SiteAdminLayout />} >
            <Route index element={<SiteAdminHomePage/>} />
            <Route path="/home" element={<SiteAdminHomePage/>} />
            <Route path="settings" element={<>App Setting Page</>} />
            <Route path="manage-resources" element={<>Manage App Resources</>} />
            <Route path="manage-roles" element={<>Manage Roles</>} /> 
          </Route>
        </Routes>
      </section>
    </>
  );
};

export default SiteAdminEntryPage;
