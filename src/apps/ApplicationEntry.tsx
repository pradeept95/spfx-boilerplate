/* eslint-disable */
import * as React from "react";
import { Routes, Route, NavLink } from "react-router-dom"; 
import { PageNotFound } from "@common/components/PageNotFound";
import ExampleEntryPage from "./examples/Index";
import { AccessDenied } from "@common/components/AccessDenied";  
import { ROLES } from "@common/auth/AuthType";
import { RequireRoleAuth } from "../common/auth/AuthContext";
import AppContext from "@common/root/app-context";
import LayoutExampleApp from "./fullpage-layout";
import AwardRoot from "./awards";
import { WebPartContext } from "@microsoft/sp-webpart-base";
 

const ApplicationEntry: React.FunctionComponent<{}> = (props) => { 
  const openPropertyPane = () => {
    const currentContext = AppContext.getInstance();
    (currentContext.context as WebPartContext).propertyPane.openDetails();
    (currentContext.context as WebPartContext).propertyPane.open();
  }; 

  return (
    <>
      <section className="body">
        <Routes>
          <Route path="/">
            {/* public routes */}
            <Route
              index
              element={
                <>
                  <ul>
                    <li>
                      <NavLink to={"/admin"}>Go to Admin Layout</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/layout-example"}>
                        Go to Full Page Layout Example
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/examples"}>Go to Example Layout</NavLink>
                    </li>
                    <li>
                      <button onClick={openPropertyPane}>Open Setting</button>
                    </li>
                  </ul>
                </>
              }
            />

            <Route
              element={
                <RequireRoleAuth
                  requiredRoles={[ROLES.User]}
                  requiredAll={false}
                />
              }
            ></Route>

            {/* requiredAll : default is false -- if false, no need to specify, just for demo */}
            <Route
              element={
                <RequireRoleAuth
                  requiredRoles={[ROLES.User, ROLES.Admin]}
                  requiredAll={false}
                />
              }
            >
              <Route path="/examples/*" element={<ExampleEntryPage />} />
              <Route path="/layout-example/*" element={<LayoutExampleApp />} />
              <Route path="/awards/*" element={<AwardRoot />} />
            </Route>
            {/* catch all */}
            <Route path="/unauthorized" element={<AccessDenied />} />
            <Route path="/page-not-found" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </section>
    </>
  );
};
export default ApplicationEntry;
