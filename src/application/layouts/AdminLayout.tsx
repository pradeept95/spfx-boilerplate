/* eslint-disable */
import { DefaultPalette, IStackStyles, Stack } from "@fluentui/react";
import * as React from "react";
import { Outlet } from "react-router-dom";
import useWindowDimensions from "../../common/hooks/useWindowsSize";
import { Footer } from "./components/Footer";
import { SideNav } from "./components/SideNav";
import { TopNav } from "./components/TopNav";

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
    marginTop: 10,
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
    boxShadow: "3px 0px 6px #888888;"
  },
};


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
            <SideNav  collapsed={collapsed}/>
          </Stack>
          <Stack styles={mainAreaStackStyle}>
            <Outlet />
          </Stack>
        </Stack>
        <Stack styles={footerStackStyle}>
          <Footer/>
        </Stack>
      </Stack>
    </main>
  );
};
