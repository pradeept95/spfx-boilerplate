/* eslint-disable */
import "@pnp/graph/users";
import "@pnp/sp/profiles";
import { MyNINDSActions } from "../model/my-ninds.model";
import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
} from "@microsoft/sp-http";
import AppContext from "../../../../common/config/app-context.config";

const currrentContext = AppContext.getInstance();
export const MyNINDSService = () => {
  (async () => {})();

  const getAllPendingAction = (userName: string): Promise<MyNINDSActions[]> => {
    return new Promise<MyNINDSActions[]>(async (resolve, reject) => {
      try {
        const requestBody = { AssignedTo: userName };

        const httpClientOptions: IHttpClientOptions = {
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(requestBody),
        };

        const response = await currrentContext.context.httpClient
          .post(
            `https://mynindsapitest.ninds.nih.gov/api/HttpTrigger-GetPendingActions?code=uJMwcL8cvpM0lbU2biwUYiWk9g6hUKkau0lQFYG4m09I6WGadN17qQ==`,
            HttpClient.configurations.v1,
            httpClientOptions
          )
          .then((res: HttpClientResponse): Promise<any> => {
            return res.json();
          })
          .then(async (response: any) => {
            console.log(response);
            return response;
          });

        console.log(response);
        resolve(response?.map((action: any) => new MyNINDSActions(action)));
      } catch (error) {
        reject(error);
      }
    });
  };

  const createTask = (taskDetails: any): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const taskBody = {
          ActionUrl: taskDetails?.actionURL,
          AssignedTo: taskDetails?.assignedTo?.[0]?.tertiaryText?.replace(
            "@nih.gov",
            ""
          ),
          CreatedBy: currrentContext?.context?.pageContext?.user?.displayName,
          Application: taskDetails?.application,
          ApplicationId: taskDetails?.applicationId,
          Active: taskDetails?.active,
          Action: taskDetails?.taskAction,
          Details: taskDetails?.taskDetails,
        };

        const httpClientOptions: IHttpClientOptions = {
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(taskBody),
        };
 
        await currrentContext.context.httpClient
          .post(
            `https://mynindsapitest.ninds.nih.gov/api/HttpTrigger-CreateAction?code=SHznnPcROQs9ofrHStQSC3OxJ6KSxnf/5/kj1ioBeeggJ2tafgGCVA==`,
            HttpClient.configurations.v1,
            httpClientOptions
          )
          .then((response) => resolve(true))
          .catch((error) => reject(error));

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getAllPendingAction,
    createTask,
  };
};
