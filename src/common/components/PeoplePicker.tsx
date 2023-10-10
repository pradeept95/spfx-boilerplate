/* eslint-disable */
import * as React from "react";
import { IPersonaProps, IPersonaStyles } from "@fluentui/react/lib/Persona";
import {
  IBasePickerSuggestionsProps,
  ListPeoplePicker,
  ValidationState,
  PeoplePickerItemSuggestion,
  CompactPeoplePicker,
  NormalPeoplePicker,
  IPeoplePickerItemSelectedProps,
  PeoplePickerItem,
  IPeoplePickerProps,
  IInputProps,
} from "@fluentui/react/lib/Pickers";
import { useId } from "@fluentui/react-hooks";
import { IRenderFunction, ITextFieldProps, mergeStyles } from "@fluentui/react";
import { UserService } from "../services/UserService";  
import { tokens } from "@fluentui/react-components";
import { debounceAsync } from "@prt-ts/debounce";

export enum PrincipalType {
  User = 1,
  DistributionList = 2,
  SecurityGroup = 4,
  SharePointGroup = 8,
}

export enum OrgUserType {
  InternalAndExternal = "InternalAndExternal",
  ExternalOnly = "ExternalOnly",
  InternalOnly = "InternalOnly",
}

export type PeoplePickerRefType = {
  pickerRef: React.MutableRefObject<any>;
  selectedPeople: IPersonaProps[];
  resetPeoplePicker: () => Promise<void>;
  setDefaultUsers: (defaultUsers: IPersonaProps[]) => Promise<void>;
};

export interface PeoplePickerProps extends IInputProps {
  label?: string;
  onRenderLabel?: IRenderFunction<ITextFieldProps>;
  peoplePickerType?: "Normal" | "Compact" | "List";
  principalTypes?: PrincipalType[];
  onPeopleSelectChange: (items: IPersonaProps[]) => any;
  defaultSelectedUsers?: IPersonaProps[];
  personSelectionLimit?: number;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
  invalid?: boolean;
  value?: any[];
  disabled?: boolean;
  description?: string;
  orgUserType?: "user-only" | "group-only" | "user-and-group";
  internalUsersOnly?: boolean;
  onRenderDescription?: IRenderFunction<ITextFieldProps>;
  showSecondaryText?: boolean;
}

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Select User",
  mostRecentlyUsedHeaderText: "Select User",
  noResultsFoundText: "No results found",
  loadingText: "Loading",
  showRemoveButtons: true,
  suggestionsAvailableAlertText: "People Picker Suggestions available",
  suggestionsContainerAriaLabel: "Select User",
};

const personaStyles: Partial<IPersonaStyles> = {
  root: {
    height: "auto",
  },
  secondaryText: {
    height: "auto",
    whiteSpace: "normal",
  },
  primaryText: {
    height: "auto",
    whiteSpace: "normal",
  },
};

function getTextFromItem(persona: IPersonaProps): string {
  return (persona.text as string) || (persona.secondaryText as string);
}

function validateInput(input: string): ValidationState {
  if (input.indexOf("@") !== -1) {
    return ValidationState.valid;
  } else if (input.length > 1) {
    return ValidationState.warning;
  } else {
    return ValidationState.invalid;
  }
}

const { searchUsers, ensureUser } = UserService(); 
const debouncedSearchUser = debounceAsync(searchUsers, 400);

export const PeoplePicker = React.forwardRef<
  PeoplePickerRefType,
  PeoplePickerProps
