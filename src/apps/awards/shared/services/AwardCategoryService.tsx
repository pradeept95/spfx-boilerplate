/* eslint-disable */

import { getSP } from "@common/pnp";
import { AwardCategory } from "../types";
import { AwardCategorySchema } from "../types/schema";

const LIST_NAME = "AwardCategory";

const SELECT_COLUMNS = [
  "Id",
  "Title",
  "CategoryHeader",
  "CategoryDetails",
  "DefaultJustification",
  "Active",
  "SortOrder",
];

export const AwardCategoryService = () => {
  (async () => {})();

  const getAwardCategory = async (
    includeInActive: boolean = false
  ): Promise<AwardCategory[]> => {
    return new Promise<AwardCategory[]>(async (resolve, reject) => {
      try {
        const sp = await getSP();
        const awardCategories = (
          await sp.web.lists
            .getByTitle(LIST_NAME)
            .items.filter(includeInActive ? "" : "Active eq 1")
            .orderBy("SortOrder")
            .select(SELECT_COLUMNS.join(","))()
        ).map((awardCategory) => AwardCategorySchema.parse(awardCategory));

        resolve(awardCategories);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { getAwardCategory };
};
