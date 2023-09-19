import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

const CustomScrollBar = {
  /* width */
  "::-webkit-scrollbar": {
    width: "5px",
  },

  /* Track */
  "::-webkit-scrollbar-track": {
    backgroundColor: tokens.colorNeutralBackground3,
  },

  /* Handle */
  "::-webkit-scrollbar-thumb": {
    backgroundColor: tokens.colorNeutralForeground3,
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },

  /* Handle on hover */
  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: tokens.colorNeutralForeground3Hover,
  },
};

export const useLayoutStyle = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("0.4rem"),
    backgroundColor: tokens.colorNeutralBackground3,
    height: "calc(100vh - 95px)",
    width: "100%",
  },

  topBarContainer: {
    backgroundColor: tokens.colorBrandBackground,
    width: "100%",
    height: "3rem",
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    boxShadow: tokens.shadow2,
  },

  mainContainer: {
    display: "flex",
    ...shorthands.flex(1),
    ...shorthands.gap("0.6rem"),
    ...shorthands.margin("10px", "px", "0px"),
  },

  sideBarContainer: {
    width: "14rem",
    maxHeight: "calc(100vh - 165px)",

    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow2,

    ...shorthands.padding("0.2rem", "0.8rem"),

    ...shorthands.overflow("hidden", "auto"),
    ...CustomScrollBar,
    ":hover": {
      ...shorthands.overflow("hidden", "auto"),
    },

    "@media only screen and (max-width: 1024px)": {
      width: "1rem",
    },
  },
  mainPageContainer: {
    ...shorthands.flex(1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground1,

    ...shorthands.padding("0.2rem", "0.8rem"),
    ...shorthands.margin("0px", "10px", "0px", "0px"),

    maxHeight: "calc(100vh - 165px)",
    ...shorthands.overflow("hidden", "auto"),
    ...CustomScrollBar,
    ":hover": {
      ...shorthands.overflow("auto", "auto"),
    },
  },

  footerContainer: {
    flexShrink: "0",
    backgroundColor: tokens.colorNeutralStroke1,
    width: "100%",
    height: "2.5rem",
    boxShadow: tokens.shadow8,
    position: "sticky",
    bottom: 0,
  },
});
