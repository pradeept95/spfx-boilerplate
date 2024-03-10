/* eslint-disable */
import * as React from "react";
import { ISpOnlineExampleProps } from "./ISpOnlineExampleProps";

import AppRoot from "@app/AppRoot";

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
      appContext.initialize(props.settings).then(async () => {
        if (_isMounted.current) {
          await appContext.setIsDarkTheme(props.isDarkTheme);
          await appContext.setLayoutStyle(props.settings?.enableLayoutStyle);
          await appContext.setSiteName(
            props.settings?.siteName
              ? props.settings?.siteName
              : "SPFx Test App"
          );
          console.log("app initialized");
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
            <AppRoot />
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
