/* eslint-disable */
import { useTrackPageView } from "@common/hooks/useTrackPageView";
import { useListSubscription } from "@common/list-subscriptions";
import { getSP } from "@common/pnp";
import AppContext from "@common/root/app-context";
import React from "react";

const currentContext = AppContext.getInstance();
function useRealTimeExample() {
  useTrackPageView({
    name: "Realtime Example",
  });
  
  const [et, setEmailTemplates] = React.useState<any[]>([]);

  const loadEmailTemplates = async () => {
    console.log("loadEmailTemplates");

    try {
      const sp = await getSP(currentContext.context);
      const items: any[] = await sp.web.lists
        .getByTitle("EmailTemplates")
        .items();

      console.log(items);
      setEmailTemplates(items);
    } catch (error) {
      console.log(error);
      setEmailTemplates([]);
    } 
  };

  useListSubscription({
    listIdOrListName: "EmailTemplates",
    onChange: loadEmailTemplates, 
  });

  React.useEffect(() => {
    loadEmailTemplates();
  }, []);

  return {
    et,
  } as const;
};

export const RealTimeExample: React.FC = () => {
    const { et } = useRealTimeExample();
    
    React.useEffect(() => {
      console.log("RealTimeExample mounted", et);
      return () => {
        console.log("RealTimeExample unmounted");
      };
    }, [et]);

  return (
    <>
      <h2>Realtime Example</h2>
      <p>
        This page shows how to use the useListSubscription hook to automatically
        refresh the data when the list changes.
      </p>
      <ul>
        {et && et.map((item) => {
          return <li key={item.Id}>{item.Title}</li>;
        })}
      </ul>
      {et.length === 0 && <p>No email templates found</p>}
    </>
  );
}
 
 