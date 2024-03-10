/* eslint-disable */
import * as React from "react";
import { Outlet } from "react-router-dom";

/* eslint-disable */
import { useLayoutStyle } from "./useLayoutStyle";
import { Footer } from "@common/layout/components/Footer";
import { SideBar } from "./Sidebar/Sidebar"; 

export const Layout: React.FunctionComponent<{}> = () => {
  const classes = useLayoutStyle();  
  const webpartDomReact = window.__webpartRootDomReact; 
  console.log("webpartDomReact", webpartDomReact);

  const containerHeightStyle = {
    height: webpartDomReact?.height + 49 || "calc(100vh - 95px)",
  };

  const innerContainerHeightStyle = {
    maxHeight: webpartDomReact?.height - 10 || "calc(100vh - 165px)",
  };

  return (
    <section className={classes.container} style={containerHeightStyle}>
      {/* <section className={classes.topBarContainer}>
                <TopBar />
          </section> */}
      <section className={classes.mainContainer}>
        <nav
          className={classes.sideBarContainer}
          style={innerContainerHeightStyle}
        >
          <SideBar />
        </nav>
        <main
          className={classes.mainPageContainer}
          style={innerContainerHeightStyle}
        >
          <Outlet />
        </main>
      </section>
      <footer className={classes.footerContainer}>
        <Footer />
      </footer>
    </section>
  );
};
