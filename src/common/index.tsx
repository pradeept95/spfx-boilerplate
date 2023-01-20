/* eslint-disable */
import * as React from "react";
import { initializeIcons, Spinner } from "@fluentui/react";
import { setIconOptions } from "@fluentui/react/lib/Styling";
import { HashRouter as Router } from "react-router-dom";
import ApplicationEntry from "../application/ApplicationEntry";
import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import { useAuthInitialization } from "./hooks/useAuth";

const SPFXBaseEntryComponent: React.FunctionComponent<{}> = () => {
  React.useEffect(() => {
    initializeIcons();
    // Suppress icon warnings.
    setIconOptions({
      disableWarnings: true,
    });
  }, []);

  return (
    <>
      <Router>
        <AuthProvider>
          <LoadingProvider>
            <AlertProvider>
              <AppContextInitializer />
            </AlertProvider>
          </LoadingProvider>
        </AuthProvider>
      </Router>
    </>
  );
};

export default SPFXBaseEntryComponent;

const AppContextInitializer: React.FunctionComponent<{}> = () => {
  const [isAuthInitializing, initializeAuth] = useAuthInitialization();

  React.useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <>
      {!isAuthInitializing ? (
        <ApplicationEntry />
      ) : (
        <div style={{ minHeight: "60vh", marginTop: "20vh" }}>
          <Spinner label="Loading, Please Wait..." />
        </div>
      )}
    </>
  );
};
