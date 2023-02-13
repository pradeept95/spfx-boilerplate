/* eslint-disable */ 
import { toast } from "react-toastify"; 
import { MyNINDSService } from "../services/MyNINDSService";

const { createTask } = MyNINDSService(); 

export const useCreateAndAssignTask = () => {
   
  const createAndAssignTask = async (data : any) => {
    let toastId = undefined;
    try {
       
      toastId = toast.loading("Please wait. Assigning Task...", {
        theme: "dark",
      });
      await createTask(data);

      
    } finally {
      toast.update(toastId, {
        render: "Action Successfully Completed",
        type: "success",
        isLoading: false,
        theme: "dark",
        closeOnClick: true,
        autoClose: 5000,
      });
    }
  }; 
  return [createAndAssignTask] as const;
};
