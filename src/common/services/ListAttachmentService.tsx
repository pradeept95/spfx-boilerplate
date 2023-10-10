/* eslint-disable */

import { getSP } from "@common/pnp";
import "@pnp/sp/attachments";

export const ListAttachmentService = () => {
  (async () => {})();

  const deleteAttachmentsOnListItem = (
    listName: string,
    itemId: number,
    fileName: string[]
  ): Promise<number> => {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const sp = await getSP();
        let item = sp.web.lists.getByTitle("ContractTasks").items.getById(itemId);
        if (item) {
          const deletePromises = fileName.map((name) =>
            item.attachmentFiles.getByName(name).delete(name)
          );
          await Promise.all(deletePromises);
        }
        resolve(itemId);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    deleteAttachmentsOnListItem,
  };
};
