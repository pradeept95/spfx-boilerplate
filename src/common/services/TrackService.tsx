/* eslint-disable  */
import { getSP } from "@common/pnp";

export const TrackService = () => {
  (async () => {})();

  const trackActivity = async (
    title: string,
    actionType: "page" | "error" | "action",
    meta: any
  ) => {
    try {
      const sp = await getSP();

      const metaString = JSON.stringify(meta);

      const result = await sp.web.lists.getByTitle("Analytics").items.add({
        Title: title,
        Metadata: metaString,
        MetaType: actionType,
      });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    trackActivity,
  } as const;
};
