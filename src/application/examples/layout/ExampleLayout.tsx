/* eslint-disable */
import { INavLinkGroup, IStackStyles, Stack } from "@fluentui/react";
import * as React from "react";
import { Outlet } from "react-router-dom";
import useWindowDimensions from "../../../common/hooks/useWindowsSize";
import { BREAKPOINT } from "../../../common/layout";
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
        icon: "WorkItemAlert",
      },
      {
        key: "Loading",
        name: "Loading",
        url: "#/examples/loading",
        icon: "BullseyeTarget",
      },
      {
        key: "PeolpePicker",
        name: "PeolpePicker",
        url: "#/examples/people",
        icon: "PeopleAdd",
      },
      {
        key: "RichEditor",
        name: "RichEditor",
        url: "#/examples/editor",
        icon: "PeopleAdd",
      },
      {
        key: "ESignature",
        name: "E-Signature",
        url: "#/examples/esignature",
        icon: "PeopleAdd",
      },
    ],
  },
  {
    name: "Advanced Example",
    expandAriaLabel: "Advance Form Example",
    links: [
      {
        key: "Form",
        name: "Form",
        url: "#/examples/form",
        icon: "FabricFormLibrary",
      },
      {
        key: "DataTable1",
        name: "Data Table 1",
        url: "#/examples/datatable1",
        icon: "FiveTileGrid",
      },
      {
        key: "DataTable2",
        name: "Data Table 2",
        url: "#/examples/datatable2",
        icon: "LargeGrid",
      },
      {
        key: "DocuSign",
        name: "DocuSign",
        url: "#/examples/docusign",
        icon: "InsertSignatureLine",
      },
      {
        key: "Email",
        name: "Email",
        url: "#/examples/email",
        icon: "MailCheck",
      },
      {
        key: "PDF",
        name: "PDF",
        url: "#/examples/pdf",
        icon: "PDF",
      },
    ],
  },
]; 
  
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
      minHeight : 44, 
      transition: '1s', 
    },
  };

  return (
    <main>
      <Stack enableScopedSelectors styles={verticalStackStyle}>
        <Stack styles={topNavStackStyle}>
          <TopNav  collapsed={collapsed} setCollapsed={setCollapsed}/>
        </Stack>
        <Stack enableScopedSelectors horizontal styles={horizontalStackStyle}>
          <Stack.Item styles={sideNavAreaStackStyle} disableShrink>
            <SideNav  collapsed={collapsed} navLinkGroups={navLinkGroups}/>
          </Stack.Item>
          <Stack.Item grow styles={mainAreaStackStyle}>
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
