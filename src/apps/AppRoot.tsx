/* eslint-disable */
import * as React from "react";
import { 
  Route, 
  createRoutesFromElements,
  createHashRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { PageNotFound, AccessDenied } from "@prt-ts/fluent-common-features";
import ExampleEntryPage from "./examples/Index"; 
import { ROLES } from "@common/auth/AuthType";
import { RequireRoleAuth } from "../common/auth/AuthContext";
import LayoutExampleApp from "./fullpage-layout";
import AwardRoot from "./awards";

// this component is used to redirect to the correct route
// if the user is coming from an external link like email
const decodeAppRoute = (uri: string | undefined) => {
  if (uri) {
    return uri
      .replace(/%2F/g, "/")
      .replace(/%3F/g, "?")
      .replace(/%3D/g, "=")
      .replace(/%26/g, "&")
      .replace(/%23/g, "#")
      .replace(`?appRoute=`, "#")
      .replace(/%2B/g, "+")
      .replace(/%2C/g, ",")
      .replace(/%3A/g, ":")
      .replace(/%3B/g, ";");
  }
  return uri;
};

const AppNavigator: React.FC = () => {
  const currentLocation = window.location.href;
  let params = new URL(currentLocation).searchParams;
  let appRoute = params.get("appRoute");

  if (appRoute) {   
    window.location.href = decodeAppRoute(currentLocation);
  }
  // default route to example
  return <Navigate to={"/examples"} />;
};

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* public routes */}
      <Route
        index
        element={<AppNavigator />}
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
