/* eslint-disable */
import * as React from "react";
import { getSP } from "@common/pnp";
import { useAuthContext } from "./AuthContext";
import { RoleService } from "../services/RoleService";
import AppContext from "@common/root/app-context";
import { ROLES } from "./AuthType";
// import { AccessGroupUsers } from "../types/access-group.type";
// import { ROLES } from "../types/auth.types";

const currentContext = AppContext.getInstance();
const { getResourcesForCurrentUser } = RoleService();

export const useAuthInitialization = () => {
  const { setAuth } = useAuthContext();
  // const currentUser = currentContext.context.pageContext.user;
  const [isAuthInitializing, setIsAuthInitializing] =
    React.useState<boolean>(true);

  const initializeAuth = async () => {
    await getAllRolesForCurrentUserAndInitialize();
    setIsAuthInitializing(false);
  };

  const getAllRolesForCurrentUserAndInitialize = async (): Promise<
    number[]
  > => {
    try {
      const sp = await getSP();
      const groups = await sp.web.currentUser.groups();
      const userAllRoles = [...groups.map((group) => group.Id)];
      const userAllResources = await getResourcesForCurrentUser(userAllRoles);

      currentContext.setCurrentUserRoles(userAllRoles);
      currentContext.setCurrentUserResources(userAllResources);
      const user = currentContext.context.pageContext.user;

      setAuth({
        user: user,
        roles: userAllRoles,
        resources: userAllResources,
      });

      console.log("User Access Initialized...", userAllRoles, userAllResources);
      return userAllRoles as number[];
    } catch (error) {
      console.log(error);
      setAuth({
        user: null,
        roles: [ROLES.Admin],
        resources: [],
      });
    }
  };

  return [isAuthInitializing, initializeAuth] as const;
};
