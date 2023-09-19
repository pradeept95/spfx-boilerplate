/* eslint-disable */
import * as React from "react";
import { ISpOnlineExampleProps } from "./ISpOnlineExampleProps";

import ApplicationEntry from "@app/ApplicationEntry";

// import styles from './CdeAssessment.module.scss'; 
import { AppContainer } from "@common/root";
import AppContext from "@common/root/app-context";
import { Spinner } from "@fluentui/react-components";

export const SpOnlineExample: React.FunctionComponent<ISpOnlineExampleProps> = (
  props
) => {
  const _isMounted = React.useRef(true); // Initial value _isMounted = true
  const [initialized, setInitialized] = React.useState<boolean>(false);

  const initializeApp = () => {
    try {
      const appContext = AppContext.getInstance();
      const siteName = !!props.settings.context.sdks.microsoftTeams ? "Council" : null;
      appContext.initialize(props.settings.context, siteName).then(async () => {
        if (_isMounted.current) {
          console.log("app initialized");
          await appContext.addSetting(props.settings);
          await appContext.setIsDarkTheme(props.isDarkTheme);
          await appContext.setLayoutStyle(props.settings?.enableLayoutStyle);
          await appContext.setSiteName(
            props.settings?.siteName
              ? props.settings?.siteName
              : "SPFx Test App"
          );
          setInitialized(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (props.settings.context) {
      initializeApp();
    }

    return () => {
      // ComponentWillUnmount in Class Component
      _isMounted.current = false;
    };
  }, [props.settings]);

  return (
    <>
      {initialized ? (
        <>
          <AppContainer>
            <ApplicationEntry />
          </AppContainer>
        </>
      ) : (
        <div style={{ minHeight: "60vh", marginTop: "20vh" }}>
          <Spinner label="Loading, Please Wait..." />
        </div>
      )}
    </>
  );
};
