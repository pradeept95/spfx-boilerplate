/* eslint-disable */
import { DefaultPalette, INavLinkGroup, IStackStyles, Stack } from "@fluentui/react";
import * as React from "react";
import { Outlet } from "react-router-dom";
import useWindowDimensions from "../../../common/hooks/useWindowsSize";
import { Footer } from "../../../common/layout/components/Footer";
import { SideNav } from "../../../common/layout/components/SideNav";
import { TopNav } from "../../../common/layout/components/TopNav";

const verticalStackStyle: IStackStyles = {
  root: {
    //background: DefaultPalette.neutralSecondary,
  },
};

const horizontalStackStyle: IStackStyles = {
  root: {
    gap: 10,
    minHeight: "80vh",
    height: "100%",
    marginButtom: 40
  },
};

const topNavStackStyle: IStackStyles = {
  root: { 
    minHeight: 50,
    boxShadow: "3px 0px 6px #888888;"
  },
};

const sideNavAreaStackStyle: IStackStyles = {
  root: {
    //background: DefaultPalette.neutralSecondary,
  },
};

const mainAreaStackStyle: IStackStyles = {
  root: {
    margin: 10,
    width : "100%"    
  },
};

const footerStackStyle: IStackStyles = {
  root: {
    position: "fixed",
    left : 0,
    bottom: 0,
    width : "100%",
    height : 40,
    background: DefaultPalette.neutralLight ,
    transition: '1s',
    boxShadow: "3px 0px 6px #888888;",
    zIndex : 99
  },
};

const navLinkGroups: INavLinkGroup[] = [
  {
    name: "Basic components",
    expandAriaLabel: "Show more Basic components",
    links: [
      {
        key: "ActivityItem",
        name: "ActivityItem",
        url: "#/admin",
        icon: 'News'
      },
      {
        key: "Breadcrumb",
        name: "Breadcrumb",
        url: "#/admin",
        icon: 'News',
      },
      {
        key: "Button",
        name: "Button",
        url: "#/admin",
        icon: 'News',
      },
    ],
  },
  {
    name: "Extended components",
    expandAriaLabel: "Show more Extended components",
    links: [
      {
        key: "ColorPicker",
        name: "ColorPicker",
        url: "#/admin",
      },
      {
        key: "ExtendedPeoplePicker",
        name: "ExtendedPeoplePicker",
        url: "#/admin",
      },
      {
        key: "GroupedList",
        name: "GroupedList",
        url: "#/admin",
      },
    ],
  },
  {
    name: "Utilities",
    expandAriaLabel: "Show more Utilities",
    links: [
      {
        key: "FocusTrapZone",
        name: "FocusTrapZone",
        url: "#/admin/focustrapzone",
      },
      {
        key: "FocusZone",
        name: "FocusZone",
        url: "#/admin/focuszone",
      },
      {
        key: "MarqueeSelection",
        name: "MarqueeSelection",
        url: "#/admin/marqueeselection",
      },
    ],
  },
];
 
export const AdminLayout: React.FunctionComponent = () => {
  const isCollapsed = sessionStorage.getItem("isCollapsed") == 'true'? true : false;
  const { width } = useWindowDimensions();
  const [collapsed, setCollapsed] = React.useState<boolean>(isCollapsed || width < 900);

  React.useEffect(()=> { 
    sessionStorage.setItem("isCollapsed", `${collapsed}`); 
  }, [collapsed])

  React.useEffect(()=> {
    const needCollapse = width < 900 && !isCollapsed; 
    if(needCollapse){
      setCollapsed(true);      
    }
  }, [width])

  return (
    <main>
      <Stack enableScopedSelectors styles={verticalStackStyle}>
        <Stack styles={topNavStackStyle}>
          <TopNav  collapsed={collapsed} setCollapsed={setCollapsed}/>
        </Stack>
        <Stack enableScopedSelectors horizontal styles={horizontalStackStyle}>
          <Stack styles={sideNavAreaStackStyle} disableShrink>
            <SideNav collapsed={collapsed} navLinkGroups={navLinkGroups}/>
          </Stack>
          <Stack styles={mainAreaStackStyle}>
            <Outlet />
          </Stack>
        </Stack>
        <Stack styles={footerStackStyle}>
          <Footer collapsed={collapsed}/>
        </Stack>
      </Stack>
    </main>
  );
};
