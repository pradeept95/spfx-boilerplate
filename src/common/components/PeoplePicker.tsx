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
import { renderFieldDescription, renderFieldErrorMessage, renderFieldLabelWithHelp } from "./FormElement";

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

interface PeoplePickerProps extends IInputProps {
  label?: string;
  onRenderLabel?: IRenderFunction<ITextFieldProps>;
  peoplePickerType?: "Normal" | "Compact" | "List";
  principalTypes?: PrincipalType[];
  onPeopleSelectChange: (items: IPersonaProps[]) => any;
  defaultSelectedUsers?: IPersonaProps[];
  personSelectionLimit?: number;
  required?: boolean;
  resolveDelay?: number;
  placeholder?: string;
  errorMessage?: string;
  value?: any[];
  disabled?: boolean;
  description?: string;
  onRenderDescription?: IRenderFunction<ITextFieldProps>;
  showSecondaryText?: boolean;
}

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested People",
  mostRecentlyUsedHeaderText: "Suggested Contacts",
  noResultsFoundText: "No results found",
  loadingText: "Loading",
  showRemoveButtons: true,
  suggestionsAvailableAlertText: "People Picker Suggestions available",
  suggestionsContainerAriaLabel: "Suggested contacts",
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

export const PeoplePicker: React.FunctionComponent<PeoplePickerProps> = (
  props
) => {
  const { peoplePickerType, onPeopleSelectChange } = props;
  const picker = React.useRef(null);
  const peoplePickerId = useId("peoplePicker");
  const { searchUsers, ensureUser } = UserService();

  const [errorMessage, setErrorMessage] = React.useState("");

  const [selectedPeople, setSelectedPeople] = React.useState<IPersonaProps[]>(
    []
  );

  //check for default user
  React.useEffect(() => {
    if (props.defaultSelectedUsers?.length) {
      const newUserList = [...selectedPeople, ...props.defaultSelectedUsers];
      setSelectedPeople(newUserList);
      onUsersSelect(newUserList);
    }

  }, [props.defaultSelectedUsers]);

  //check for error message
  React.useEffect(() => {
    if (props.errorMessage?.length) {
      setErrorMessage(props?.errorMessage)
    }
  }, [props.errorMessage]);

  const onUsersSelect = async (peoples: IPersonaProps[]) => {
    try {
      for (let i = 0; i < peoples?.length; i++) {
        if (peoples?.[i] && !peoples?.[i]?.id) {
          const userDetails = await ensureUser(peoples?.[i]?.tertiaryText); 
          peoples[i].id = `${userDetails?.data?.Id}`;
        }
      }
      setSelectedPeople(peoples);
      onPeopleSelectChange(peoples);
    } catch (error) {
      setErrorMessage("Invalid Selection or User Account is not Active. Try Again!");

      setTimeout(() => {
        setErrorMessage("")
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

  const textFieldPros: ITextFieldProps = {
    label: props?.label,
    errorMessage: props?.errorMessage,
    description: props?.description,
    required: props?.required,
    disabled: props?.disabled,
  };

  const peoplePickerProps: IPeoplePickerProps = {
    key: peoplePickerId,
    ["aria-label"]: props?.label ?? "Select User",
    pickerSuggestionsProps: suggestionProps,
    selectionAriaLabel: "Selected Users",
    removeButtonAriaLabel: "Remove",
    className: "ms-PeoplePicker",
    inputProps: {
      ...(props as IInputProps),
      id: peoplePickerId,
      disabled: props?.disabled,
      placeholder: props?.placeholder ?? "",
      required: props?.required,
      className: mergeStyles([
        {
          marginTop: "0px",
        },
      ]),
    },
    componentRef: picker,
    resolveDelay: props?.resolveDelay ?? 300,
    itemLimit: props?.personSelectionLimit ?? 1,
    selectedItems: selectedPeople, //props?.defaultSelectedUsers ?? [],
    disabled: props?.disabled,

    onResolveSuggestions: (filterText) => searchUsers(filterText, selectedPeople), //onFilterChanged,
    onEmptyInputFocus: () => searchUsers("tha", selectedPeople), //returnMostRecentlyUsed,
    getTextFromItem: getTextFromItem,
    onRenderSuggestionsItem: onRenderSuggestionItem,
    onInputChange: onInputChange,
    onRenderItem: props?.showSecondaryText
      ? renderItemWithSecondaryText
      : undefined,
    onValidateInput: validateInput,
    onChange: onUsersSelect,
  };

  const compactPeopelPicker = (
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
      {props?.label && renderFieldLabelWithHelp(textFieldPros)}
      {peoplePickerType === "List"
        ? listPeoplePicker
        : peoplePickerType === "Normal"
          ? normalPeoplePicker
          : compactPeopelPicker}
      {props?.description && renderFieldDescription(textFieldPros)}
      {errorMessage ? renderFieldErrorMessage(errorMessage) : ""}
    </>
  );
};
