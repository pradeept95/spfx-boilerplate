/* eslint-disable */
import { IComboBoxOption, ICommandBarItemProps } from '@fluentui/react';
import { LogicalExpression } from './FilterExpression';


export interface IDataGridProps<T> {
    key: string; 
    isLoading? : boolean;

    items: T[];
    columns: IDataGridColumn<T>[];

    selectionMode? : "disable" | "single" | "multiple";

    pageSize? : number;
    pageOptions? : IComboBoxOption[];

    expandDefaultGroups? : boolean,

    onSelectionChange?: (selectedItems: T[]) => void;
    onGetActionMenuItem? : (selectedItems: T[]) => ICommandBarItemProps[];
    onGetOverflowActionMenuItem? : (selectedItems: T[]) => ICommandBarItemProps[];

    onGetExportItems? : (selectedItems: T[]) => any[];
    onGetExportItem ?: (item: T) => any;
}


export interface IDataGridColumn<T> {
  name: string;
  key: string;
  fieldName: string;

  // field type
  dataType? : "text" | "number" | "date" | "html";
  dataFormat? : string;

  // grouping
  isGrouped?: boolean;
  groupOrderNumber?: number; 

  // filtering
  isFiltered?: boolean;
  filterType?: "text" | "longText" | "date" | "multiselect";
  filterExpression?: LogicalExpression;
  longTextCropLength? : number;

  // sorting
  isSorted?: boolean;
  isSortedDescending?: boolean;
  disableSort? : boolean;

  // hide show column
  disableHideShow?: boolean;
  hideInDefaultView?: boolean;

  disableAllColumnAction? : boolean;

  onRender?: (item: T) => JSX.Element;
}