/* eslint-disable */
import * as React from "react";
import { createContext, useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AppContext from "../config/app-context.config"; 

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

export const RequireAuth: React.FunctionComponent<{
  allowedRoles: number[];
}> = ({ allowedRoles }) => {
  const { auth } = useAuthContext();
  const location = useLocation();

  const currentContext = AppContext.getInstance();
  const user = currentContext.context.pageContext.user;

  const waitResolve = !auth;

  return waitResolve ? (
    // <PageLoading /> 
    <h1>User Access Verifying</h1>
  ) : auth?.roles?.some((role: number) => allowedRoles?.indexOf(role) > -1) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/page-not-found" state={{ from: location }} replace />
  );
}; 