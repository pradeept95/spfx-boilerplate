import AppContext from "@common/root/app-context";

const currentContext = AppContext.getInstance();
export function createSiteUrl(siteName: string): URL {
  try {
    const siteLiterals =
      currentContext?.context?.pageContext?.web?.absoluteUrl?.split("/");
    siteLiterals?.splice(siteLiterals.length - 1, 1, siteName);
    const siteUrl = siteLiterals?.join("/");
    return new URL(
      siteUrl,
      currentContext?.context.pageContext.web.absoluteUrl
    );
  } catch (e) {
    console.log(e);
    return new URL(currentContext?.context.pageContext.web.absoluteUrl);
  }
}