>(({ orgUserType = "user-only", ...props }, ref) => {
  const { peoplePickerType, onPeopleSelectChange, internalUsersOnly = true } = props;
  const pickerRef = React.useRef(null);
  const peoplePickerId = useId("peoplePicker");

  const [errorMessage, setErrorMessage] = React.useState("");
  const [selectedPeople, setSelectedPeople] = React.useState<IPersonaProps[]>(
    []
  );

  const resetPeoplePicker = async () => {
    setSelectedPeople([]);
    setErrorMessage("");
    onUsersSelect([]);
  };

  const setDefaultUsers = async (defaultUsers: IPersonaProps[]) => {
    const newUserList = [...defaultUsers];
    setSelectedPeople(newUserList);
    onUsersSelect(newUserList);
  };

  React.useImperativeHandle(ref, () => ({
    pickerRef,
    setDefaultUsers,
    resetPeoplePicker,
    selectedPeople,
  }));

  //check for default user
  React.useEffect(() => {
    if (props.defaultSelectedUsers?.length) {
      setDefaultUsers(props.defaultSelectedUsers);
    }
  }, [props.defaultSelectedUsers]);

  //check for error message
  React.useEffect(() => {
    if (props.errorMessage?.length) {
      setErrorMessage(props?.errorMessage);
    }
  }, [props.errorMessage]);

  const onUsersSelect = async (peoples: IPersonaProps[]) => {
    try {
      for (let i = 0; i < peoples?.length; i++) {
        if (peoples?.[i] && !peoples?.[i]?.id) {
          const userDetails = await ensureUser(peoples?.[i]?.tertiaryText);
          peoples[i].id = `${userDetails?.Id}`;
          // peoples[i].tertiaryText = userDetails?.data?.LoginName;
        }
      }
      setSelectedPeople(peoples);
      onPeopleSelectChange(peoples);
    } catch (error) {
      setErrorMessage(
        "Invalid Selection or User Account is not Active. Try Again!"
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  const onRenderSuggestionItem = (
    personaProps: IPersonaProps,
    suggestionsProps: IBasePickerSuggestionsProps
  ) => {
    return (
      <PeoplePickerItemSuggestion
        personaProps={{ ...personaProps, styles: personaStyles }}
        suggestionsProps={suggestionsProps}
      />
    );
  };

  const onInputChange = (input: string): string => {
    const outlookRegEx = /<.*>/g;
    const emailAddress = outlookRegEx.exec(input);

    if (emailAddress && emailAddress[0]) {
      return emailAddress[0].substring(1, emailAddress[0].length - 1);
    }

    setErrorMessage("");
    return input;
  };

  const renderItemWithSecondaryText = (
    props: IPeoplePickerItemSelectedProps
  ) => {
    const newProps = {
      ...props,
      item: {
        ...props.item,
        ValidationState: ValidationState.valid,
        showSecondaryText: true,
      },
    };

    return <PeoplePickerItem {...newProps} />;
  };

  const getStyle = React.useCallback(() => {
    if (props.invalid || errorMessage?.length > 0) {
      return {
        text: {
          border: "1px solid " + tokens.colorPaletteRedBorder2,
          "min-height": "20px",
          "border-radius": tokens.borderRadiusMedium,

          ":hover": {
            "border-bottom-color": tokens.colorNeutralStrokeAccessible,
            "border-style": "solid",
            "border-bottom-width": tokens.strokeWidthThin,
            "border-left-color": tokens.colorNeutralStroke1,
            "border-top-color": tokens.colorNeutralStroke1,
            "border-right-color": tokens.colorNeutralStroke1,
            "border-radius": tokens.borderRadiusMedium,
          },
          ":after": {
            "border-bottom-color": tokens.colorCompoundBrandStroke,
            "border-left-color": tokens.colorNeutralStroke1,
            "border-right-color": tokens.colorNeutralStroke1,
            "border-top-color": tokens.colorNeutralStroke1,
            "border-bottom-style": "solid",
            "border-bottom-width": tokens.strokeWidthThick,
            "border-left-width": 0,
            "border-right-width": 0,
            "border-top-width": 0,
            "outline-color:": "transparent",
            "outline-style": "solid",
            "outline-width": 0,
          },
        },
      };
    } else {
      return {
        text: {
          "border-bottom-color": tokens.colorNeutralStrokeAccessible,
          "border-style": "solid",
          "border-bottom-width": tokens.strokeWidthThin,
          "border-left-color": tokens.colorNeutralStroke1,
          "border-top-color": tokens.colorNeutralStroke1,
          "border-right-color": tokens.colorNeutralStroke1,
          "border-radius": tokens.borderRadiusMedium,
          "min-height": "20px",

          ":hover": {
            "border-bottom-color": tokens.colorNeutralStrokeAccessible,
            "border-style": "solid",
            "border-bottom-width": tokens.strokeWidthThin,
            "border-left-color": tokens.colorNeutralStroke1,
            "border-top-color": tokens.colorNeutralStroke1,
            "border-right-color": tokens.colorNeutralStroke1,
            "border-radius": tokens.borderRadiusMedium,
          },
          ":after": {
            "border-bottom-color": tokens.colorCompoundBrandStroke,
            "border-left-color": tokens.colorNeutralStroke1,
            "border-right-color": tokens.colorNeutralStroke1,
            "border-top-color": tokens.colorNeutralStroke1,
            "border-bottom-style": "solid",
            "border-bottom-width": tokens.strokeWidthThick,
            "border-left-width": 0,
            "border-right-width": 0,
            "border-top-width": 0,
            "outline-color:": "transparent",
            "outline-style": "solid",
            "outline-width": 0,
          },
        },
      };
    }
  }, [props.invalid, errorMessage]);

  // const textFieldPros: ITextFieldProps = {
  //   label: props?.label,
  //   errorMessage: props?.errorMessage,
  //   description: props?.description,
  //   required: props?.required,
  //   disabled: props?.disabled,
  // };

  const peoplePickerProps: IPeoplePickerProps = {
    key: peoplePickerId,
    ["aria-label"]: props?.label ?? "Select User",
    pickerSuggestionsProps: suggestionProps,
    selectionAriaLabel: "Selected Users",
    removeButtonAriaLabel: "Remove",
    className: "ms-PeoplePicker",
    inputProps: {
      ...(props as IInputProps),
      name: props.name,
      id: peoplePickerId,
      disabled: props?.disabled,
      placeholder: props?.placeholder ?? "Search User(s)",
      required: false,
      className: mergeStyles([
        {
          marginTop: "0px",
          minHeight: "20px",
        },
      ]),
    },
    styles: getStyle(),

    componentRef: pickerRef,
    itemLimit: props?.personSelectionLimit ?? 1,
    selectedItems: selectedPeople, //props?.defaultSelectedUsers ?? [],
    disabled: props?.disabled,

    onResolveSuggestions: async (filterText) => {
      try {
        const result = await debouncedSearchUser(
          filterText,
          selectedPeople,
          orgUserType,
          internalUsersOnly  == true ? "internal" : "all"
        );
        return result;
      } catch (error) {
        return [];
      }
    },
    getTextFromItem: getTextFromItem,
    onRenderSuggestionsItem: onRenderSuggestionItem,
    onInputChange: onInputChange,
    onRenderItem: props?.showSecondaryText
      ? renderItemWithSecondaryText
      : undefined,
    onValidateInput: validateInput,
    onChange: onUsersSelect,
  };

  const compactPeoplePicker = (
    <>
      <CompactPeoplePicker {...peoplePickerProps} />
    </>
  );

  const listPeoplePicker = (
    <>
      <ListPeoplePicker {...peoplePickerProps} />
    </>
  );

  const normalPeoplePicker = (
    <>
      <NormalPeoplePicker {...peoplePickerProps} />
    </>
  );

  return (
    <>
      {/* {props?.label && renderFieldLabelWithHelp(textFieldPros)} */}
      {peoplePickerType === "List"
        ? listPeoplePicker
        : peoplePickerType === "Normal"
        ? normalPeoplePicker
        : compactPeoplePicker}
      {/* {props?.description && renderFieldDescription(textFieldPros)}
      {errorMessage ? renderFieldErrorMessage(errorMessage) : ""} */}
    </>
  );
});
