/* eslint-disable  */
import * as React from "react";
import { IPersonaProps, IPersonaStyles } from "@fluentui/react";
import {
  CompactPeoplePicker,
  IBasePickerSuggestionsProps,
  IInputProps,
  IPeoplePickerItemSelectedProps,
  IPeoplePickerProps,
  ListPeoplePicker,
  NormalPeoplePicker,
  PeoplePickerItem,
  PeoplePickerItemSuggestion,
  ValidationState,
} from "@fluentui/react/lib/Pickers";
import { UserService } from "@common/services/UserService";
import { debounceAsync } from "@prt-ts/debounce";
import { ErrorMessage, useField } from "formik";
import { 
  Body1Stronger,
  Field,
  FieldProps,
  LabelProps,
  tokens,
  useId,
} from "@fluentui/react-components";
import { InfoLabel, InfoLabelProps } from "@fluentui/react-components/unstable";
import { PeoplePickerProps, UserInfo } from "../PeoplePicker/PeoplePickerTypes";
import { mergeStyles } from "@fluentui/react";

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested People",
  mostRecentlyUsedHeaderText: "Suggested Contacts",
  noResultsFoundText: "No results found",
  loadingText: "Loading",
  showRemoveButtons: true,
  suggestionsAvailableAlertText: "People Picker Suggestions available",
  suggestionsContainerAriaLabel: "Suggested contacts",
};

function getTextFromItem(persona: IPersonaProps): string {
  return persona.text as string;
}

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
const debouncedSearchUser = debounceAsync(searchUsers, 300);

export const PeopleInput: React.FunctionComponent<
  Partial<
    PeoplePickerProps &
      InfoLabelProps &
      FieldProps & {
        peopleSize?: "small" | "medium" | "large";
        onChange?: (users: UserInfo[]) => void;
      }
  >
> = ({name, label, ...props}) => {
  const {  
    placeholder,
    personSelectionLimit,
    required = false,
    peoplePickerType = "Normal",
    pickerType = "user-only",
    userClassification = "internal",
  } = props;

  // Fluent UI specific config
  const { ...fieldsProps }: FieldProps = props;
  const { ...infoLabelProps }: InfoLabelProps = props;

  //formik specific config
  const [_, { value, touched, error }, { setValue, setTouched }] =
    useField(name);
  const hasError = React.useMemo(
    () => touched && error?.length > 0,
    [touched, error]
  );

  const picker = React.useRef(null);
  const inputId = useId("people-picker");

  const selectedPeople: IPersonaProps[] = React.useMemo(() => {
    return ((value || []) as UserInfo[])?.map((user) => {
      return {
        id: user.id.toString(),
        text: user.title,
        secondaryText: user.email,
        tertiaryText: user.username,
        optionalText: user.objectId,
        itemType: user.type,
      } as IPersonaProps;
    });
  }, [value]);

  const onUsersSelect = async (peoples: IPersonaProps[]): Promise<void> => {
    console.log(peoples);
    try {
      const users: UserInfo[] = [];
      for (let people of peoples) {
        if (!people.id) {
          const user = await ensureUser(people.tertiaryText);
          const userInfo: UserInfo = {
            id: user.Id,
            title: user.Title,
            email: user.Email,
            loginName: user.LoginName,
            username: people.tertiaryText,
            objectId: people.optionalText,
            type: people.itemType as "user" | "group",
          };
          users.push(userInfo);
        } else {
          const userInfo: UserInfo = {
            id: parseInt(people.id),
            title: people.text,
            email: people.secondaryText,
            loginName: people.tertiaryText,
            username: people.tertiaryText,
            objectId: people.optionalText,
            type: people.itemType as "user" | "group",
          };
          users.push(userInfo);
        }
      }

      setValue(users);
      props.onChange && props.onChange(users);
    } catch (error) {
      console.error(error);
    } finally {
      setTouched(true, true);
    }
  };

  const getStyle = React.useCallback((isErrorState: boolean) => {
    if (isErrorState) {
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
  }, []);

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

  const peoplePickerProps: IPeoplePickerProps = {
    key: props.key ?? name, 
    ["aria-label"]: label ?? "Select User",
    pickerSuggestionsProps: suggestionProps,
    selectionAriaLabel: "Selected Users",
    removeButtonAriaLabel: "Remove",
    className: "ms-PeoplePicker",
    inputProps: {
      ...(props as IInputProps),
      name: name,
      id: inputId,
      disabled: props?.disabled,
      placeholder: placeholder,
      required: false,
      className: mergeStyles([
        {
          marginTop: "0px",
          minHeight: "20px",
        },
      ]),
      onBlur: () => {
        setTouched(true, true);
      },
    },
    componentRef: picker,
    itemLimit: personSelectionLimit ?? 1,
    selectedItems: selectedPeople ?? [],
    disabled: props?.disabled,

    onResolveSuggestions: async (filterText) => {
      try {
        const result = await debouncedSearchUser(
          filterText,
          selectedPeople ?? [],
          pickerType,
          userClassification
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
    // eslint-disable-next-line react/jsx-no-bind
    onChange: (users: IPersonaProps[]) =>
      onUsersSelect(users as IPersonaProps[]),
  };

  return (
    <Field
      {...fieldsProps}
      label={
        {
          children: (_: unknown, props: LabelProps) => (
            <InfoLabel
              {...infoLabelProps} 
              htmlFor={inputId} 
            >
              <Body1Stronger>{label}</Body1Stronger>
            </InfoLabel>
          ),
        } as LabelProps
      }
      validationState={hasError ? "error" : undefined}
      validationMessage={hasError ? <ErrorMessage name={name} /> : undefined}
      required={required}
    >
      {(fieldProps) => {
        switch (peoplePickerType) {
          case "List":
            return (
              <ListPeoplePicker
                {...peoplePickerProps}
                inputProps={
                  {
                    ...peoplePickerProps.inputProps,
                    ...fieldProps,
                  } as IInputProps
                }
                styles={getStyle(!!fieldProps["aria-invalid"])}
              />
            );
          case "Compact":
            return (
              <CompactPeoplePicker
                {...peoplePickerProps}
                inputProps={
                  {
                    ...peoplePickerProps.inputProps,
                    ...fieldProps,
                  } as IInputProps
                }
                styles={getStyle(!!fieldProps["aria-invalid"])}
              />
            );
          case "Normal":
          default:
            return (
              <NormalPeoplePicker
                {...peoplePickerProps}
                inputProps={
                  {
                    ...peoplePickerProps.inputProps,
                    ...fieldProps,
                  } as IInputProps
                }
                styles={getStyle(!!fieldProps["aria-invalid"])}
              />
            );
        }
      }}
    </Field>
  );
};
