import { AwardCategory } from "../shared/types";

export type ItemStoreType<TObjType> = {
  data: TObjType;
  status: "loading" | "succeeded" | "failed";
  error?: string;
}; 
 
export type AwardStoreType = {
  awardCategories: ItemStoreType<AwardCategory[]>;

  activeCategoryId: number;
  updateCategory: (categoryId: number) => void;

  initializeStore: () => Promise<void>;
};
 