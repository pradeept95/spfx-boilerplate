/* eslint-disable */
import * as React from "react";
import { initializeIcons } from "@fluentui/react";
import { setIconOptions } from "@fluentui/react/lib/Styling";
import { HashRouter as Router } from "react-router-dom";
import { useAuthInitialization } from "../auth/useAuth";
import { AuthProvider } from "@common/auth/AuthContext";
import { LoadingProvider } from "@common/features/loading/LoadingContext";
import { AlertProvider } from "@common/features/alert/AlertContext";
import { Spinner } from "@fluentui/react-components";

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
      <Router>
        <AuthProvider>
          <LoadingProvider>
            <AlertProvider>
              <AppContextInitializer>{props.children}</AppContextInitializer>
            </AlertProvider>
          </LoadingProvider>
        </AuthProvider>
      </Router>
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
