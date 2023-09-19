/* eslint-disable */
import * as React from "react";
import { createContext, useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"; 
import { useVerifyResourceAccess, useVerifyUserRoles } from "./useVerifyResourceAccess"; 
import AppContext from "@common/root/app-context";
import { ResourceType, RouteRoleType } from "./AuthType";

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
 
/// <summary>
/// This component is used to verify user roles access based on Role based implementation
/// </summary>
/// <param name="requiredRoles">Required roles to access the component</param>
/// <param name="requiredAll">If true, user must have all the required roles to access the page</param> 
export const RequireRoleAuth: React.FunctionComponent<RouteRoleType> = ({
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

/// <summary>
/// This component is used to verify user resource access based on Resource based implementation
/// </summary>
/// <param name="requiredResources">Required resources to access the component</param>
/// <param name="requiredAll">If true, user must have all the required resources to access the page</param>
export const RequireResourceAuth: React.FunctionComponent<ResourceType> = ({
  requiredResources,
  requiredAll,
}) => {
  const [allowAccess, setAllowAccess] = useState<boolean>(false);
  const [waitResolve, setWaitResolve] = useState<boolean>(true);
  const { auth } = useAuthContext();
  const location = useLocation();

  const user = currentContext.context.pageContext.user;

  const cResources = requiredResources?.map((x) => x?.toLowerCase());
  const allResources = auth?.resources?.map((x) => x?.toLowerCase());

  React.useEffect(() => {
    const isAllowAccess = !requiredAll
      ?  allResources?.some(
            (resource: string) =>
              cResources?.indexOf(resource?.toLowerCase()) > -1
          )
      :  allResources?.every(
            (resource: string) => cResources?.indexOf(resource) > -1
          );

    // set allowed access
    setAllowAccess(isAllowAccess);
    setWaitResolve(false);
  }, [auth]);

  return waitResolve ? (
    // <PageLoading />
    <h1>Verifying Access</h1>
  ) : allowAccess ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/page-not-found" state={{ from: location }} replace />
  );
}; 

/// <summary>
/// This component is used to verify user roles access based on Role based implementation
/// </summary>
/// <param name="requiredRoles">Required roles to access the resource</param>
/// <param name="requiredAll">If true, user must have all the required roles to access the wrapped resource</param>
export const VerifyRoleAccess: React.FunctionComponent<RouteRoleType> = ({
  requiredRoles,
  requiredAll,
  children,
}) => {
  const [hasAccess, verifyAccess] = useVerifyUserRoles();
  React.useEffect(() => {
    verifyAccess(requiredRoles, requiredAll);
  }, [requiredRoles, requiredAll]);

  return hasAccess ? <>{children}</> : <></>;
};

/// <summary>
/// This component is used to verify user resource access based on Resource based implementation
/// </summary>
/// <param name="requiredResources">Required resources to access the resource</param>
/// <param name="requiredAll">If true, user must have all the required resources to access the wrapped resource</param>
export const VerifyResourceAccess: React.FunctionComponent<ResourceType> = ({
  requiredResources,
  requiredAll,
  renderNoAccess,
  children, 
}) => {
  const [hasAccess, verifyAccess] = useVerifyResourceAccess();
  React.useEffect(() => {
    verifyAccess(requiredResources, requiredAll);
  }, [requiredResources, requiredAll]);

  return hasAccess ? <>{children}</> : <>{renderNoAccess}</>;
}; 