/* eslint-disable */
import {
  IColumn,
  IDetailsColumnProps,
  IDetailsListProps,
  IRenderFunction,
  ShimmeredDetailsList,
} from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import { useDataTable } from "..//hooks/useDataTable";
// import { useFiltering } from "../services/FilterGridService";
import { IDataGridColumn } from "../types/DataTableProps";
import { BasicExpression } from "../types/FilterExpression";
import GridColumnHeader from "./GridColumnHeader";

export const FluentUIDetailsList: React.FunctionComponent<
  IDetailsListProps & { loading: boolean }
> = (props) => {
  const { loading } = props;
  const [gridColumns, setGridColumns] = useState<IColumn[]>([]);
  const { pagedItems, filteredItems, columns, groups } = useDataTable();

  React.useEffect(() => {
    const newColumns = [...columns];

    newColumns.forEach((newCol: IDataGridColumn) => {
      //newCol.onColumnClick = (e, c) => sortDataGrid(c, newColumns, filteredItems);

      newCol.onRenderHeader = (
        colProps?: IDetailsColumnProps,
        defaultRender?: IRenderFunction<IDetailsColumnProps>
      ): JSX.Element | null => (
        <>
          <GridColumnHeader
            columnProp={colProps}
            defaultRender={defaultRender}
          />
        </>
      );
      newCol.showSortIconWhenUnsorted = false;
      const filter = newCol?.filterExpression;
      console.log(filter);
      if (
        filter &&
        filter?.expressions?.length &&
        filter?.expressions?.some(
          (exp: BasicExpression) =>
            !!exp.value &&
            ((exp.value as any)?.length ||
              (exp.value instanceof Date && exp.value?.getMonth()))
        )
      ) {
        newCol.isFiltered = true;
      } else {
        newCol.isFiltered = false;
      }
    });

    setGridColumns(newColumns);
  }, [columns, filteredItems]);

  return (
    <>
      <ShimmeredDetailsList
        {...props}
        // onRenderDetailsHeader={onRenderDetailsHeader}
        selection={props?.selection}
        groups={groups}
        items={pagedItems}
        columns={gridColumns}
        enableShimmer={loading}
      />
    </>
  );
};
