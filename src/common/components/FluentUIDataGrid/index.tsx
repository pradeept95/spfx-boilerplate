
/* eslint-disable */
import * as React from "react"; 
import FluentUIDataGridContainer from "./src/components/FluentUIDataGrid";
import { DataTableContextProvider } from "./src/context/GridContext";
import { IDataGridProps } from "./src/types/DataGridProps";

export function FluentUIDataGrid<T extends {}>(props: IDataGridProps<T>): JSX.Element {
  return (
    <DataTableContextProvider {...props}>
      <FluentUIDataGridContainer  {...props} /> 
    </DataTableContextProvider> 
  );
}