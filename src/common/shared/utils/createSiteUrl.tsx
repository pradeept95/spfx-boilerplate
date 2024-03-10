import AppContext from "@common/root/app-context";

export function createSiteUrl(siteName: string): URL {
  const { context } = AppContext.getInstance();
  try {
    const siteLiterals = context?.pageContext?.web?.absoluteUrl?.split("/");
    siteLiterals?.splice(siteLiterals.length - 1, 1, siteName);
    const siteUrl = siteLiterals?.join("/");
    return new URL(siteUrl, context.pageContext.web.absoluteUrl);
  } catch (e) {
    console.log(e);
    return new URL(context.pageContext.web.absoluteUrl);
  }
}
