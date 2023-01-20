/* eslint-disable */
import AppContext from "../config/app-context.config";

const currrentContext = AppContext.getInstance();
export const UserService = () => {
  (async () => {})();

  const verifyRoles = (role: number): boolean => {
    const currentUserRoles = currrentContext.currentUserRoles;
    return currentUserRoles?.indexOf(role) > -1;
  };

  return {
    verifyRoles,
  };
};
