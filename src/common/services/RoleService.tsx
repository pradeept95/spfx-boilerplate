/* eslint-disable */
// import { onlyUnique } from "../components/FluentUIDataGrid/src/helpers/FilterHelper";
// import { getSP } from "@common/pnp";

export const RoleService = () => {
  (async () => {})();

  async function getResourcesForCurrentUser(
    currentUserRoles: number[]
  ): Promise<string[]> {
    return new Promise<string[]>(async (resolve, reject) => {
      try {
        // const sp = await getSP();

        // const userRoleResources = await sp.web.lists
        //   .getByTitle("mynindsRolesAccess")
        //   .select("ID, Title, SPSecurityGroupID, Resources")
        //   .items();

        // const resources = userRoleResources
        //   ?.filter(
        //     (r) =>
        //       currentUserRoles.indexOf(r.SPSecurityGroupID) > -1 && r.Resources
        //   )
        //   ?.map((r) => JSON.parse(r.Resources) as string[])
        //   ?.reduce((a, b) => a.concat(b), [])
        //   ?.filter(onlyUnique);

        // resolve(resources);
        resolve([]);
      } catch (error) {
        reject(error);
      }
    });
  }

  async function getAllRoleAndResources(): Promise<string[]> {
    return new Promise<string[]>(async (resolve, reject) => {
      try {
        // const sp = await getSP();

        // const allRoleResources = await sp.web.lists
        //   .getByTitle("mynindsRolesAccess")
        //   .select("ID, Title, SPSecurityGroupID, Resources")
        //   .items();

        // resolve(allRoleResources);
        resolve([]);
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    getResourcesForCurrentUser,
    getAllRoleAndResources,
  };
};
