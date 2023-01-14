/* eslint-disable */
import * as React from "react";
import { HashRouter as Router } from "react-router-dom";
import ApplicationEntry from "../../../application/ApplicationEntry";
import AppContext from "../../../common/config/app-context.config";
import { AlertProvider } from "../../../common/context/AlertContext";
import { AuthProvider } from "../../../common/context/AuthContext";
import { LoadingProvider } from "../../../common/context/LoadingContext";
import { ISpOnlineExampleProps } from "./ISpOnlineExampleProps";

export default class SpOnlineExample extends React.Component<ISpOnlineExampleProps, {}> {
 
  public render(): React.ReactElement<ISpOnlineExampleProps> {

    const appContext = AppContext.getInstance();
    appContext.addSetting(this.props.settings);
    appContext.setIsDarkTheme(this.props.isDarkTheme);
    appContext.setLayoutStyle(this.props.settings?.enableLayoutStyle);
    
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
  }
}
