/* eslint-disable */
import { WebPartContext } from "@microsoft/sp-webpart-base";

export type SiteSettings<TAdditional extends {}> = {
  sitePrefix: string;
  siteName: string;
  isNotificationEnabled: boolean;
  enableLayoutStyle: boolean;
  enableDebugMode: boolean;
  notificationDelegateEmail: string;
  context: WebPartContext;
} & TAdditional;
