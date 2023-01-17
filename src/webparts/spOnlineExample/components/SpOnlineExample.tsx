/* eslint-disable */
import * as React from "react";
import SPFXBaseEntryComponent from "../../../common";
import AppContext from "../../../common/config/app-context.config";
import { ISpOnlineExampleProps } from "./ISpOnlineExampleProps";

export default class SpOnlineExample extends React.Component<ISpOnlineExampleProps, {}> {
 
  public render(): React.ReactElement<ISpOnlineExampleProps> {

    const appContext = AppContext.getInstance();
    appContext.addSetting(this.props.settings);
    appContext.setIsDarkTheme(this.props.isDarkTheme);
    appContext.setLayoutStyle(this.props.settings?.enableLayoutStyle);
    
    return (
      <>
        <SPFXBaseEntryComponent/>
      </>
    );
  }
}
