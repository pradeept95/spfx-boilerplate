/* eslint-disable */
import AppContext from "@common/root/app-context";
 
const currentContext = AppContext.getInstance();
export const UserService = () => {
  (async () => {})();

  const verifyRoles = (role: number): boolean => {
    const currentUserRoles = currentContext.currentUserRoles;
    return currentUserRoles?.indexOf(role) > -1;
  };

  return {
    verifyRoles,
  };
};
