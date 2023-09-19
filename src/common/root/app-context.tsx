/* eslint-disable */
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AccessGroupUsers, AppResource, ROLES } from "@common/auth/AuthType";
import { SiteSettings } from "../types/SiteSettingType";
import { getGraphFi, getSP } from "@common/pnp";
import { FormCustomizerContext } from "@microsoft/sp-listview-extensibility";

export default class AppContext {
  private static instance: AppContext;

  public isDarkTheme: boolean = false;
  public context: WebPartContext | FormCustomizerContext;
  public siteSettings?: SiteSettings<{}>;
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
    context: WebPartContext | FormCustomizerContext,
    siteName: string = null
  ) {
    this.context = context;
    await getSP(this.context, siteName);
    await getGraphFi(this.context);
  }

  public async registerResources(newAppResources: AppResource[]) {
    this.appResources = [...this.appResources, ...newAppResources];
  }

  public async addSetting(siteSettings: SiteSettings<{}>) {
    this.siteSettings = siteSettings;
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
      if (commandBar) {
        commandBar.style.display = "none";
        // topNavigation.style.display = "none";
      }
    }
  }

  public async setDebugMode(enableDebugMode: boolean) {
    if (this.siteSettings) {
      this.siteSettings.enableDebugMode = enableDebugMode;
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
