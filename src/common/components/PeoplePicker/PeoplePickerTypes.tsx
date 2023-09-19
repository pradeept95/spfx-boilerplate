/* eslint-disable */
import { IInputProps, IPeoplePickerProps } from "@fluentui/react";

 

export type UserInfo = {
  id: number;
  title: string;
  email?: string;
  loginName?: string;
  username?: string;
  objectId?: string;
  type?: "user" | "group";
};

// export type PeoplePickerRefType = {
//   pickerRef: React.MutableRefObject<any>;
//   selectedPeople: UserInfo[];
//   resetPeoplePicker: () => Promise<void>;
//   setDefaultUsers: (defaultUsers: UserInfo[]) => Promise<void>;
// };

export type PeoplePickerProps = {
  label?: string;
  peoplePickerType?: "Normal" | "Compact" | "List";
  onPeopleSelectChange: (items: UserInfo[]) => void;
  defaultSelectedUsers?: UserInfo[];
  personSelectionLimit?: number;
  pickerType?: "user-only" | "group-only" | "user-and-group";
  userClassification?: "internal" | "external" | "all";
  showSecondaryText?: boolean;
  invalid?: boolean;
  onError: (errorMessage: string) => void;
} & IInputProps &
  IPeoplePickerProps;
