/* eslint-disable */
import * as React from "react";
import { RichTextEditor } from "@common/components/RichTextEditor";
import { useEmailTemplateFormStyles } from "./useEmailTemplateFormStyles";
import { IFormCustomizerExampleProps } from "src/extensions/formCustomizerExample/components/FormCustomizerExample";
import { useEmailTemplateForm } from "./useEmailTemplateForm";
import { Button, Field, Input } from "@fluentui/react-components";
import { CompactPeoplePicker, IBasePickerSuggestionsProps, IPersonaProps, ValidationState } from "@fluentui/react";
import { UserService } from "@common/services/UserService";
import { debounceAsync } from "@prt-ts/debounce";

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested People",
  mostRecentlyUsedHeaderText: "Suggested Contacts",
  noResultsFoundText: "No results found",
  loadingText: "Loading",
  showRemoveButtons: true,
  suggestionsAvailableAlertText: "People Picker Suggestions available",
  suggestionsContainerAriaLabel: "Suggested contacts",
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

function getTextFromItem(persona: IPersonaProps): string {
  return persona.text as string;
}

const { searchUsers } = UserService();
const debouncedSearchUser = debounceAsync(searchUsers, 400); 

 
export const EmailTemplateForm = (props: IFormCustomizerExampleProps) => { 
    
    const {
      currentItem,
      onSubmit,
      register,
      handleSubmit,
      setValue,
      watch,
      errors,
      isSubmitting,
      formName,
  } = useEmailTemplateForm(props); 
    
  const classes = useEmailTemplateFormStyles();   

  return (
    <div className={classes.root}>
      <h1>{formName}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          label="Title"
          validationState={errors.Title ? "error" : undefined}
          validationMessage={errors.Title?.message}
        >
          <Input defaultValue={currentItem.Title} {...register("Title")} />
        </Field>
        <Field
          label="Subject"
          validationState={errors.Subject ? "error" : undefined}
          validationMessage={errors.Subject?.message}
        >
          <Input defaultValue={currentItem.Subject} {...register("Subject")} />
        </Field>
        <Field
          label="Template Key"
          validationState={errors.TemplateKey ? "error" : undefined}
          validationMessage={errors.TemplateKey?.message}
        >
          <Input
            defaultValue={currentItem.TemplateKey}
            {...register("TemplateKey")}
          />
        </Field>
        <Field
          label="Email Body Template"
          validationState={errors.Body ? "error" : undefined}
          validationMessage={errors.Body?.message}
        >
          {(fieldProps) => (
            <RichTextEditor 
              value={watch("Body")}
              onChange={(value) => setValue("Body", value)}
              {...fieldProps}
            />
          )}
        </Field>

        <Field
          label="Email Body Template"
          validationState={errors.Body ? "error" : undefined}
          validationMessage={errors.Body?.message}
        >
          {(fieldProps) => (
            <CompactPeoplePicker
              // eslint-disable-next-line react/jsx-no-bind
              onResolveSuggestions={async (filterText) => {
                try {
                  const result = await debouncedSearchUser(
                    filterText,
                    [],
                    "user-and-group",
                    "internal"
                  );
                  return result;
                } catch (error) {
                  return [];
                }
              }}
              // eslint-disable-next-line react/jsx-no-bind
              //onEmptyInputFocus={returnMostRecentlyUsed}
              getTextFromItem={getTextFromItem}
              className={"ms-PeoplePicker"}
              defaultSelectedItems={[]}
              key={"list"}
              selectionAriaLabel={"Selected contacts"}
              removeButtonAriaLabel={"Remove"}
              pickerSuggestionsProps={suggestionProps}
              // eslint-disable-next-line react/jsx-no-bind
              //onRemoveSuggestion={onRemoveSuggestion}
              onValidateInput={validateInput}
              inputProps={{
                onBlur: (ev: React.FocusEvent<HTMLInputElement>) =>
                  console.log("onBlur called"),
                onFocus: (ev: React.FocusEvent<HTMLInputElement>) =>
                  console.log("onFocus called"),
                "aria-label": "People Picker",
              }}
              selectedItems={watch("Users")}
              onChange={(item) => {
                setValue("Users", item);

              }} 
              disabled={false}
            />
          )}
        </Field>

        <div className={classes.actionContainer}>
          <Button type="submit" disabled={isSubmitting} appearance="primary">
            Save Template
          </Button>
          <Button
            type="button"
            disabled={isSubmitting}
            appearance="secondary"
            onClick={() => props.onClose()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
