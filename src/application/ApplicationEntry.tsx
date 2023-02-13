/* eslint-disable */
import * as React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
// import { useEffect } from "react";
import AppContext from "../common/config/app-context.config";
import { PageNotFound } from "../common/components/PageNotFound";
import ExampleEntryPage from "./examples/Index";
import { AccessDenied } from "../common/components/AccessDenied";
import SiteAdminEntryPage from "../common/site-admin";
// import { AwardTypeService } from "./shared/services/AwardTypeService";
import AdminEntryPage from "./admin";
import { RequireAuth } from "../common/context/AuthContext";
import { ROLES } from "../common/types/auth.types"; 
import MyNINDSEntryPage from "./myninds";
// import { DocuSignService } from "../common/services/DocuSignService";
// import { DocuSignService } from "../common/services/DocuSignService";

// const { getAllAwardTypes } = AwardTypeService();

// export const useGetAllDropList = () => {
//   const [s, setAwardType] = React.useState<AwardType[]>([]);
//   const [f, setF] = React.useState<AwardType[]>([]);
//   const [g, setG] = React.useState<AwardType[]>([]);

//   const callApi = async (): Promise<void> => {
//     const at = await getAllAwardTypes();
//     setAwardType(at);
//    // await getAwardTypesById(2);
//   };

//   useEffect(() => {
//     callApi();
//   }, []);

//   return [s, f, g] as const;
// };

const ApplicationEntry: React.FunctionComponent<{}> = (props) => {
   
  // const {authorizeApp} = DocuSignService();

  const openPropertyPane = () => {
    const currrentContext = AppContext.getInstance();
    currrentContext.context.propertyPane.openDetails();
    currrentContext.context.propertyPane.open();
  };

  // React.useEffect(() => {
  //   authorizeApp();
  // }, []);

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
                      <NavLink to={"/examples"}>Go to Example Layout</NavLink>
                    </li>
                    <li>
                      <button onClick={openPropertyPane}>Open Setting</button>
                    </li>
                    <li></li>
                  </ul>
                </>
              }
            />
            <Route element={<RequireAuth requiredRoles={[ROLES.Admin]} />}>
              <Route path="/admin/*" element={<AdminEntryPage />} />
            </Route>
            <Route element={<RequireAuth requiredRoles={[ROLES.User]} />}>
              <Route path="/myninds/*" element={<MyNINDSEntryPage />} />
            </Route>
            <Route element={<RequireAuth requiredRoles={[ROLES.Admin]} />}>
              <Route path="/admin/*" element={<AdminEntryPage />} />
            </Route>
            {/* requiredAll : default is false -- if false, no need to specify, just for demo */}
            <Route
              element={
                <RequireAuth requiredRoles={[ROLES.User]} requiredAll={false} />
              }
            >
              <Route path="/examples/*" element={<ExampleEntryPage />} />
            </Route>

            <Route element={<RequireAuth requiredRoles={[ROLES.Admin]} />}>
              <Route path="/s-admin/*" element={<SiteAdminEntryPage />} />
            </Route>

            {/* catch all */}
            <Route path="/unauthorized" element={<AccessDenied />} />
            <Route path="/page-not-found" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          {/* <Route path="/admin" element={<AdminLayout />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/admin/home" element={<AdminPage />} />
              <Route
                path="/admin/award-category"
                element={<AwardCategoryPage />}
              />
              <Route path="/admin/*" element={<PageNotFound />} />
            </Route>
          </Route> */}

          {/* catch all */}
          {/* <Route path="/unauthorized" element={<AccessDenied />} /> */}
          {/* <Route path='/page-not-found' element={<PageNotFound />} />
          <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
      </section>
    </>
  );
};

export default ApplicationEntry;
