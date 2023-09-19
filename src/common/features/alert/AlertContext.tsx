/* eslint-disable */
import { Toaster, useId, useToastController } from "@fluentui/react-components";
import * as React from "react";  


export type DispatchToastOptions = {
  toastId?: string | undefined;
  intent?: "success" | "error" | "info" | "warning" | undefined;
  pauseOnHover?: boolean | undefined;
  pauseOnWindowBlur?: boolean | undefined;
  priority?: number;
  politeness?: "assertive" | "polite" | undefined;
  timeout?: number | undefined;
};

export type AlertContextType = { 
  dispatchToast: (
    content: React.ReactNode,
    options?: DispatchToastOptions
  ) => void;
  dismissToast: (toastId: string) => void;
  dismissAllToasts: () => void;
  updateToast: (options: any) => void;
  pauseToast: (toastId: string) => void;
  playToast: (toastId: string) => void;
};
 
export const AlertContext = React.createContext<Partial<AlertContextType>>({});

export const useAlertContext = () => {
  return React.useContext(AlertContext);
};

export const AlertProvider: React.FunctionComponent<{}> = ({ children }) => {
  const toasterId = useId("toaster"); 
  const toastController = useToastController(toasterId);
  
  return (
    <AlertContext.Provider value={{ ...toastController }}>
      <Toaster
        toasterId={toasterId}
        position="top-end"
        pauseOnHover
        pauseOnWindowBlur
      />
      {children}
    </AlertContext.Provider>
  );
};
