/* eslint-disable */

import { getSP } from "../../../common/config/pnpjs.config";
import { SampleSales } from "../models/sample-sales.model";

export const SampleSaleService = () => {
  (async () => {})();

  const getAllSalesData = async () => {
    try {
      const sp = await getSP();
      const items: SampleSales[] = (
        await sp.web.lists.getByTitle("SampleSalesList").items.top(10000)()
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
      return items;
    } catch (error) {
      console.log("showLoader -> error", error);
      throw error;
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
