/* eslint-disable */
import "@pnp/graph/users";
import "@pnp/sp/profiles";
import { getSP } from "../../../common/config/pnpjs.config"; 
import AwardType from "../models/AwardType";

export const AwardTypeService = () => {
  (async () => {})();

  const getAllAwardTypes = (): Promise<AwardType[]> => {
    return new Promise<AwardType[]>(async (resolve, reject) => {
      try {
        const sp = await getSP();

        const awardTypes = (
          await sp.web.lists.getByTitle("AwardType").items()
        ).map((awardType) => {
          return {
            id: awardType?.["ID"],
            title: awardType?.["Title"],
          } as AwardType;
        });
        
        resolve(awardTypes);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getAwardTypesById = (id: number): Promise<AwardType> => {
    return new Promise<AwardType>(async (resolve, reject) => {
      try {
        const sp = await getSP();

        const awardTypeItem = await sp.web.lists
          .getByTitle("AwardType")
          .items.getById(id)();
         
        const award = {
          id: awardTypeItem?.["ID"],
          title: awardTypeItem?.["Title"],
        } as AwardType;
 
        resolve(award);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getAllAwardTypes,
    getAwardTypesById,
  };
};
