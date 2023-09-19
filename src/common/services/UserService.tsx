/* eslint-disable */
import { getGraphFi, getSP } from "@common/pnp";
import "@pnp/graph/users";
import "@pnp/sp/profiles";
import { IPersonaProps } from "@fluentui/react";
import { IWebEnsureUserResult } from "@pnp/sp/site-users";
import { IPagedResult } from "@pnp/graph";

export const UserService = () => {
  (async () => {})();

  async function searchUsers(
    usernameOrEmailOrName: string,
    excludedUsers: IPersonaProps[] = [],
    orgUserType: "user-only" | "group-only" | "user-and-group" = "user-only",
    userClassification: "internal" | "external" | "all" = "internal",
  ): Promise<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>(async (resolve, reject) => {
      try {
        if (!usernameOrEmailOrName) return [];

        const userName = usernameOrEmailOrName?.toLocaleLowerCase();
        const graphi = await getGraphFi();
        // pradeep.thapaliya@nih.gov -- email
        // thapaliaypr ---------------- username
        // thapaliya  ----------------- different variation of names:
        // pradeep
        // pradeep thapaliya
        // thapaliya pradeep
        // thapaliya, pradeep

        let users: IPagedResult = {
          value: [],
        } as IPagedResult;

        let groups: IPagedResult = {
          value: [],
        } as IPagedResult;

        const filterString = userClassification == "internal"
          ? `endswith(mail, 'nih.gov')`
          : "";

        if (orgUserType == "user-and-group" || orgUserType == "user-only") {
          users = await graphi.users
            .top(10 + excludedUsers?.length)
            .search(
              `
            "displayName:${encodeURIComponent(userName)}" 
             OR "mail:${encodeURIComponent(userName)}" 
             OR "userPrincipalName:${encodeURIComponent(userName)}" 
            `
            )
            .filter(filterString)
            .paged();
        }

        if (orgUserType == "user-and-group" || orgUserType == "group-only") {
          groups = await graphi.groups
            .top(10 + excludedUsers?.length)
            .search(
              `
            "displayName:${encodeURIComponent(userName)}"
             OR "mail:${encodeURIComponent(userName)}"
             OR "mailNickname:${encodeURIComponent(userName)}"
            `
            )
            .filter(filterString)
            .paged();
        }

        const selectedUserEmails = excludedUsers?.map((x) => x.secondaryText);
        const allGroupAndUser = [
          ...users?.value?.map((user) => {
            {
              return {
                //id: user.Id, // don't use id, react will complain -- instead use optionalText
                text: user.displayName,
                secondaryText: user.mail,
                tertiaryText: user.userPrincipalName,
                optionalText: user.id,
                itemType: "user",
              } as IPersonaProps;
            }
          }),
          ...groups?.value?.map((user) => {
            {
              return {
                //id: user.Id, // don't use id, react will complain -- instead use optionalText
                text: user.displayName,
                secondaryText: user.mail,
                tertiaryText: user.mailNickname,
                optionalText: user.id,
                itemType: "group",
              } as IPersonaProps;
            }
          }),
        ];

        const mappedUsers = allGroupAndUser.filter(
          (user) => selectedUserEmails?.indexOf(user.secondaryText) === -1
        );
        resolve(mappedUsers);
      } catch (error) {
        reject(error);
      }
    });
  }

  const getCurrentUserGroups = async (): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const sp = await getSP();
        const groups = await sp.web.currentUser.groups();
        resolve(groups);
      } catch (error) {
        reject(error);
      }
    });
  };

  const ensureUser = async (userPrincipalName: string): Promise<SiteUser> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const sp = await getSP();
        const result: IWebEnsureUserResult = await sp.web.ensureUser(
          `i:0#.f|membership|${userPrincipalName}`
        );

        console.log(result);

        const siteUser: SiteUser = {
          Id: result.data.Id,
          Title: result.data.Title,
          Email: result.data.Email,
          LoginName: result.data.LoginName,
          Username: ((result.data as any)?.UserPrincipalName || "").replace("@nih.gov", ""),
          UserPrincipalName: (result.data as any)?.UserPrincipalName,
        } as SiteUser; 

        resolve(siteUser);
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

  const mapUserFromSPList = async (user: any): Promise<IPersonaProps[]> => {
    return new Promise((resolve, reject) => {
      try {
        const mappedUser = {
          text: user.DisplayName,
          secondaryText: user.EMail,
          tertiaryText: user.Username,
        } as IPersonaProps;
        resolve([mappedUser]);
      } catch (error) {
        reject(error);
      }
    });
  };

  const mapUsersFromSPList = async (users: any[]): Promise<IPersonaProps[]> => {
    let mappedUsers: IPersonaProps[] = [];
    return new Promise((resolve, reject) => {
      try {
        users?.map((user) => {
          mappedUsers.push({
            text: user?.DisplayName,
            secondaryText: user?.EMail,
            tertiaryText: user?.Username,
          } as IPersonaProps);
        });

        resolve(mappedUsers);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    searchUsers,
    getCurrentUserGroups,
    ensureUser,
    getUserProfile,
    mapUserFromSPList,
    mapUsersFromSPList,
  };
};

export type SiteUser = {
  Id: number;
  Title: string;
  Email: string;
  Username: string;
  LoginName: string;
  UserPrincipalName: string;
};

