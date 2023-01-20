/* eslint-disable */
export type UserAccess = {
  user: any;
  roles: number[];
} 

// this is the key value pair of Sharepoint User Group
// Key : RoleName -- choose yourself
// Value : SP Group ID -- get it from sharepoint user group context
export const ROLES = {
  User: 4,
  Member: 5, 
  Admin: 3,
  SomeOtherRole: 3,
  SomeOtherRole1: 4,
}; 
