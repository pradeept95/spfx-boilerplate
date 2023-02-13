/* eslint-disable */
import { IColumn } from "@fluentui/react";
import { useDataTable } from "..//hooks/useDataTable";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../types/DataTableConst";
import { IDataGridColumn } from "../types/DataTableProps";
import { LogicalExpression } from "../types/FilterExpression";
import {
  copyAndSort,
  copyAndSortByMultiple,
  evaluateLogicalExpression,
  getGroups,
} from "../utils/GridHelpers";

export const useGridService = () => {
  (async () => {})();

  const dataGrid = useDataTable();

  // pagination services
  const onPageChange = (currentPage: number) => {
    dataGrid.setCurrentPage(currentPage);
  };

  const onPageSizeChange = (pageSize: number) => {
    dataGrid.setCurrentPage(1);
    dataGrid.setPageSize(pageSize);
  };

  // sort services
  const sortDataGrid = (
    column: IColumn,
    columns: IColumn[],
    filteredItems: any[]
  ) => {
    const newColumns = [...columns];
    const groupedColumn: IColumn = newColumns?.filter(
      (col: IColumn) => col.isGrouped
    )?.[0];

    const filteredSortedItems = !!groupedColumn
      ? copyAndSortByMultiple(
          filteredItems,
          [groupedColumn?.fieldName, column?.fieldName],
          [!groupedColumn?.isSortedDescending, column.isSortedDescending]
        )
      : copyAndSort(
          filteredItems,
          column.fieldName!,
          column.isSortedDescending
        );

    // prepare and set new columns
    newColumns.forEach((newCol: IColumn) => {
      if (newCol?.fieldName === column?.fieldName) {
        newCol.isSortedDescending = !column.isSortedDescending;
        newCol.isSorted = true;
        console.log(
          `${newCol.name} is sorted ${
            newCol.isSortedDescending ? "descending" : "ascending"
          }`
        );
      } else if (
        groupedColumn &&
        newCol?.fieldName === groupedColumn?.fieldName
      ) {
        newCol.isSortedDescending = column.isSortedDescending;
        newCol.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
      newCol.showSortIconWhenUnsorted = true;
      // newCol.isGrouped = false;
    });

    // make sure grouping persist
    if (groupedColumn) {
      const newGroups = getGroups(filteredSortedItems, groupedColumn);
      dataGrid.setGroups([...newGroups]);
      dataGrid.setPageSize(MAX_PAGE_SIZE);
    }

    dataGrid.setColumns([...newColumns]);

    // reset page to 1 on sort
    dataGrid.setCurrentPage(1);

    //set sorted filtered item to filtered item
    dataGrid.setFilteredItems([...filteredSortedItems]);
  };

  // group services
  const groupAllItemsByColumn = (
    column: IColumn,
    columns: IColumn[],
    filteredItems: any[]
  ) => {
    const filteredSortedItems = copyAndSort(
      filteredItems,
      column.fieldName!,
      column.isSortedDescending
    );

    const newGroups = getGroups(filteredSortedItems, column);

    // reset page to 1 on sort
    dataGrid.setCurrentPage(1);
    // set pagesize to max
    dataGrid.setPageSize(MAX_PAGE_SIZE);

    // prepare and set new columns
    const newColumns = [...columns];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol?.fieldName === column?.fieldName) {
        newCol.isGrouped = true;
      } else {
        newCol.isGrouped = false;
      }
    });

    dataGrid.setColumns(newColumns);

    dataGrid.setGroups([...newGroups]);

    //set sorted filtered item to filtered item
    dataGrid.setFilteredItems([...filteredSortedItems]);
  };

  const resetColumnGroup = (columns: IColumn[], filteredItems: any[]) => {
    // reset page to 1 on sort
    dataGrid.setCurrentPage(1);
    // set pagesize to default
    dataGrid.setPageSize(DEFAULT_PAGE_SIZE);

    // prepare and set new columns
    const newColumns = [...columns];
    newColumns.forEach((newCol: IColumn) => {
      newCol.isGrouped = false;
    });

    dataGrid.setColumns(newColumns);

    dataGrid.setGroups(undefined);

    //set sorted filtered item to filtered item
    dataGrid.setFilteredItems(filteredItems);
  };

  //filter services
  const filterDataGrid = (
    isGlobalFilter: boolean,
    currentFilterColumn: IDataGridColumn,
    globalFilterText?: string
  ) => {
    const clonedColumns = dataGrid?.columns?.slice(0)?.map((newCol) => {
      if (newCol?.fieldName === currentFilterColumn?.fieldName) {
        newCol.filterExpression = currentFilterColumn.filterExpression;
      }
      return newCol;
    });

    // perform global filter
    let currentFilteredItems: any[] = [...dataGrid.items];
    const filterText = isGlobalFilter
      ? globalFilterText
      : dataGrid.globalFilterText;
    if (filterText?.length) {
      currentFilteredItems = currentFilteredItems?.filter(function (item: any) {
        return Object.keys(item).some(function (k) {
          return (
            (item as any)?.[k]
              ?.toString()
              ?.toLowerCase()
              ?.indexOf(`${filterText}`?.toLocaleLowerCase()) > -1
          );
        });
      });
    }

    // perform all column level filtering
    const allColumnExpressions = clonedColumns
      ?.filter((col) => !!col.filterExpression)
      ?.map((col) => col.filterExpression as LogicalExpression);

    const expression: LogicalExpression = {
      condition: "and",
      expressions: allColumnExpressions,
    };

    currentFilteredItems = currentFilteredItems?.filter((item: any) =>
      evaluateLogicalExpression(expression, item)
    );

    // make sure grouping persist
    const groupedColumn: IColumn = dataGrid.columns?.filter(
      (col: IColumn) => col.isGrouped
    )?.[0];

    if (groupedColumn) {
      const filteredSortedItems = copyAndSort(
        currentFilteredItems,
        groupedColumn?.fieldName!,
        groupedColumn.isSortedDescending
      );
      const newGroups = getGroups(filteredSortedItems, groupedColumn);
      dataGrid.setGroups([...newGroups]);
      dataGrid.setFilteredItems(filteredSortedItems);
      dataGrid.setPageSize(MAX_PAGE_SIZE);
    } else {
      //set sorted filtered item to filtered item
      dataGrid.setFilteredItems(currentFilteredItems?.splice(0));
    }

    // reset page to 1 on search start
    dataGrid.setCurrentPage(1);

    // set columns
    dataGrid.setColumns(clonedColumns);
  };

  const resetGridFilter = () => {
    // reset expression
    const expression: any = {};
    expression.expressions = [];

    // reset global filter and all expression
    dataGrid.setGlobalFilterText("");
    // dataGrid.setFilterExpression(expression);

    // set columns
    const clonedColumns = dataGrid?.columns?.slice(0)?.map((newCol) => {
      newCol.filterExpression = undefined;
      return newCol;
    });
    dataGrid.setColumns(clonedColumns);

    // reset group
    // make sure grouping persist
    const groupedColumn: IColumn = dataGrid.columns?.filter(
      (col: IColumn) => col.isGrouped
    )?.[0];

    if (groupedColumn) {
      const filteredSortedItems = copyAndSort(
        dataGrid.items,
        groupedColumn?.fieldName!,
        groupedColumn.isSortedDescending
      );
      const newGroups = getGroups(filteredSortedItems, groupedColumn);
      dataGrid.setGroups([...newGroups]);
      dataGrid.setFilteredItems(filteredSortedItems);
      dataGrid.setPageSize(MAX_PAGE_SIZE);
    } else {
      //set sorted filtered item to filtered item
      dataGrid.setFilteredItems(dataGrid.items);

      // set pagesize to default
      dataGrid.setPageSize(DEFAULT_PAGE_SIZE);
    } 

    // reset page to 1 on search start
    dataGrid.setCurrentPage(1);
  };

  return {
    onPageChange,
    onPageSizeChange,

    sortDataGrid,

    groupAllItemsByColumn,
    resetColumnGroup,

    filterDataGrid,
    resetGridFilter,
  };
};
