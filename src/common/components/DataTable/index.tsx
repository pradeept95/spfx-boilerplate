/* eslint-disable */
import {
  ShimmeredDetailsList,
  DetailsListLayoutMode,
  MarqueeSelection,
  Selection,
  SelectionMode,
  Spinner,
  SearchBox,
  IDetailsListProps,
  IStyle,
  Stack,
  mergeStyles,
  IDetailsRowProps,
  IRenderFunction,
} from "@fluentui/react";
import * as React from "react";
import PaginationComponent from "./components/PaginationComponent";
import useDataTable from "./hooks/useDataTable";
import { DEFAULT_PAGE_SIZE } from "./types/DataTableConst";
import { IDatagridType } from "./types/DataTableProps";

const dataGridContainerStyle: IStyle = {
  minHeight: "60vh",
};

const _getKey = (item: any, index?: number): string => {
  return item?.id;
};
 
export const DataTableGrid: React.FunctionComponent<IDatagridType<any>> = (
  props
) => {
  const { loading } = props;
  
  const propsWithDefault = {
    ...props,
    pageSize: props?.pageSize ?? DEFAULT_PAGE_SIZE,
  };

  const [
    pagedItems,
    filteredItems,
    columns,
    currentPage,
    pageSize,
    onPageChange,
    onFilterTable,
  ] = useDataTable<IDatagridType<any>>(propsWithDefault);
  
  const _selection = new Selection({
    onSelectionChanged: () => {
      console.log(_getSelectionDetails());  
    }, 
    getKey: _getKey,
  });

  const _getSelectionDetails = (): string => {
    const selectionCount = _selection.getSelectedCount(); 
    switch (selectionCount) {
      case 0:
        return "No items selected";
      case 1:
        return "1 item selected";
      default:
        return `${selectionCount} items selected`;
    }
  }; 

  const dataTableProps: IDetailsListProps = {
    ...props,
    getKey: _getKey,
    items: pagedItems ?? [],
    columns: columns,
    compact: true,
    setKey: "id",
    selectionMode: SelectionMode.multiple,
    layoutMode: DetailsListLayoutMode.fixedColumns,
    isHeaderVisible: true,
    selection: _selection,
    selectionPreservedOnEmptyClick: true,
    enterModalSelectionOnTouch: true,
    ariaLabelForSelectionColumn: "Toggle selection",
    ariaLabelForSelectAllCheckbox: "Toggle selection for all items",
    checkButtonAriaLabel: "select row", 
    onRenderRow: (
      props: IDetailsRowProps,
      defaultRender?: IRenderFunction<IDetailsRowProps>
    ): JSX.Element => {
      return (
        <div data-selection-toggle="true">
          {defaultRender && defaultRender(props)}
        </div>
      );
    },
  };

  const detailsList = React.useMemo(
    () => (
      <MarqueeSelection selection={_selection}>
        <ShimmeredDetailsList {...dataTableProps} enableShimmer={loading}/>
        <div>
          {loading && <Spinner label="Please Wait..." />}
          {!pagedItems?.length && <div> No Record to Display</div>}
        </div>
      </MarqueeSelection>
    ),
    [_selection, columns]
  );

  return (
    <>
      <Stack>
        <div className={mergeStyles(dataGridContainerStyle)}>
          <Stack enableScopedSelectors>
            <Stack.Item>
              <SearchBox
                placeholder="Search"
                onChange={(_, searchTerm: string) => onFilterTable(searchTerm)}
              />
            </Stack.Item>
            <Stack.Item>{detailsList}</Stack.Item>
            <Stack.Item>
              <PaginationComponent
                totalCount={filteredItems?.length ?? 0}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </Stack.Item>
          </Stack>
        </div>
      </Stack>
    </>
  );
};
