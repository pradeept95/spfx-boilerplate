/* eslint-disable */ 
import * as React from "react";
import { toast } from "react-toastify";
import AppContext from "../../../../common/config/app-context.config";
import { MyNINDSActions } from "../model/my-ninds.model";
import { MyNINDSService } from "../services/MyNINDSService";

const { getAllPendingAction } = MyNINDSService();
const currrentContext = AppContext.getInstance();

export const useGetAllPendingActions = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [pendingActions, setPendingActions] = React.useState<MyNINDSActions[]>([]);

  const getAllPendingActions = async () => {
    try {
      setLoading(true);
      const username =  currrentContext.context.pageContext.user?.loginName?.replace("@nih.gov", "");
      const items = await getAllPendingAction(username);
      setPendingActions(items);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllPendingActions();
  }, []);

  return [loading, pendingActions, getAllPendingActions] as const;
};

export const useGetPendingActionById = () => { 
  const [pendingAction, setPendingAction] = React.useState<MyNINDSActions>(null);

  const getPendingActionById = async (id: string) => {
     let toastId = undefined;
    try { 
      toastId = toast.loading("Please wait. Loading Task...", {
        theme: "dark",
      });
      const username =
        currrentContext.context.pageContext.user?.loginName?.replace(
          "@nih.gov",
          ""
        );
      const items = await getAllPendingAction(username);
      const action = items?.filter((x) => x.id == id)?.[0];
      setPendingAction(action);
    } finally {
      toast.update(toastId, {
        render: "Task Successfully Loaded",
        type: "success",
        isLoading: false,
        theme: "dark",
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  };
 

  return [pendingAction, getPendingActionById] as const;
};
