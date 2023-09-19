/* eslint-disable */
import AppContext from "@common/root/app-context";
import { useState } from "react"; 

const currentContext = AppContext.getInstance();

export function useVerifyUserRoles() {
  const [hasRoles, setHasRoles] = useState(false);

  const verifyRoles = (requiredRoles: number[], requiredAll?: boolean) => {
    const userRoles = currentContext.currentUserRoles;
    const isAccessAllowed = !requiredAll
      ? userRoles?.some((role: number) => requiredRoles?.indexOf(role) > -1)
      : userRoles?.every((role: number) => requiredRoles?.indexOf(role) > -1);

    // set allowed roles
    setHasRoles(isAccessAllowed);
  };

  return [hasRoles, verifyRoles] as const;
}

export function useVerifyResourceAccess() {
  const [hasAccess, setHasResourceAccess] = useState(false);

  const verifyAccess = (currentResources: string[], requiredAll?: boolean) => {
    const isAccessAllowed = confirmAccess(currentResources, requiredAll);
    // set allowed access
    setHasResourceAccess(isAccessAllowed);
  };

  return [hasAccess, verifyAccess] as const;
}

export const confirmAccess = (
  currentResources: string[],
  requiredAll: boolean = false
): boolean => {
  const userResources = currentContext.currentUserResourceAccess;

  const cResources = currentResources?.map((x) => x.toLowerCase());
  const allResources = userResources?.map((x) => x.toLowerCase());

  const isAccessAllowed = !requiredAll
    ? allResources?.some(
        (resource: string) => cResources?.indexOf(resource?.toLowerCase()) > -1
      )
    : allResources?.every(
        (resource: string) => cResources?.indexOf(resource?.toLowerCase()) > -1
      );

  return isAccessAllowed;
};
