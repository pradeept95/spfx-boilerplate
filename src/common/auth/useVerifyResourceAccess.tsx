/* eslint-disable */
import AppContext from "@common/root/app-context";
import { useState } from "react"; 

const currentContext = AppContext.getInstance();

export function useVerifyUserRoles(additionalItemAccessContext: number[]) {
  const [hasRoles, setHasRoles] = useState(false);

  const verifyRoles = (requiredRoles: number[], requiredAll?: boolean) => {
    const userRoles = [
      ...currentContext.currentUserRoles,
      ...additionalItemAccessContext,
    ];
    const isAccessAllowed = !requiredAll
      ? userRoles?.some((role: number) => requiredRoles?.indexOf(role) > -1)
      : userRoles?.every((role: number) => requiredRoles?.indexOf(role) > -1);

    // set allowed roles
    setHasRoles(isAccessAllowed);
  };

  return [hasRoles, verifyRoles] as const;
}

export function useVerifyResourceAccess(additionalItemAccessContext: string[] = []) {
  const [hasAccess, setHasResourceAccess] = useState(false);

  const verifyAccess = (requiredResources: string[], requiredAll?: boolean) => {
    const isAccessAllowed = confirmAccess(
      requiredResources,
      requiredAll,
      additionalItemAccessContext
    );
    // set allowed access
    setHasResourceAccess(isAccessAllowed);
  };

  return [hasAccess, verifyAccess] as const;
}

export const confirmAccess = (
  requiredResources: string[],
  requiredAll: boolean = false,
  additionalItemAccessContext: string[] = []
): boolean => {
  const userResources = currentContext.currentUserResourceAccess;

  const rResources = requiredResources?.map((x) => x.toLowerCase());
  const currentUserResources = [...userResources, ...additionalItemAccessContext]?.map(
    (x) => x.toLowerCase()
  );

  const isAccessAllowed = !requiredAll
    ? currentUserResources?.some(
        (resource: string) => rResources?.indexOf(resource?.toLowerCase()) > -1
      )
    : currentUserResources?.every(
        (resource: string) => rResources?.indexOf(resource?.toLowerCase()) > -1
      );

  return isAccessAllowed;
};
