import * as React from "react"; 
import { Outlet } from "react-router-dom";
import { SideNav } from "./components/SideNav";
 

export const AdminLayout: React.FunctionComponent = () => {
  return (
    <main>
      <SideNav />
      <Outlet />
    </main>
  );
};
