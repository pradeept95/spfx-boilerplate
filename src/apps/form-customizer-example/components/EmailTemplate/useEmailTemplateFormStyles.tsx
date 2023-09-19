/* eslint-disable  */
import { makeStyles, shorthands } from "@fluentui/react-components";

export const useEmailTemplateFormStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: "800px",
    ...shorthands.margin("0px", "auto"),
  },
  actionContainer: {
    ...shorthands.margin("10px", "0px", "0px", "0px"),
    display: "flex",
    justifyContent: "center",
    ...shorthands.gap("10px"),
  },
});
