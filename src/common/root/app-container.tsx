/* eslint-disable */
import * as React from "react";
import { initializeIcons } from "@fluentui/react";
import { setIconOptions } from "@fluentui/react/lib/Styling";
// import { HashRouter as Router } from "react-router-dom";
import { useAuthInitialization } from "../auth/useAuth";
import { AuthProvider } from "@common/auth/AuthContext"; 
import { Spinner } from "@fluentui/react-components";
import { AlertProvider, ConfirmProvider, LoadingProvider } from "@prt-ts/fluent-common-features";

export const AppContainer = (props) => {
  React.useEffect(() => {
    initializeIcons();
    // Suppress icon warnings.
    setIconOptions({
      disableWarnings: true,
    });
  }, []);

  return (
    <>
      {/* <Router> */}
        <AuthProvider>
          <LoadingProvider>
          <AlertProvider>
            <ConfirmProvider>
              <AppContextInitializer>{props.children}</AppContextInitializer>
            </ConfirmProvider>
            </AlertProvider>
          </LoadingProvider>
        </AuthProvider>
      {/* </Router> */}
    </>
  );
};

const AppContextInitializer = (props) => {
  const [isAuthInitializing, initializeAuth] = useAuthInitialization();

  React.useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <>
      {!isAuthInitializing ? (
        <>{props.children}</>
      ) : (
        <div style={{ minHeight: "60vh", marginTop: "20vh" }}>
          <Spinner label="Loading, Please Wait..." />
        </div>
      )}
    </>
  );
};
