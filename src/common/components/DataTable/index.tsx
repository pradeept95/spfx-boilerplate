/* eslint-disable */
import { Stack } from "@fluentui/react";
import * as React from "react"; 
import { DataTableGridWrapper } from "./components/DataTableWrapper";
import { DataTableContextProvider } from "./context/DataTableContext";
import { IDatagridType } from "./types/DataTableProps";

export const DataTableGrid: React.FunctionComponent<IDatagridType<any>> = React.forwardRef((
  props, ref
) => {
  return (
    <Stack>
      <DataTableContextProvider {...props}>
        <DataTableGridWrapper {...props}/>
      </DataTableContextProvider>
    </Stack>
  );
});
