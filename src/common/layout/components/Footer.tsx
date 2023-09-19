/* eslint-disable */
import * as React from "react";
import { Link } from "@fluentui/react-components";
import { FooterLink, FooterLinks } from "@common/types"; 

const logo: any = require("@assets/irmb_logo.png");
const footerLinks: FooterLink[] = FooterLinks;

export const Footer: React.FunctionComponent<{}> = () => {
  const classes = useFooterStyle();
  const links = React.useMemo(() => footerLinks, []);
  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerLogo}>
        <img src={logo} style={{ maxHeight: "25px" }} alt="IRMB" />
      </div>
      <div className={classes.footerLinks}>
        {links.map((link) => (
          <Link href={link.link} target="_blank">{link.name}</Link>
        ))}
      </div>
      <div className={classes.footerCopyRight}>
        Copyright © 2022 - {new Date().getFullYear()} IRMB. All Rights Reserved.
      </div>
    </div>
  );
}; 


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

