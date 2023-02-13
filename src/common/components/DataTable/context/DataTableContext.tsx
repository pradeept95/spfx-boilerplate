/* eslint-disable */
import {  IGroup } from "@fluentui/react";
import * as React from "react";
import { createContext, useState } from "react";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../types/DataTableConst";
import { DataTableContextType } from "../types/DataTableContextType";
import { IDataGridColumn, IDatagridType } from "../types/DataTableProps";
import { LogicalExpression } from "../types/FilterExpression";
import { copyAndSort, evaluateLogicalExpression, getGroups } from "../utils/GridHelpers";

const DataTableContext = createContext<Partial<DataTableContextType>>({});
export default DataTableContext;

export const DataTableContextProvider: React.FunctionComponent<
  IDatagridType<any>
> = (props) => {
  // storing items
  const [items, setItems] = useState<any[]>(props?.items);
  const [filteredItems, setFilteredItems] = useState<any[]>(props?.items);
  const [pagedItems, setPagedItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  // storing page Information
  const [pageSize, setPageSize] = useState<number>(
    props?.pageSize ?? DEFAULT_PAGE_SIZE
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalNumberOfPages, setNumberOfPages] = useState<number>(
    props?.items?.length
  );

  // store column information
  const [columns, setColumns] = useState<IDataGridColumn[]>(props?.columns);

  // for filtering
  // const [filterExpression, setFilterExpression] =
  //   React.useState<LogicalExpression>();
  const [globalFilterText, setGlobalFilterText] = React.useState<string>();

  const [groups, setGroups] = React.useState<IGroup[]>(undefined);

  React.useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex =
      startIndex + pageSize > filteredItems?.length
        ? filteredItems?.length
        : startIndex + pageSize;

    const pagedItems = filteredItems?.slice(startIndex, endIndex);
    setPagedItems(pagedItems);

    //calculate and set number of pages
    const totalFilteredItemCount = filteredItems?.length ?? 0;
    const totalPages =
      Math.floor(totalFilteredItemCount / pageSize) +
      (totalFilteredItemCount % pageSize > 0 ? 1 : 0);
    setNumberOfPages(totalPages);

    console.log(
      "Recalculating Paged Items",
      startIndex,
      endIndex,
      pageSize,
      currentPage
    );
  }, [pageSize, currentPage, filteredItems]);

  React.useEffect(() => {
    // return if no items
    if (!props?.items?.length) return;
 
    setItems(props?.items);

    // check if any default filter need to be applied
    let newFilteredItems = props?.items;

    const allFilterExpressions: LogicalExpression = {
      condition: "and",
      expressions: [
        ...props?.columns
          ?.filter((col) => !!col.filterExpression)
          ?.map((col) => col.filterExpression),
      ],
    };

    if (allFilterExpressions?.expressions?.length) {
      newFilteredItems = newFilteredItems?.filter((item: any) =>
        evaluateLogicalExpression(allFilterExpressions, item)
      ); 
    }
    
    setFilteredItems(newFilteredItems);

    // check if any default group need to be create
    const defaultGroupedColumn = props?.columns?.filter(
      (col) => col.isGrouped
    )?.[0]; // support only for one column;
    if (defaultGroupedColumn) {
      const filteredSortedItems = copyAndSort(
        newFilteredItems,
        defaultGroupedColumn?.fieldName!,
        defaultGroupedColumn.isSortedDescending
      );

      const newGroups = getGroups(filteredSortedItems, defaultGroupedColumn);  
      setGroups([...newGroups]);

      //set sorted filtered item to filtered item
      setFilteredItems([...filteredSortedItems]);
      setPageSize(MAX_PAGE_SIZE);
    } else {
      setGroups(undefined);
    }
  }, [props]);

  return (
    <DataTableContext.Provider
      value={{
        items,
        setItems,
        filteredItems,
        setFilteredItems,
        pagedItems,
        setPagedItems,
        selectedItems,
        setSelectedItems,

        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        totalNumberOfPages,
        setNumberOfPages,

        columns,
        setColumns,

        globalFilterText,
        setGlobalFilterText,
        // filterExpression,
        // setFilterExpression,

        groups,
        setGroups,
      }}
    >
      {props.children}
    </DataTableContext.Provider>
  );
};
