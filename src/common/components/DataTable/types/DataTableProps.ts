/* eslint-disable */
import { IColumn, ICommandBarItemProps, IDetailsListProps } from "@fluentui/react";
import { LogicalExpression } from "./FilterExpression";

interface DataGridProps<T> {
  //ref?: React.MutableRefObject<any>;
  gridKeyField: string;
  loading: boolean;
  items: T[];
  emptyItemsMessage?: string;
  emptyFilterResultMessage?: string;
  pageSize?: number;
  pageSizeOptions?: boolean;
  columns: IDataGridColumn[];  
  
  onGetContextMenuItem?: (selectedItems : T[]) => ICommandBarItemProps[]; 
  onSelectionChanged?: (selectedItems: any[]) => void;
  isDefaultGroupCollapsed?: boolean;
}

export type IDatagridType<T> = DataGridProps<T> & IDetailsListProps;
export type IDataGridColumn = IColumn & {
  filterType?: "text" | "multiselect" | "number" | 'date';
  disableAllColumnActions?: boolean;
  disableFilter?: boolean;
  disableSorting?: boolean;
  disableGrouping?: boolean;
  filterExpression?: LogicalExpression;
};
