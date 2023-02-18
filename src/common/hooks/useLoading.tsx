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
      throw error;
    }
  };

  const hideLoader = () => {
    try {
      setLoadingState({
        loading: false,
      } as LoadingPros);
    } catch (error) {
      throw error;
    }
  };

  return {
    showLoader,
    hideLoader,
  };
};
