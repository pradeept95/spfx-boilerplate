/* eslint-disable */
import { useState } from "react";
import { getGraphFi, getSP } from "../config/pnpjs.config";
import "@pnp/graph/users";
import "@pnp/sp/profiles";
import { IPersonaProps } from "@fluentui/react";
import { IWebEnsureUserResult } from "@pnp/sp/site-users";

export function useGetADUsers(): [
  boolean,
  IPersonaProps[],
  (
    usernameOrEmailOrName?: string,
    selectedUsers?: IPersonaProps[]
  ) => IPersonaProps[] | Promise<IPersonaProps[]>
] {
  const [loading, setLoading] = useState<boolean>(false);
  const [adUsers, setADUsers] = useState<any[]>([]);

  async function searchUsers(
    usernameOrEmailOrName: string,
    selectedUsers: IPersonaProps[] = []
  ): Promise<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>(async (resolve, reject) => {
      try {
        if (!usernameOrEmailOrName) return [];

        const userName = usernameOrEmailOrName?.toLocaleLowerCase();

        setLoading(true);
        const graphi = await getGraphFi();
        const users = await graphi.users
          .top(10 + selectedUsers?.length)
          .filter(
            `(startswith('${encodeURIComponent(userName)}', displayName) ` + 
            ` or startswith('${encodeURIComponent(userName)}', mail) ` +
            ` or startswith('${encodeURIComponent(userName)}', userPrincipalName) ` +
            ` or startswith('${encodeURIComponent(userName)}', surname) ` +
            ` or startswith('${encodeURIComponent(userName)}', givenName)) ` +
            ` and endswith(mail, 'nih.gov')`
          )
          .paged();

        const selecteUserEmails = selectedUsers?.map((x) => x.secondaryText);

        const mappedUsers = users?.value
          ?.map((user) => {
            {
              return {
                text: user.displayName,
                secondaryText: user.mail,
                tertiaryText: user.userPrincipalName,
              } as IPersonaProps;
            }
          })
          .filter(
            (user) => selecteUserEmails?.indexOf(user.secondaryText) === -1
          );

        setADUsers(mappedUsers);

        resolve(adUsers);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    });
  }

  return [loading, adUsers, searchUsers];
}

// export function useGetADSuggestedUsers(): [
//   boolean,
//   IPersonaProps[],
//   (
//     selectedUsers?: IPersonaProps[]
//   ) => IPersonaProps[] | Promise<IPersonaProps[]>
// ] {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [suggestedADUsers, setADUsers] = useState<any[]>([]);

//   async function searchUsers(
//     selectedUsers?: IPersonaProps[]
//   ): Promise<IPersonaProps[]> {
//     return new Promise<IPersonaProps[]>(async (resolve, reject) => {
//       try {
//         setLoading(true);
//         const graphi = await getGraphFi();

//         const selecteUserEmails = selectedUsers?.map((x) => x.secondaryText);
//         const mappedUsers =
//           suggestedADUsers?.length === 0
//             ? (
//                 await graphi.users
//                   .top(10)
//                   // .filter(
//                   //   `startswith(displayName, 'a') and endswith(mail, 'nih.gov')`
//                   // )
//                   .paged()
//               )?.value?.map((user) => {
//                 {
//                   return {
//                     text: user.displayName,
//                     secondaryText: user.mail,
//                     tertiaryText: user.userPrincipalName,
//                   } as IPersonaProps;
//                 }
//               })
//             : suggestedADUsers;

//         const notSelectedSuggestions = mappedUsers.filter(
//           (user) => selecteUserEmails?.indexOf(user.secondaryText) === -1
//         );
//         setADUsers(notSelectedSuggestions);
//         resolve(notSelectedSuggestions);
//       } catch (error) {
//         reject(error);
//       } finally {
//         setLoading(false);
//       }
//     });
//   }
//   return [loading, suggestedADUsers, searchUsers];
// }

export const UserAccessService = () => {
  (async () => {})();

  async function searchUsers(
    usernameOrEmailOrName: string,
    selectedUsers: IPersonaProps[] = []
  ): Promise<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>(async (resolve, reject) => {
      try {
        if (!usernameOrEmailOrName) return [];

        const userName = usernameOrEmailOrName?.toLocaleLowerCase();
        const graphi = await getGraphFi();
        const users = await graphi.users
          .top(10 + selectedUsers?.length)
          .filter(
            `(startswith('${encodeURIComponent(userName)}', displayName) ` +
              ` or startswith('${encodeURIComponent(userName)}', mail) ` +
              ` or startswith('${encodeURIComponent(
                userName
              )}', userPrincipalName) ` +
              ` or startswith('${encodeURIComponent(userName)}', surname) ` +
              ` or startswith('${encodeURIComponent(userName)}', givenName)) ` +
              ` and endswith(mail, 'nih.gov')`
          )
          .paged();

        const selecteUserEmails = selectedUsers?.map((x) => x.secondaryText);

        const mappedUsers = users?.value
          ?.map((user) => {
            {
              return {
                text: user.displayName,
                secondaryText: user.mail,
                tertiaryText: user.userPrincipalName,
              } as IPersonaProps;
            }
          })
          .filter(
            (user) => selecteUserEmails?.indexOf(user.secondaryText) === -1
          ); 
        resolve(mappedUsers);
      } catch (error) {
        reject(error)
      }
    });
  }

  const ensureUser = async (
    userPrincipalName: string
  ): Promise<IWebEnsureUserResult> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const sp = await getSP();
        const result: IWebEnsureUserResult = await sp.web.ensureUser(
          `i:0#.f|membership|${userPrincipalName}`
        );
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUserProfile = async (userPrincipalName: string): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const sp = await getSP();
        const profile = await sp.profiles.getPropertiesFor(
          `i:0#.f|membership|${userPrincipalName}`
        );
        resolve(profile);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    searchUsers,
    ensureUser,
    getUserProfile,
  };
};
