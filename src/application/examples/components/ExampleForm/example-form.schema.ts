import * as Yup from "yup";

export const ExampleFormSchema = Yup.object().shape({
  // some user filed
  users: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required(),
        text: Yup.string(),
        secondaryText: Yup.string(),
        ternaryText: Yup.string(),
      })
    )
    .min(2, "Multiple Users is Required (at least 2)."),

  user: Yup.object()
    .shape({
      id: Yup.number().required(),
      text: Yup.string(),
      secondaryText: Yup.string(),
      ternaryText: Yup.string(),
    })
    .default(undefined)
    .required("User is Required"),

  // some text field
  textField: Yup.string().required("Text Field is Required"),
  dropdownField: Yup.string().required("Dropdown field is Required"),

  // conditional field
  conditionalField: Yup.string().when("dropdownField", {
    is: "Yes",
    then: (e) => {
      return Yup.string().required(
        "Dropdown is Yes, so this field is Required."
      );
    },
  }),

  // not required field
  someComment: Yup.string(),
});
