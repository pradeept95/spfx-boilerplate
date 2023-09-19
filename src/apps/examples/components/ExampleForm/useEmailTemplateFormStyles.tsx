/* eslint-disable  */
import { makeStyles, shorthands } from "@fluentui/react-components";

export const useEmailTemplateFormStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: "800px",
    ...shorthands.margin("0px", "auto"),
  },

  formContainer: {
    ...shorthands.margin("10px"),
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("10px"),
  },

  row: {
    display: "flex",

    flexDirection: "row",
    flexWrap: "wrap",
    ...shorthands.gap("10px"),
  },

  column: {
    display: "flex",
    flexGrow: 1, 
    ...shorthands.flex(1),
  },

  actionContainer: {
    ...shorthands.margin("10px", "0px", "0px", "0px"),
    display: "flex",
    justifyContent: "center",
    ...shorthands.gap("10px"),
  },
});
