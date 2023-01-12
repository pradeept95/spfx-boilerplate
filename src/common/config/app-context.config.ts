/* eslint-disable */
import { WebPartContext } from "@microsoft/sp-webpart-base"; 
import { SiteSettings } from "../types/site-settings.types";
import { getGraphFi, getSP } from "./pnpjs.config";

class AppContext {
  private static instance: AppContext;

  public isDarkTheme: boolean = false;
  public context: WebPartContext;
  public siteSettings?: SiteSettings;

  private constructor() {}

  public static getInstance(): AppContext {
    if (!AppContext.instance) {
      AppContext.instance = new AppContext();
    }
    return AppContext.instance;
  }

  public async initialize(context: WebPartContext) {
    this.context = context;
    await getSP(this.context);
    await getGraphFi(this.context);
  }

  public async addSetting(siteSettings: SiteSettings) {
    this.siteSettings = siteSettings;
  }

  public async setIsDarkTheme(isDark: boolean) {
    this.isDarkTheme = !!isDark;
  }

  public async setLayoutStyle(enableLayoutStyle: boolean) {
    if (enableLayoutStyle) {
      const commandBar = document.getElementById("spCommandBar");
      if (commandBar) {
        commandBar.style.display = "none";
      } else {
        commandBar.style.display = "block";
      }
    }
  }
}

export default AppContext;
