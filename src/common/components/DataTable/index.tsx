/* eslint-disable */
import * as React from "react";
import { DataTableGridWrapper } from "./components/DataTableWrapper"; 
import { DataTableContextProvider } from "./context/DataTableContext";
import { IDatagridType } from "./types/DataTableProps";

export const DataTableGrid: React.FunctionComponent<IDatagridType<any>> = (
  props
) => {

  return (
    <>
      <DataTableContextProvider {...props}>
        <DataTableGridWrapper  {...props} />
      </DataTableContextProvider>
    </>
  );
};
