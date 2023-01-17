/* eslint-disable */
import * as React from "react"; 
import { HashRouter as Router } from "react-router-dom";
import ApplicationEntry from "../application/ApplicationEntry";
import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";

const SPFXBaseEntryComponent: React.FunctionComponent<{}> = () => {

  return (
    <>
        <Router>
          <AuthProvider>
            <LoadingProvider>
              <AlertProvider>
                <ApplicationEntry />
              </AlertProvider>
            </LoadingProvider>
          </AuthProvider>
        </Router>
    </>
  );
};

export default SPFXBaseEntryComponent;
