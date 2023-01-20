import { ISiteUserInfo } from "@pnp/sp/site-users";
import { ROLES } from "./auth.types";

export type AccessGroupUsers = { 
  [key in (keyof typeof ROLES)]: ISiteUserInfo[];
}
