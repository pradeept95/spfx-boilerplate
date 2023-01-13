/* eslint-disable */ 
import { LoadingPros, useLoadingContext } from "../context/LoadingContext";

export const useLoading = () => {
  (async () => {})();

  const { setLoadingState } = useLoadingContext();

  const showLoader = (loadingText?: string) => {
    try {
      setLoadingState({
        loading: true,
        loadingText: loadingText,
      } as LoadingPros);
    } catch (error) {
      console.log("showLoader -> error", error);
      throw error;
    }
  };

  const hideLoader = () => {
    try {
      setLoadingState({
        loading: false,
      } as LoadingPros);
    } catch (error) {
      console.log("showLoader -> error", error);
      throw error;
    }
  };

  return {
    showLoader,
    hideLoader,
  };
};
