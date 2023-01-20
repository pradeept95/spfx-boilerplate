/* eslint-disable */

import { getSP } from "../../../common/config/pnpjs.config";
import { SampleSales } from "../models/sample-sales.model";

export const SampleSaleService = () => {
  (async () => { })();

  const getAllSalesData = async () => {
    try {

      const sp = await getSP();
      const items: SampleSales[] = (await sp.web.lists.getByTitle("SampleSalesList").items.top(93)())
        ?.map(item => {
          return {
            region: item?.['field_1'],
            city: item?.['field_2'],
            category: item?.['field_3'],
            product: item?.['field_4'],
            quantity: +item?.['field_5'],
            unitPrice: +item?.['field_6'],
            totalPrice: +item?.['field_7']

          } as SampleSales;
        });
      return items;

    } catch (error) {
      console.log("showLoader -> error", error);
      throw error;
    }
  };

  return {
    getAllSalesData
  };

};
