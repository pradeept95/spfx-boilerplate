/* eslint-disable */
import * as React from "react";
// import { Separator } from '@fluentui/react/lib/Separator';
// import { createTheme, ITheme } from '@fluentui/react/lib/Styling';
import { Stack, IStackTokens, IStackStyles } from "@fluentui/react/lib/Stack";
import { FooterLink, FooterLinks } from "../../types/footer-link.type";
import { Link } from "office-ui-fabric-react";
const logo: any = require("../../../assets/irmb_logo.png");

// const theme: ITheme = createTheme({
//   fonts: {
//     medium: {
//       fontFamily: 'Monaco, Menlo, Consolas',
//       fontSize: '18px',
//     },
//   },
// });

const footerLinks: FooterLink[] = FooterLinks;

const stackTokens: IStackTokens = { childrenGap: 12, maxHeight: 40 };
const stackStyles: IStackStyles = {
  root: { paddingTop: 10, paddingLeft: 45, paddingRight: 25, zIndex: 99 },
};

export const Footer: React.FunctionComponent<{ collapsed: boolean }> = ({
  collapsed = false,
}) => (
  <Stack horizontal tokens={stackTokens} styles={stackStyles}>
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
