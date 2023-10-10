import { mergeStyleSets } from "@fluentui/merge-styles";

export interface IComponentClassNames {
  formContainer: string;
  row: string;
  col25: string;
  col50: string;
  col75: string;
  col100: string;
  actionContainer;
}

export const getFormLayoutClasses = (): IComponentClassNames => {
  return mergeStyleSets({
    formContainer: {
      display: "block",
    },

    row: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1%",
    },

    col25: {
      width: "24%",

      "@media(max-width: 700px)": {
        width: "49%",
      },

      "@media(max-width: 400px)": {
        width: "99%",
      },
    },
    col50: {
      width: "49%",

      "@media(max-width: 700px)": {
        width: "99%",
      },
    },
    col75: {
      width: "75%",

      "@media(max-width: 700px)": {
        width: "99%",
      },
    },
    col100: {
      width: "99%",
    },

    actionContainer: {
      marginTop: 10,
      display: "flex",
      flexWrap: "wrap",
      gap: "5px",
    },
  });
};
