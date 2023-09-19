/* eslint-disable  */ 

export const POMUserService = () => {
  (async () => {})();

  const getUserDetails = (usernameOrNedId: string): Promise<Employee> => {
    return new Promise<Employee>(async (resolve, reject) => {
      try {
        const pomURL = `https://pom-function-prod.nindsase.appserviceenvironment.net/api/GetUserInfo?code=qBj-Ga89KmyOEsYeV316XfRtFbv5XR5r34DPuPg2xJNgAzFuR9gekA==&usernameOrNedId=${usernameOrNedId}`;
        const result = await fetch(pomURL);
        const employee = (await result.json()) as Employee;
        resolve(employee);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getUserDetails,
  } as const;
};


export type Employee = {
  NedId: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Email: string;
  Username: string;
  Title: string;
  Division: string;
  Classification: string;
  OrganizationPath: string;
  SACCode: string;
  EmployeeAddress: EmployeeAddress;
  Supervisor: Supervisor;
  AO: Ao;
}

export type EmployeeAddress = {
  AddressLine1: string;
  AddressLine2: string;
  Building: string;
  Room: string;
  City: string;
  State: string;
  PostalCode: string;
  Country: string;
}

export type Supervisor = {
  NedId: string;
  Name: string;
  Email: string;
  Username: string;
}

export type Ao = {
  NedId: string;
  Name: string;
  Email: string;
  Username: string;
}
