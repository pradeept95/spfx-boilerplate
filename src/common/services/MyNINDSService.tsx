/* eslint-disable  */

export const POMUserService = () => {
  (async () => {})();

  const sendRequestToMyNINDS = (request: MyNINDSRequest): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
        };
        const postURl = "<<URL>>";

        const result = await fetch(postURl, requestOptions).then((response) => {
          console.log(response);
          return true;
        });

        resolve(result);
      } catch (error) {
        console.log("Error sending request to MyNINDS", error);
        reject(error);
      }
    });
  };

  return {
    sendRequestToMyNINDS,
  } as const;
};

export type MyNINDSRequest = {
  ActionUrl: string;
  AssignedTo: string;
  CreatedBy: string;
  Application: string;
  ApplicationId: string;
  Active: boolean;
  Action: string;
  Details: string;
};
