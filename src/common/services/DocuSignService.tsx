/* eslint-disable */
import AppContext from "../config/app-context.config";
import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
} from "@microsoft/sp-http";

const authFunctionURL =
  "https://docusignfunctions.azurewebsites.net/api/DocuSignAuth?code=ltHFqutjIU4w_pZs_3vdbJFAf9YJjQXHNdfCy5PIxBwMAzFuFQh8qw==";
 

const currrentContext = AppContext.getInstance();
export const DocuSignService = () => {
  (async () => {})();

  const authorizeApp = async () => {
    const httpClientOptions: IHttpClientOptions = {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    return currrentContext.context.httpClient.get(authFunctionURL, HttpClient.configurations.v1, httpClientOptions)
      .then((res: HttpClientResponse): Promise<any> => {
        return res.json();
      })
      .then(async (response: any) => {
        console.log(response); 
        return response;
      });
  };

  const getUsers = async (userToken : string) => {
    const httpClientOptions: IHttpClientOptions = {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      }),
    };

    currrentContext.context.httpClient
      .get(
        "https://account-d.docusign.com/oauth/userinfo",
        HttpClient.configurations.v1,
        httpClientOptions
      )
      .then((res: HttpClientResponse): Promise<any> => {
        return res.json();
      })
      .then((response: any): void => {
        console.log("Users ",response);
      });
  };

    const createEnvelope = async (userToken: string, envelope: any) => {
      const httpClientOptions: IHttpClientOptions = {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(envelope),
      };

      currrentContext.context.httpClient
        .post(
          `https://docusignfunctions.azurewebsites.net/api/CreateEnvelope?code=jLIPmCsp5lnVyvdhkMdK9ckNL0qMZI9R8pKqaAmM7LWPAzFui7GZGA==&token=${userToken}`,
          HttpClient.configurations.v1,
          httpClientOptions
        )
        .then((res: HttpClientResponse): Promise<any> => {
          return res.json();
        })
        .then((response: any): void => {
          console.log("Users ", response);
        });
    };

  return {
    authorizeApp,
    getUsers,
    createEnvelope,
  };
};
