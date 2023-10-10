/* eslint-disable */
import * as React from "react";
import { 
  Route,
  NavLink,
  createRoutesFromElements,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { PageNotFound, AccessDenied } from "@prt-ts/fluent-common-features";
import ExampleEntryPage from "./examples/Index"; 
import { ROLES } from "@common/auth/AuthType";
import { RequireRoleAuth } from "../common/auth/AuthContext";
import LayoutExampleApp from "./fullpage-layout";
import AwardRoot from "./awards";

const router = createHashRouter(
  createRoutesFromElements(
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
                {/* <button onClick={openPropertyPane}>Open Setting</button> */}
              </li>
            </ul>
          </>
        }
      />

      <Route
        element={
          <RequireRoleAuth requiredRoles={[ROLES.User]} requiredAll={false} />
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
  )
);

const AppRoot: React.FunctionComponent<{}> = (props) => {
  return (
    <>
      <section className="body">
        <RouterProvider router={router} />
      </section>
    </>
  );
};
export default AppRoot;
