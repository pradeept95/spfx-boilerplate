/* eslint-disable */
import * as React from "react"; 
import { getSP } from "@common/pnp";
import { useAuthContext } from "./AuthContext";
import { RoleService } from "../services/RoleService";
import AppContext from "@common/root/app-context";
// import { AccessGroupUsers } from "../types/access-group.type";
// import { ROLES } from "../types/auth.types";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/webs";

const currentContext = AppContext.getInstance();
const { getResourcesForCurrentUser } = RoleService();

export const useAuthInitialization = () => {
  const { setAuth } = useAuthContext();
  const [isAuthInitializing, setIsAuthInitializing] =
    React.useState<boolean>(true);

  const initializeAuth = async () => {
    await getAllRolesForCurrentUserAndInitialize();
    setIsAuthInitializing(false);
  };

  const getAllRolesForCurrentUserAndInitialize = async (): Promise<
    number[]
  > => {
    const sp = await getSP();
    const groups = await sp.web.currentUser.groups();
    const userAllRoles = [...groups.map((group) => group.Id)];
    const userAllResources = [
      ...(await getResourcesForCurrentUser(userAllRoles)),
      ...groups.map((group) => group.Title),
    ];

    currentContext.setCurrentUserRoles(userAllRoles);
    currentContext.setCurrentUserResources(userAllResources);
    const user = currentContext.context.pageContext.user;

    // const siteGroups = await sp.web.siteGroups();
    // console.log("siteGroups", siteGroups);

    // const graph = await getGraphFi();
    // const myGroups = await graph.me.memberOf();
    // const myTransitiveGroups = await graph.me.transitiveMemberOf(); 

    // console.log("myGroups", myGroups);
    // console.log("myTransitiveGroups", myTransitiveGroups); 

    setAuth({
      user: user,
      roles: userAllRoles,
      resources: userAllResources,
    });

    console.log("User Access Initialized...", userAllRoles, userAllResources);
    return userAllRoles as number[];
  };

  return [isAuthInitializing, initializeAuth] as const;
};

