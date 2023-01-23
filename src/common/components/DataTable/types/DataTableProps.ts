/* eslint-disable */
import { IColumn, IDetailsListProps } from "@fluentui/react";

interface DataGridProps<T> {
  gridKeyField : string,
  loading: boolean;
  items: T[];
  pageSize?: number;
  pageSizeOptions?: boolean;
  onSelectionChanged?: (selectedItems: any[]) => void;
  columns : IDataGridColumn[]
}

export type IDatagridType<T> = DataGridProps<T> & IDetailsListProps;
export type IDataGridColumn = IColumn & {
  filterType? : "text" | "multiselect"
};
