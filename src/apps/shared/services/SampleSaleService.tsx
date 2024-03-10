/* eslint-disable */

import { getSP, handleError } from "@common/pnp";
import { SampleSales } from "../models/sample-sales.model";
import AppContext from "@common/root/app-context";
import { SeverityLevel } from "@microsoft/applicationinsights-web";

export const SampleSaleService = () => {
  (async () => { })();  

  const getAllSalesData = async () => {
    try {
      const sp = await getSP();
      const items: SampleSales[] = (
        await sp.web.lists.getByTitle("SampleSalesList").items.top(93)()
      )?.map((item) => {
        const createdDate = getRandomDate(new Date("01/01/2010"), new Date());
        const updatedDate = getRandomDate(createdDate, new Date());
        return {
          id: +item?.["ID"],
          region: item?.["field_1"],
          city: item?.["field_2"],
          category: item?.["field_3"],
          product: item?.["field_4"],
          quantity: +item?.["field_5"],
          unitPrice: +item?.["field_6"],
          totalPrice: +item?.["field_7"],
          created: createdDate,
          updated: updatedDate,
        } as SampleSales;
      });

      console.log(items); 

      const { appInsights, context } = AppContext.getInstance();
      console.log(appInsights)

      appInsights?.trackException({
        exception: new Error("Test"),
        severityLevel: 3,
        properties: {
          error: JSON.stringify("Test"),
          function: "getAllSalesData",
          user: context?.pageContext?.user,
        },
      });

      return items;
    } catch (error) { 
      handleError(error);
      const { appInsights, context } = AppContext.getInstance();
      appInsights?.trackException({
        exception: error,
        properties: {
          error: JSON.stringify(error),
          function: "getAllSalesData", 
          user: context?.pageContext?.user,
        },
        severityLevel: SeverityLevel.Error,
      });
      return [];
    }
  };

  return {
    getAllSalesData,
  };
};

function getRandomDate(from: Date, to: Date) {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime));
}
