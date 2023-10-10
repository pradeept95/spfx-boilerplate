/* eslint-disable */
import { makeStyles, shorthands } from "@fluentui/react-components";

export const useFooterStyle = makeStyles({
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItem: "center",
    height: "100%",
    ...shorthands.padding(0, "10px"),
  },

  footerLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  footerLinks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...shorthands.gap("20px"),

    "@media only screen and (max-width: 700px)": {
      display: "none",
    },
  },

  footerCopyRight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "@media only screen and (max-width: 1024px)": {
      display: "none",
    },
  },
});
