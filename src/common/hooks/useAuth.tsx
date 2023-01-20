/* eslint-disable */
import * as React from "react";
import AppContext from "../config/app-context.config";
import { getSP } from "../config/pnpjs.config";
import { useAuthContext } from "../context/AuthContext";
import { AccessGroupUsers } from "../types/access-group.type";
import { ROLES } from "../types/auth.types";


const currrentContext = AppContext.getInstance();

export const useAuthInitialization = () => {
  const { setAuth } = useAuthContext();
  const currentUser = currrentContext.context.pageContext.user;
  const [isAuthInitializing, setIsAuthInitializing] =
    React.useState<boolean>(true);

  const initializeAuth = async () => {
    const user = currrentContext.context.pageContext.user;
     
    const userRoles = await getAllRolesForCurrentUserAndInitialize();
    setAuth({
      user: user,
      roles: userRoles,
    });
    setIsAuthInitializing(false);
  };

  const getAllRolesForCurrentUserAndInitialize = async (): Promise<number[]> => {
    const sp = await getSP();
    let defaultRole : number[] = [ROLES.User];
    let currentUserRoles : number[] = [];
    let accessGroupUsers: Partial<AccessGroupUsers> = {};

    let roleKey: keyof typeof ROLES;  
    for (roleKey in ROLES) {
      const spGroupId = ROLES?.[roleKey];  
      const users = await sp.web.siteGroups.getById(spGroupId).users();
      const isUserPartOfGroup = users?.some(user => user.UserPrincipalName == currentUser.loginName); 
      if(isUserPartOfGroup){
        currentUserRoles.push(spGroupId);
      } 
      accessGroupUsers[roleKey] = users;
    }   
    currrentContext.setAccessGroupUsers(accessGroupUsers); 
    
    const userAllRoles = [...defaultRole, ...currentUserRoles];
    currrentContext.setCurrentUserRoles(userAllRoles); 
    console.log("User Access Initialized...");
    return userAllRoles as number[];
  };

  return [isAuthInitializing, initializeAuth] as const;
};

