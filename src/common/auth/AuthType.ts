import { ISiteUserInfo } from "@pnp/sp/site-users";

/* eslint-disable */
export type UserAccess = {
  user: any;
  roles: number[];
};

// this is the key value pair of Sharepoint User Group
// Key : RoleName -- choose yourself
// Value : SP Group ID -- get it from sharepoint user group context
export const ROLES = {
  User: 4,
  Member: 5,
  Admin: 3,
  // Reviewers: 3
};

export type AppResource = {
  key: string;
  name: string;
  isGroup?: boolean;
  children?: AppResource[];
};

export type AccessGroupUsers = {
  [key in keyof typeof ROLES]: ISiteUserInfo[];
};

export type ResourceType = {
  requiredResources: string[];
  requiredAll?: boolean;
  renderNoAccess?: JSX.Element;
  additionalItemAccessContext?: string[];
};

export type RouteRoleType = {
  requiredRoles: number[];
  requiredAll?: boolean;
  additionalItemAccessContext?: number[];
};
