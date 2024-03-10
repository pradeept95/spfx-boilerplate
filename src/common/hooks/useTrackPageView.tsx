import * as React from "react";
import AppContext from "@common/root/app-context";
import { IPageViewTelemetry } from "@microsoft/applicationinsights-web";

export function useTrackPageView(
  pageViewTelemetry: IPageViewTelemetry = {}
): void {
  React.useEffect(() => {
    const { appInsights } = AppContext.getInstance();
    appInsights?.trackPageView({
      uri: window.location.href,
      ...pageViewTelemetry,
    });
  }, []);
}
