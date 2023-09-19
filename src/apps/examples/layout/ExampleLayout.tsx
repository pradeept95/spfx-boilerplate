/* eslint-disable */
import * as React from "react";
import { Outlet } from "react-router-dom";

/* eslint-disable */
import { useLayoutStyle } from "./useLayoutStyle";
import { Footer } from "@common/layout/components/Footer";
import { SideBar } from "./Sidebar/Sidebar";

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
