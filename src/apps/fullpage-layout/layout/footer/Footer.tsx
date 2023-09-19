/* eslint-disable */
import * as React from "react";
import { Link } from "@fluentui/react-components";
import { FooterLink, FooterLinks } from "@common/types";
import { useFooterStyle } from "./useFooterStyle";

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

