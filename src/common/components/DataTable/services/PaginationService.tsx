/* eslint-disable */
import { useDataTable } from "..//hooks/useDataTable";

 export const usePagination = () => {
  (async () => {})();

  const { setCurrentPage, setPageSize } = useDataTable();

  const onPageChange = (currentPage : number) => {
    setCurrentPage(currentPage)
  }; 


  const onPageSizeChange = (pageSize: number) => {
    setCurrentPage(1);
    setPageSize(pageSize);
  }; 

  return {
    onPageChange,
    onPageSizeChange
  };
};
