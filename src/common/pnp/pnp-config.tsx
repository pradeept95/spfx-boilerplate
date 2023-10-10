/* eslint-disable */
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { LogLevel, PnPLogging } from "@pnp/logging";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import { SPFx as graphSPFx, GraphFI, graphfi } from "@pnp/graph";

import "@pnp/graph/presets/all";
import "@pnp/graph";
import "@pnp/graph/users";
import "@pnp/sp/presets/all"; 
import { createSiteUrl } from "@common/shared/utils/createSiteUrl";

declare global {
  interface Window {
    _SP: SPFI;
    _GraphFI: GraphFI;
    __SPFxContext: WebPartContext;
  }
}

export const getSP = async (
  context?: WebPartContext,
  siteName?: string
): Promise<SPFI> => {
  // initialize if _SP is null and Context is provided
  if (!window._SP && (context !== null || context !== undefined)) {
    // Set sp as the global variable so we don't have to pass webpartcontext deep down to the child component
    // initialize once at init
    const siteUrl = siteName
      ? createSiteUrl(siteName)?.toString()
      : context.pageContext.web.absoluteUrl;

    window._SP = await spfi(siteUrl)
      .using(SPFx(context))
      .using(PnPLogging(LogLevel.Error));
    
    window.__SPFxContext = context;
  }

  return new Promise((resolve, reject) => {
    if (window._SP) resolve(window._SP);
    else reject("PnpSP is Not Initialized");
  });
};

export const getGraphFi = async (
  context?: WebPartContext
): Promise<GraphFI> => {
  // initialize if _SP is null and Context is provided
  if (!window._GraphFI && (context !== null || context !== undefined)) {
    // Set sp as the global variable so we don't have to pass webpartcontext deep down to the child component
    // initialize once at init
    window._GraphFI = await graphfi()
      .using(graphSPFx(context))
      .using(PnPLogging(LogLevel.Error));
    
    window.__SPFxContext = context;
  }

  return new Promise((resolve, reject) => {
    if (window._GraphFI) resolve(window._GraphFI);
    else reject("GraphFi is Not Initialized");
  });
};
