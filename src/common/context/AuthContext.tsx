/* eslint-disable */
import * as React from "react";
import { createContext, useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AppContext from "../config/app-context.config"; 
import { RouteRoleType } from "../types/route-role.type";

const currentContext = AppContext.getInstance();
export const AuthContext = createContext<any>({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FunctionComponent<{}> = ({ children }) => {
  const [auth, setAuth] = useState();

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}; 
 
export const RequireAuth: React.FunctionComponent<RouteRoleType> = ({
  requiredRoles,
  requiredAll,
}) => {
  const [allowAccess, setAllowAccess] = useState<boolean>(false);
  const [waitResolve, setWaitResolve] = useState<boolean>(true);
  const { auth } = useAuthContext();
  const location = useLocation();

  const user = currentContext.context.pageContext.user;

  React.useEffect(() => {
    const isAllowAccess = !requiredAll
      ? auth?.roles?.some((role: number) => requiredRoles?.indexOf(role) > -1)
      : auth?.roles?.every((role: number) => requiredRoles?.indexOf(role) > -1);

    // set allowed access 
    setAllowAccess(isAllowAccess);
    setWaitResolve(false); 
  }, [auth]); 

  return waitResolve ? (
    // <PageLoading />
    <h1>User Access Verifying</h1>
  ) : allowAccess ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/page-not-found" state={{ from: location }} replace />
  );
}; 