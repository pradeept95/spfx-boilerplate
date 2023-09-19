/* eslint-disable */
import * as React from "react";
// import { TopBar } from './topbar/TopBar';  
import { Footer } from "./footer/Footer";
import { useLayoutStyle } from "./useLayoutStyle"; 
import { Outlet } from "react-router-dom"; 
import { SideBar } from "./sidebar/SideBar";

export const Layout: React.FunctionComponent<{}> = () => {
  const classes = useLayoutStyle();
  return (
    <section className={classes.container}>
      {/* <section className={classes.topBarContainer}>
                <TopBar />
            </section> */}
      <section className={classes.mainContainer}>
        <nav className={classes.sideBarContainer}>
          <SideBar /> 
          <SideBar /> 
          <SideBar /> 
          <SideBar /> 
        </nav>
        <main className={classes.mainPageContainer}>
          <Outlet />
        </main>
      </section>
      <footer className={classes.footerContainer}>
        <Footer />
      </footer>
    </section>
  );
};
