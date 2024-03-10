import { defineConfig } from "cypress";
import * as spauth from "node-sp-auth";

const appURI = "https://nih.sharepoint.com/sites/NINDS-OD-DEAATEAM";

let getLogin = async () => {
  const username = "<<username>>";
  const password = "<<password>>";
  const pageUrl = appURI + "/SitePages/Home.aspx";

  // Connect to SharePoint
  const data = await spauth.getAuth(pageUrl, {
    username: username,
    password: password,
  });
  return data;
};

export default defineConfig({
  e2e: {
    baseUrl: appURI,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        // deconstruct the individual properties
        getLogin() {
          return getLogin();
        },
      });
    },
  },
});
