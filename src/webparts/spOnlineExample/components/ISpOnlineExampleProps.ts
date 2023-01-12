import { SiteSettings } from "../../../common/types/site-settings.types";

export interface ISpOnlineExampleProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  settings: SiteSettings;
}
