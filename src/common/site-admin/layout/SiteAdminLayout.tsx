/* eslint-disable */
import { DefaultPalette, INavLinkGroup, IStackStyles, Stack } from "@fluentui/react";
import * as React from "react";
import { Outlet } from "react-router-dom"; 
import useWindowDimensions from "../../hooks/useWindowsSize";
import { Footer } from "../../layout/components/Footer";
import { SideNav } from "../../layout/components/SideNav";
import { TopNav } from "../../layout/components/TopNav";

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
    justifyContent : "stretch"
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
    alignSelf : "stretch",

    
    paddingBottom: 50, 
    display: "flex"
  },
};

const mainAreaStackStyle: IStackStyles = {
  root: {
    margin: 10,
    paddingBottom: 50, 
    width : "100%",   
    alignSelf : "stretch" 
  },
};

const navLinkGroups: INavLinkGroup[] = [
    {
        links: [
            {
                key: "AdminHome",
                name: "Dashboard",
                url: "#/s-admin/home",
                icon: 'Home'
            }
        ]
    },
    {
      name: "App Configuration",
      expandAriaLabel: "Show more App Configuration",
      links: [
        {
          key: "SiteSettings",
          name: "Site Settings",
          url: "#/s-admin/settings",
          icon: 'WorkItemAlert'
        }, 
        {
          key: "AppResources",
          name: "App Resources",
          url: "#/s-admin/manage-resources",
          icon: 'WorkItemAlert'
        }, 
        {
          key: "AccessRoles",
          name: "User Access Roles",
          url: "#/s-admin/manage-roles",
          icon: 'WorkItemAlert'
        }, 
      ],
    } 
  ];

const BREAKPOINT : number = 1025;
  
export const SiteAdminLayout: React.FunctionComponent = () => {
  const isCollapsed = sessionStorage.getItem("isCollapsed") == 'true'? true : false;
  const { width } = useWindowDimensions();
  const [collapsed, setCollapsed] = React.useState<boolean>(isCollapsed || width < BREAKPOINT);

  React.useEffect(()=> { 
    sessionStorage.setItem("isCollapsed", `${collapsed}`); 
  }, [collapsed])

  React.useEffect(()=> { 
    setCollapsed(width < BREAKPOINT);
  }, [width])

  //footer style if screensize is less than breakpoint
  const footerStackStyle: IStackStyles = {
    root: {
      position: "fixed",
      left : 0,
      bottom: width < BREAKPOINT ? 48 : 0,
      width : "100%",
      height : 40,
      background: DefaultPalette.neutralLight ,
      transition: '1s',
      boxShadow: "3px 0px 6px #888888;"
    },
  };

  return (
    <main>
      <Stack enableScopedSelectors styles={verticalStackStyle}>
        <Stack styles={topNavStackStyle}>
          <TopNav  collapsed={collapsed} setCollapsed={setCollapsed}/>
        </Stack>
        <Stack enableScopedSelectors horizontal styles={horizontalStackStyle}>
          <Stack.Item grow={3} styles={sideNavAreaStackStyle} disableShrink>
            <SideNav  collapsed={collapsed} navLinkGroups={navLinkGroups} selectedKey="AdminHome"/>
          </Stack.Item>
          <Stack.Item  grow={3} styles={mainAreaStackStyle}>
            <Outlet />
          </Stack.Item>
        </Stack>
        <Stack styles={footerStackStyle}>
          <Footer collapsed={width < BREAKPOINT}/>
        </Stack>
      </Stack>
    </main>
  );
};
