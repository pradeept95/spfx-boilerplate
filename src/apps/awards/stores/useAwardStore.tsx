/* eslint-disable */
import * as React from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AwardCategoryService } from "../shared/services";
import { AwardStoreType } from "./AwardStoreTypes";

const { getAwardCategory } = AwardCategoryService();

const store = (set, get) =>
  ({
    awardCategories: {
      data: [],
      status: "loading",
      error: undefined,
    },
    activeCategoryId: 0,

    updateCategory: (categoryId: number) => {
        set({
            activeCategoryId: categoryId
        });
    },

    initializeStore: async () => {
      try {
        const result = await Promise.allSettled([getAwardCategory()]);

        const awardCategories = {
          data: result[0].status === "fulfilled" ? result[0].value : [],
          status: result[0].status === "fulfilled" ? "succeeded" : "failed",
          error: result[0].status === "rejected" ? result[0].reason : undefined,
        };

        // set first award category as active
        const activeCategoryId = +awardCategories?.data?.[0]?.id;

        set({
          awardCategories,
          activeCategoryId,
        });
      } catch (error) {
        // log the error
        console.error(error);

        // TODO - handle the error - send proper notification to the user
      } finally {
      }
    },
  } as AwardStoreType);

export const useAwardStore = create(
  devtools<AwardStoreType>(store, {
    name: "Award Store",
  })
);

export function useInitializeAwardStore() {
  const { initializeStore } = useAwardStore();

  React.useEffect(() => {
    initializeStore();
  }, []);
}
