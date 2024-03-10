/* eslint-disable */
import { WebPartContext } from "@microsoft/sp-webpart-base"; 
import { AccessGroupUsers, AppResource, ROLES } from "@common/auth/AuthType";
import { SiteSettings } from "../types/SiteSettingType";
import { getGraphFi, getSP } from "@common/pnp"; 

import { ApplicationInsights } from "@microsoft/applicationinsights-web";


export default class AppContext {
  private static instance: AppContext;

  public isDarkTheme: boolean = false;
  public context: WebPartContext;
  public appInsights: ApplicationInsights = null;
  public siteSettings?: SiteSettings<{
    [key: string]: any;
  }>;
  public accessGroupUsers?: Partial<AccessGroupUsers>;
  public currentUserRoles?: number[];
  public currentUserResourceAccess?: string[];
  public appResources?: AppResource[] = [];

  private constructor() {}

  public static getInstance(): AppContext {
    if (!AppContext.instance) {
      AppContext.instance = new AppContext();
    }
    return AppContext.instance;
  }

  public async initialize( 
    appSettings: SiteSettings<{}>,
    siteName?: string
  ) {
    // get context from settings
    const { context, appInsightsConnectionString } = appSettings;

    if (appInsightsConnectionString) {
      // initialize app insights
      console.log("initialize app insights");
      this.appInsights = new ApplicationInsights({
        config: {
          connectionString: appInsightsConnectionString,
          /* ...Other Configuration Options... */
        },
      });

      await this.appInsights.loadAppInsights();
      await this.appInsights.addTelemetryInitializer((envelope) => {
        envelope.tags["siteName"] = appSettings.siteName;
        envelope.tags["userName"] = context.pageContext.user.loginName;
        envelope.tags["userEmail"] = context.pageContext.user.email;
        envelope.tags["userDisplayName"] = context.pageContext.user.displayName;
      });
      this.appInsights.trackPageView();
    }

    // save context
    this.context = context;

    // set site settings
    this.siteSettings = appSettings;

    // initialize sp
    await getSP(this.context, siteName);
    await getGraphFi(this.context);
  }

  public async registerResources(newAppResources: AppResource[]) {
    this.appResources = [...this.appResources, ...newAppResources];
  }

  public async setIsDarkTheme(isDark: boolean) {
    this.isDarkTheme = !!isDark;
  }

  public async setSiteName(siteName: string) {
    // change site name
    setTimeout(() => {
      let appNameContainer = document.getElementById("O365_AppName");
      if (appNameContainer && siteName) {
        appNameContainer.innerHTML = siteName;
      }
    }, 300);
  }

  public async setLayoutStyle(enableFullScreenLayout: boolean) {
    if (enableFullScreenLayout) {
      const commandBar = document.getElementById("spCommandBar");
      // const topNavigation = document.getElementById("spSiteHeader");
      if (commandBar && commandBar.style.display !== "none") {
        commandBar.style.display = "none";
        // topNavigation.style.display = "none";
      }
    }
  }

  public async setDebugMode(enableDebugMode: boolean) {
    if (sessionStorage.getItem("debugMode") === null) {
      console.log("set debug mode");
      sessionStorage.setItem(
        "debugMode",
        (enableDebugMode || false).toString()
      );
    }

    const debugMode = sessionStorage.getItem("debugMode") === "true";

    if (this.siteSettings) {
      console.log("set debug mode");
      this.siteSettings.enableDebugMode = debugMode;
    }
  }

  public async setAccessGroupUsers(
    accessGroupUsers: Partial<AccessGroupUsers>
  ) {
    this.accessGroupUsers = accessGroupUsers;
  }

  public async setCurrentUserRoles(roles: number[]) {
    this.currentUserRoles = roles;
  }

  public async setCurrentUserResources(resources: string[]) {
    this.currentUserResourceAccess = resources;
  }

  public async getAccessGrouUsersByRoles(roleKey: keyof typeof ROLES) {
    return this.accessGroupUsers;
  }
} 