# SPFx Startup Boilerplate

## Summary

This application could be use to create a new solution. It already has some pre-build features like pnp-js configuration, default grid view, formik and yup setup for form validation, people picker and user profile details services etc

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.13-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
 
## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---
 
## Development Environment
- Node Version : >=16.13.0 <17.0.0
- ├── @microsoft/generator-sharepoint@1.16.0
- ├── corepack@0.14.1
- ├── gulp-cli@2.3.0
- ├── npm@8.19.2
- └── yo@4.3.1


## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**


## Features

Following features are already in place.

- Routing
- pnp-sp, pnp-graph config, getSP() and getGraphi() function
- formik and yup for form state management and validation
- Built-In Components
  - People Picker
  - Alert (default, success, error, info, warning)
  - Loading (hide, show)
  - Rich Text Editor & Viewer
  - E-Signature

- Built-In Services
  - UserService - searchUser [In AD], getUserProfile, ensureUser, mapUserFromSPList etc.

- Built-In hooks
  - useAlert 
  - useLoading etc

- Multiple Layouts
  - Layout Available Components  (Footer, SideNav, TopNav)

- Application wide Setting
  - Site Name 
  - Enable/Disable Notification
  - Enable/Disable App Debug Mode
  - FullScreen Layout 

- SP Theme Support!
 


## For details about the spfx and other sharepoint solution, please follow following links

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
