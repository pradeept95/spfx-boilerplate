import { SiteSettings } from "../../../common/types/SiteSettingType";

export interface ISpOnlineExampleProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  settings: SiteSettings<{
    isTeamsMessagingExtension: boolean;
  }>;
}
