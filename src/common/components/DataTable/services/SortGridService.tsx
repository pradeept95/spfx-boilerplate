/* eslint-disable */
import { IColumn } from "@fluentui/react";
import { useDataTable } from "..//hooks/useDataTable";

function _copyAndSort<T>(
  items: T[],
  columnKey: string,
  isSortedDescending?: boolean
): T[] {
  const key = columnKey as keyof T;
  return items
    .slice(0)
    .sort((a: T, b: T) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
    );
}

 export const useSorting = () => {
  (async () => {})();

  const { setColumns, setCurrentPage, setFilteredItems } = useDataTable();

  const sortDataGrid = (column : IColumn, columns : IColumn[], filteredItems : any[]) => {
      
     const filteredSortedItems = _copyAndSort(
      filteredItems,
      column.fieldName!,
      column.isSortedDescending
    );

    // reset page to 1 on sort
    setCurrentPage(1);
 
    // prepare and set new columns
    const newColumns = [...columns];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol?.fieldName === column?.fieldName) {
        newCol.isSortedDescending = !column.isSortedDescending;
        newCol.isSorted = true;
        console.log(
          `${newCol.name} is sorted ${
            newCol.isSortedDescending ? "descending" : "ascending"
          }`
        );
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      } 
      newCol.showSortIconWhenUnsorted = true;
    });
    setColumns(newColumns);

    //set sorted filtered item to filtered item
    setFilteredItems([...filteredSortedItems])
    
  };  

  return {
    sortDataGrid,
    
  };
};

