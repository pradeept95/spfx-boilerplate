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
import { useFiltering } from "../services/FilterGridService";
import GridColumnHeader from "./GridColumnHeader";

export const FluentUIDetailsList: React.FunctionComponent<
  IDetailsListProps & { loading: boolean }
> = (props) => {
  const { loading } = props;

  const [gridColumns, setGridColumns] = useState<IColumn[]>([]); 
  //
  const { filterExpression, pagedItems, filteredItems, columns, groups } =
    useDataTable();

  const { getExpressionForColumnIfExist } = useFiltering();

  // const _selection = new Selection({
  //   onSelectionChanged: () => {
  //     console.log(_getSelectionDetails(), selectedItems);
  //     const newSelectedItems = [...selectedItems, _selection.getSelection()];
  //     setSelectedItems(newSelectedItems);
  //   },
  //   getKey: (item: any) => item?.id,
  // });

    // const _getSelectionDetails = (): string => {
    //   const selectionCount = selection.getSelectedCount();
    //   switch (selectionCount) {
    //     case 0:
    //       return "No items selected";
    //     case 1:
    //       return "1 item selected";
    //     default:
    //       return `${selectionCount} items selected`;
    //   }
    // }; 
 

  React.useEffect(() => {
    const newColumns = [...columns];

    newColumns.forEach((newCol: IColumn) => {
      //newCol.onColumnClick = (e, c) => sortDataGrid(c, newColumns, filteredItems);

      (newCol.onRenderHeader = (
        colProps?: IDetailsColumnProps,
        defaultRender?: IRenderFunction<IDetailsColumnProps>
      ): JSX.Element | null => (
        <>
          <GridColumnHeader
            columnProp={colProps}
            defaultRender={defaultRender}
          />
        </>
      )),
        (newCol.showSortIconWhenUnsorted = false);

        const filter = getExpressionForColumnIfExist(
          filterExpression, newCol?.fieldName
        );

        if(filter && filter.value && (filter.value as any)?.length){
          newCol.isFiltered = true;
        }else {
          newCol.isFiltered = false;
        }
    });

    setGridColumns(columns);
  }, [columns, filteredItems]);

  // const onRenderDetailsHeader = (
  //   headerProps: IDetailsHeaderProps,
  //   defaultRender: (props?: IDetailsHeaderProps) => JSX.Element | null
  // ) => {
  //   if (!headerProps || !defaultRender) {
  //     //technically these may be undefined...
  //     return null;
  //   }  

  //   return defaultRender({
  //     ...headerProps,
  //     styles: {
  //       root: {
  //         // selectors: {
  //         //   ".ms-DetailsHeader-cell": {
  //         //     whiteSpace: "normal",
  //         //     textOverflow: "clip",
  //         //     lineHeight: "normal",
  //         //   },
  //         //   ".ms-DetailsHeader-cellTitle": {
  //         //     height: "100%",
  //         //     alignItems: "center",
  //         //   },
  //         // },
  //       },
  //     },
  //   });
  // };

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
