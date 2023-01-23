/* eslint-disable */
import { IColumn } from "@fluentui/react";
import * as React from "react";
import { createContext, useState } from "react"; 
import { DEFAULT_PAGE_SIZE } from "../types/DataTableConst";
import { IDatagridType } from "../types/DataTableProps";
import { LogicalExpression } from "../types/FilterExpression";

const DataTableContext = createContext<any>({});
export default DataTableContext;

export const DataTableContextProvider: React.FunctionComponent<IDatagridType<any>> = (props) => {

  // storing items
  const [items, setItems] = useState<any[]>(props?.items);
  const [filteredItems, setFilteredItems] = useState<any[]>(props?.items);
  const [pagedItems, setPagedItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  // storing page Information
  const [pageSize, setPageSize] = useState<number>(props?.pageSize ?? DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalNumberOfPages, setNumberOfPages] = useState<number>(props?.items?.length);

  // store column information
  const [columns, setColumns] = useState<IColumn[]>(props?.columns);

  // for filtering
  const [filterExpression, setFilterExpression] = React.useState<LogicalExpression>();
  const [globalFilterText, setGlobalFilterText] = React.useState<string>();

  React.useEffect(() => {

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = ((startIndex + pageSize) > filteredItems?.length) ? filteredItems?.length : startIndex + pageSize;

    const pagedItems = filteredItems?.slice(startIndex, endIndex);
    setPagedItems(pagedItems);

    //calculate and set number of pages
    const totalFilteredItemCount = filteredItems?.length ?? 0;
    const totalPages = Math.floor(totalFilteredItemCount / pageSize) + (totalFilteredItemCount % pageSize > 0 ? 1 : 0);
    setNumberOfPages(totalPages);

    console.log("Recalculating Paged Items", startIndex, endIndex, pageSize, currentPage)

  }, [pageSize, currentPage, filteredItems]);

  React.useEffect(() => {
    setItems(props?.items);
    setFilteredItems(props?.items);
  }, [props?.items]);

  return (
    <DataTableContext.Provider value={{
      items, setItems,
      filteredItems, setFilteredItems,
      pagedItems, setPagedItems,
      selectedItems, setSelectedItems,

      pageSize, setPageSize,
      currentPage, setCurrentPage,
      totalNumberOfPages, setNumberOfPages,

      columns, setColumns,

      globalFilterText, setGlobalFilterText,
      filterExpression, setFilterExpression
    }}>
      {props.children}
    </DataTableContext.Provider>
  );
};
