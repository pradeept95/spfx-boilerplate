/* eslint-disable */
import { WebPartContext } from "@microsoft/sp-webpart-base";

declare global {
  interface Window {
    __webpartRootDomReact: DOMRect;
  }
}

export type SiteSettings<TAdditional extends {}> = {
  sitePrefix: string;
  siteName: string;
  isNotificationEnabled: boolean;
  enableLayoutStyle: boolean;
  enableDebugMode: boolean;
  notificationForwardEmails: string;
  notificationBCCEmails: string;
  context: WebPartContext;  
  appInsightsConnectionString: string;
} & TAdditional;
