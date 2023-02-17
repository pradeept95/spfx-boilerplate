
/* eslint-disable */
import * as React from "react"; 
import FluentUIDataGridContainer from "./src/components/FluentUIDataGrid";
import { DataTableContextProvider } from "./src/context/GridContext";
import { DataGridProps } from "./src/types/DataGridProps";

export function FluentUIDataGrid<T extends {}>(props: DataGridProps<T>): JSX.Element {
  return (
    <DataTableContextProvider {...props}>
      <FluentUIDataGridContainer  {...props} /> 
    </DataTableContextProvider> 
  );
}