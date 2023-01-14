/* eslint-disable */
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initializeIcons } from "@fluentui/react";
import { setIconOptions } from "@fluentui/react/lib/Styling";
import AppContext from "../common/config/app-context.config";
import { ROLES } from "../common/types/auth.types";
import { useAuthContext } from "../common/context/AuthContext"; 
import { useAlert } from "../common/hooks/useAlert";
import { PageNotFound } from "../common/components/PageNotFound"; 
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminHome } from "./admin/AdminHome";
import ExampleEntryPage from "./examples/Index";
import { AccessDenied } from "../common/components/AccessDenied";
// import { UserAccessService } from "../common/services/UserAccessService";

const ApplicationEntry: React.FunctionComponent<{}> = (props) => {
  const { setAuth } = useAuthContext();
  const { success, error, info, warning } = useAlert();
  //  const { getUserProfile } = UserAccessService();
  

  const notify = () => {
    success("Hello");
    info("World");
    warning("Some Warn");
    error("Error");
  };



  const callApi = async (): Promise<void> => {
    // const sp = await getSP();

    // Using RowLimit. Enables paging
    // await sp.web.lists.getByTitle("AwardType").getListItemChangesSinceToken({ RowLimit: '5' });

    // Use QueryOptions to make a XML-style query.
    // Because it's XML we need to escape special characters
    // Instead of & we use &amp; in the query
    // await sp.web.lists.getByTitle("AwardType").getListItemChangesSinceToken({ QueryOptions: '<Paging ListItemCollectionPositionNext="Paged=TRUE&amp;p_ID=5" />' });

    // Get everything. Using null with ChangeToken gets everything
    // await sp.web.lists.getByTitle("AwardType").items();
  };

  useEffect(() => {
    const currrentContext = AppContext.getInstance();

    const user = currrentContext.context.pageContext.user;

    setAuth({
      user: user,
      roles: [ROLES.User, ROLES.Admin],
    });

    initializeIcons();
    // Suppress icon warnings.
    setIconOptions({
      disableWarnings: true,
    });

    callApi();
  }, []);

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
                  <button onClick={notify}>Notify !</button>
               
                  Home
                </>
              }
            />
            <Route
              path="/test"
              element={
                <>
                  
                  Test
                </>
              }
            />
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
            </Route>
            <Route path="/examples/*" element={<ExampleEntryPage />} />
            <Route path="/unauthorized" element={<AccessDenied />} />
            <Route path='/page-not-found' element={<PageNotFound />} />
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
