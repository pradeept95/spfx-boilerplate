/* eslint-disable */
import * as React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { initializeIcons } from "@fluentui/react";
import { setIconOptions } from "@fluentui/react/lib/Styling";
import AppContext from "../common/config/app-context.config";
import { ROLES } from "../common/types/auth.types";
import { useAuthContext } from "../common/context/AuthContext";
import { PageNotFound } from "../common/components/PageNotFound";
import { AdminLayout } from "./admin/layout/AdminLayout";
import { AdminHome } from "./admin/pages/AdminHome";
import ExampleEntryPage from "./examples/Index";
import { AccessDenied } from "../common/components/AccessDenied";
import SiteAdminEntryPage from "../common/site-admin";
// import { UserAccessService } from "../common/services/UserAccessService";

const ApplicationEntry: React.FunctionComponent<{}> = (props) => {
  const { setAuth } = useAuthContext();

  //  const { getUserProfile } = UserAccessService();

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

  const openPropertyPane = ()=> { 
    const currrentContext = AppContext.getInstance();
    currrentContext.context.propertyPane.openDetails();
    currrentContext.context.propertyPane.open(); 
  }

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
                      <NavLink to={"/admin"} >Go to Admin Layout</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/examples"} >Go to Example Layout</NavLink>
                    </li>
                    <li>
                      <button  onClick={openPropertyPane}>Open Setting</button>
                    </li>
                    <li></li>
                  </ul>
                </>
              }
            />
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
            </Route>
            <Route path="/examples/*" element={<ExampleEntryPage />} />
            <Route path="/s-admin/*" element={<SiteAdminEntryPage />} />
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
