/* eslint-disable */
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

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
  menuTab: {
    maxWidth: "90%",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap", 
  },
  groupDivider: {
    ...shorthands.margin("10px", "0px", "0px", "0px"),
  },

  menuTitle: {
    // truncate text if it's too long
    ...shorthands.overflow("hidden"),
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "90%",
  },
});
