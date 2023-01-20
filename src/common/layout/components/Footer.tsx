/* eslint-disable */
import * as React from "react"; 
import { Stack, IStackTokens } from "@fluentui/react/lib/Stack";
import { FooterLink, FooterLinks } from "../../types/footer-link.type";
import { Link } from "office-ui-fabric-react";
// import useWindowDimensions from "../../hooks/useWindowsSize";
// import { BREAKPOINT } from ".."; 
import * as footerStyle from "../styles/FooterStyle.module.scss";


const logo: any = require("../../../assets/irmb_logo.png"); 
const footerLinks: FooterLink[] = FooterLinks; 
const stackTokens: IStackTokens = { childrenGap: 12, maxHeight: 40 };
 
export const Footer: React.FunctionComponent<{ collapsed: boolean }> = ({
  collapsed = false,
}) => {
  // const { width } = useWindowDimensions();
  // const stackStyles: IStackStyles = {
  //   root: { 
  //     position: "fixed",
  //     left: 0,
  //     bottom: width < BREAKPOINT ? 48 : 0, 
  //   },
  // };

  return (
    <Stack
      horizontal
      tokens={stackTokens}
      // styles={stackStyles}
      className={footerStyle.default.footerContainerStyles}
    >
      {!collapsed && (
        <Stack.Item disableShrink>
          <img src={logo} style={{ maxHeight: "25px" }} alt="IRMB" />
        </Stack.Item>
      )}
      {!collapsed && (
        <Stack.Item grow>
          {footerLinks?.map((link) => (
            <>
              <Link
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                }}
                href={link.link}
                target="_blank"
              >
                {link.name}
              </Link>
            </>
          ))}
        </Stack.Item>
      )}
      <Stack.Item>
        Copyright © 2022 - {new Date().getFullYear()} IRMB. All Rights Reserved.
      </Stack.Item>
      {/* <Separator theme={theme}>Made With Love By IRMB</Separator> */}
    </Stack>
  );
}
