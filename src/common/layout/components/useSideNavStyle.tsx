/* eslint-disable */
import { makeStyles, tokens } from "@fluentui/react-components";

export const useSideNavStyle = makeStyles({
  expandedMenu: {
    display: "block",
    "@media only screen and (max-width: 1024px)": {
      display: "none",
    },
  },
  collapsedMenu: {
    display: "none",
    "@media only screen and (max-width: 1024px)": {
      display: "block",
    },
  },
  tooltip: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
  },

  menuItem: {
    display: "flex",
    justifyContent: "space-between",

    "& .menu-action": {
      display: "none",
    },

    ":hover .menu-action, :active .menu-action": {
      display: "block",
    },
  },
});
