/* eslint-disable */
import * as React from "react";
import * as ReactDom from "react-dom";  
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle} from "@microsoft/sp-property-pane";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "SpOnlineExampleWebPartStrings"; 
import { ISpOnlineExampleProps } from "./components/ISpOnlineExampleProps"; 
export interface ISpOnlineExampleWebPartProps {
  description: string;
  sitePrefix: string;
  siteName: string;
  isNotificationEnabled: boolean;
  enableLayoutStyle: boolean;
  enableDebugMode: boolean;
  notificationDelegateEmail: string;
}
// import { SPComponentLoader } from "@microsoft/sp-loader";
import {
  FluentProvider,
  FluentProviderProps,
  teamsDarkTheme,
  teamsLightTheme,
  webLightTheme,
  webDarkTheme,
  Theme,
} from "@fluentui/react-components";
// import { createV9Theme } from "@common/theme/V9ThemeShim";
import { SpOnlineExample } from "./components/SpOnlineExample";
import { ThemeService } from "@prt-ts/fluent-theme";
import { setSubscriptionFactory } from "@common/list-subscriptions";

export enum AppMode {
  SharePoint, SharePointLocal, Teams, TeamsLocal, Office, OfficeLocal, Outlook, OutlookLocal
}
const { getTheme } = ThemeService();
export default class SpOnlineExampleWebPart extends BaseClientSideWebPart<ISpOnlineExampleWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  private _appMode: AppMode = AppMode.SharePoint;
  private _theme: Theme = webLightTheme;

  public async render(): Promise<void> { 
    const element: React.ReactElement<ISpOnlineExampleProps> =
      React.createElement(SpOnlineExample, {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        settings: {
          sitePrefix: this.properties.description,
          siteName: this.properties.siteName,
          isNotificationEnabled: this.properties.isNotificationEnabled,
          enableLayoutStyle: this.properties.enableLayoutStyle,
          enableDebugMode: this.properties.enableDebugMode,
          notificationDelegateEmail: "",
          context: this.context,

          isTeamsMessagingExtension: false,
        },
      });  

    //wrap the component with the Fluent UI 9 Provider.
    const fluentElement: React.ReactElement<FluentProviderProps> =
      React.createElement(
        FluentProvider,
        {
          theme:
            this._appMode === AppMode.Teams ||
            this._appMode === AppMode.TeamsLocal
              ? this._isDarkTheme
                ? teamsDarkTheme
                : teamsLightTheme
              : this._appMode === AppMode.SharePoint ||
                this._appMode === AppMode.SharePointLocal
              ? this._isDarkTheme
                ? webDarkTheme
                : this._theme
              : this._isDarkTheme
              ? webDarkTheme
              : webLightTheme,
        },
        element
      );

    ReactDom.render(fluentElement, this.domElement);
  }

  protected async onInit(): Promise<void> {
    const _l = this.context.isServedFromLocalhost;
    if (!!this.context.sdks.microsoftTeams) {
      const teamsContext =
        await this.context.sdks.microsoftTeams.teamsJs.app.getContext();
      switch (teamsContext.app.host.name.toLowerCase()) {
        case "teams":
          this._appMode = _l ? AppMode.TeamsLocal : AppMode.Teams;
          break;
        case "office":
          this._appMode = _l ? AppMode.OfficeLocal : AppMode.Office;
          break;
        case "outlook":
          this._appMode = _l ? AppMode.OutlookLocal : AppMode.Outlook;
          break;
        default:
          throw new Error("Unknown host");
      }
    } else this._appMode = _l ? AppMode.SharePointLocal : AppMode.SharePoint;
  
    this._getEnvironmentMessage().then((message) => {
      this._environmentMessage = message;
    });

     setSubscriptionFactory(this);


    return super.onInit();
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          let environmentMessage: string = "";
          switch (context.app.host.name) {
            case "Office": // running in Office
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case "Outlook": // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case "Teams": // running in Teams
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error("Unknown host");
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

  protected async onThemeChanged(currentTheme: IReadonlyTheme | undefined): Promise<void> {
    console.log("onThemeChanged", currentTheme);
    console.log("primary color", currentTheme?.semanticColors?.primaryButtonBackground);
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;
    // if the app mode is sharepoint, adjust the fluent ui 9 web light theme 
    // to use the sharepoint theme color, teams / dark mode should be fine on default
    if (
      this._appMode === AppMode.SharePoint ||
      this._appMode === AppMode.SharePointLocal
    ) {
       this._theme = await getTheme(
         currentTheme?.semanticColors?.primaryButtonBackground,
         !!currentTheme.isInverted
       );
    } 
  } 

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  } 

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onAfterPropertyPaneChangesApplied(): void {
    ReactDom.unmountComponentAtNode(this.domElement);

    // find the save btn and click
    const saveBtn = document.querySelector(
      'button[name="Save"]'
    ) as HTMLElement;
    if (saveBtn) saveBtn?.click();

    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: "Site Settings",
              groupFields: [
                PropertyPaneTextField("siteName", {
                  label: "Site Name",
                  description: "Name of the Site",
                }),
                PropertyPaneToggle("enableDebugMode", {
                  label: "Enable App Debug Mode",
                }),
                PropertyPaneToggle("isNotificationEnabled", {
                  label: "Enable Notification",
                }),
                PropertyPaneToggle("enableLayoutStyle", {
                  label: "Enable Layout Style",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
