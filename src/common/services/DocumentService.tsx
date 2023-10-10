/* eslint-disable  */
import { getSP } from "@common/pnp";
import "@pnp/sp/attachments";
import { IAttachmentInfo } from "@pnp/sp/attachments";
import { IItem } from "@pnp/sp/items/types";

export type ChoiceFieldOption = {
  value: string;
  label: string;
};

export const DocumentService = () => {
  (async () => {})();

  const uploadDocumentsToListItem = async (
    listName: string,
    itemId: number,
    documents: File[]
  ): Promise<boolean> => {

    if (!documents || documents.length === 0) {
      return true;
    }

    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const sp = await getSP();

        const listItem: IItem = sp.web.lists
          .getByTitle(listName)
          .items.getById(itemId);

        if (listItem) {
          for (const document of documents) {
            const newFileName = `${document.name}`;
            await listItem.attachmentFiles.add(newFileName, document);
          }
        }

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getDocumentsFromListItem = async (
    listName: string,
    itemId: number 
  ): Promise<IAttachmentInfo[]> => {
     
    return new Promise<IAttachmentInfo[]>(async (resolve, reject) => {
      try {
        const sp = await getSP();

        const listItem: IItem = sp.web.lists
          .getByTitle(listName)
          .items.getById(itemId);
        
        const attachments = await listItem.attachmentFiles(); 
        resolve(attachments);
      } catch (error) {
        reject(error);
      }
    });
  };

  const uploadDocumentsToDocumentLibrary = async (
    documentRelativePath: string, 
    documents: File[],
    metaData: any
  ): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const sp = await getSP();

        const promises = documents.map((document) => {
          return sp.web
            .getFolderByServerRelativePath(documentRelativePath)
            .files.addUsingPath(document.name, document, { Overwrite: true });
        });

        const file = await Promise.allSettled(promises);
 
        resolve(file);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getDocumentsFromDocumentLibrary = async(
    documentRelativePath: string
  ): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const sp = await getSP();

        const files = await sp.web
          .getFolderByServerRelativePath(documentRelativePath)
          .files();

        resolve(files);
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    uploadDocumentsToListItem,
    getDocumentsFromListItem,

    uploadDocumentsToDocumentLibrary,
    getDocumentsFromDocumentLibrary,
  } as const;
};
