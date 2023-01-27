/* eslint-disable */
import { IColumn, IGroup } from "@fluentui/react";
import { LogicalExpression } from "./FilterExpression";

export type DataTableContextType = {
  items: any[];
  filteredItems: any[];
  pagedItems: any[];
  selectedItems: any[];

  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  setFilteredItems: React.Dispatch<React.SetStateAction<any[]>>;
  setPagedItems: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<any[]>>;

  pageSize: number;
  currentPage: number;
  totalNumberOfPages: number;

  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setNumberOfPages: React.Dispatch<React.SetStateAction<number>>;

  columns: IColumn[];
  setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>;

  filterExpression: LogicalExpression;
  globalFilterText: string;
  setFilterExpression: React.Dispatch<React.SetStateAction<LogicalExpression>>;
  setGlobalFilterText: React.Dispatch<React.SetStateAction<string>>;

  groups: IGroup[];
  setGroups: React.Dispatch<React.SetStateAction<IGroup[] | undefined>>;
};
