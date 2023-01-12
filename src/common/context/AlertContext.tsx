/* eslint-disable */
import * as React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AlertProvider: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};
