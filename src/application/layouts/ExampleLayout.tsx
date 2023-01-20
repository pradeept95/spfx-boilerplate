/* eslint-disable */
import { DefaultPalette, INavLinkGroup, IStackStyles, Stack } from "@fluentui/react";
import * as React from "react";
import { Outlet } from "react-router-dom";
import useWindowDimensions from "../../common/hooks/useWindowsSize";
import { Footer } from "../../common/layout/components/Footer";
import { SideNav } from "../../common/layout/components/SideNav";
import { TopNav } from "../../common/layout/components/TopNav";

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
      name: "Components Example",
      expandAriaLabel: "Show more Basic components",
      links: [
        {
          key: "Alert",
          name: "Alert",
          url: "#/examples/notify",
          icon: 'WorkItemAlert'
        },
        {
          key: "Loading",
          name: "Loading",
          url:  "#/examples/loading",
          icon: 'BullseyeTarget',
        },
        {
          key: "PeolpePicker",
          name: "PeolpePicker",
          url:  "#/examples/people",
          icon: 'PeopleAdd',
        },
        {
          key: "RichEditor",
          name: "RichEditor",
          url:  "#/examples/editor",
          icon: 'PeopleAdd',
        },
        {
          key: "ESignature",
          name: "E-Signature",
          url:  "#/examples/esignature",
          icon: 'PeopleAdd',
        },
        {
          key: "DataTable",
          name: "Data Table",
          url:  "#/examples/datatable",
          icon: 'PeopleAdd',
        },
      ],
    } 
  ];

const BREAKPOINT : number = 1025;
  
export const ExampleLayout: React.FunctionComponent = () => {
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
            <SideNav  collapsed={collapsed} navLinkGroups={navLinkGroups}/>
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
