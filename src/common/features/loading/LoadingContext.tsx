/* eslint-disable */
import { LoadingSpinner } from "@common/features/loading/LoadingSpinner";
import * as React from "react";
import { createContext, useContext, useState } from "react"; 


const LoadingContext = createContext<any>({});
export default LoadingContext;

export const LoadingProvider: React.FunctionComponent<{}> = ({ children }) => {
  const [loadingState, setLoadingState] = useState({
    loading: false,
    loadingText: "Please Wait",
  } as LoadingPros);

  return (
    <LoadingContext.Provider value={{ loadingState, setLoadingState }}>
      <LoadingSpinner />
      {children}
    </LoadingContext.Provider>
  );
}; 

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};

export interface LoadingPros {
  loading: boolean;
  loadingText: string;
}
