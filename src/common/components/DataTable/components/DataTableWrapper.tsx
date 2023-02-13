/* eslint-disable */
import {
  SearchBox,
  IDetailsListProps,
  IStyle,
  Stack,
  mergeStyles, 
  DefaultButton,
  ConstrainMode,
  CommandBar,
  Selection,
  IStackStyles,
  FontIcon,
  IButtonProps,
  ICommandBarItemProps,
} from "@fluentui/react";
import * as React from "react";
import { useDataTable } from "../hooks/useDataTable";
import { clearFilterIcon } from "../types/DataTableConst";
import { IDatagridType } from "../types/DataTableProps";
import { FluentUIDetailsList } from "./FluentUIDetailsList";
import { Pagination } from "./Pagination";
import * as grdiStyle from "../styles/DataGrid.module.scss";
import { useGridService } from "../services/GridService";

const dataGridContainerStyle: IStyle = {
  minHeight: "60vh",
};

const emptyMsgIconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: "0 25px",
  padding: 20,
});

const dataGridEmptyMsgStyle: IStackStyles = {
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "10vh",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    border: "1px solid rgb(240 240 240)",
    paddingBottom: 30,
    marginTop: "-1rem",
  },
};

const overflowProps: IButtonProps = { ariaLabel: "More commands" };

export const DataTableGridWrapper: React.FunctionComponent<
  IDatagridType<any>
> = (props) => {
  const { globalFilterText, pagedItems } = useDataTable();
   const { filterDataGrid, resetGridFilter } = useGridService();

  const [contextMenuItems, setContextMenuItems] = React.useState<ICommandBarItemProps[]>([]); 
  const [contextOverflowMenuItems, setContextOverflowMenuItems] = React.useState<ICommandBarItemProps[]>([]); 
  const [contextFarMenuItems, setContextFarMenuItems] = React.useState<ICommandBarItemProps[]>([]); 
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [selectedItems, setSelectedItems] = React.useState<any[]>([]);
  const [selection] = React.useState(
    new Selection({
      onSelectionChanged: () => {
        const newSelectedItems = selection.getSelection();
        setSelectedItems(newSelectedItems);
      },
    })
  );

  const dataTableProps: IDetailsListProps = {
    ...props,
    constrainMode: props?.constrainMode ?? ConstrainMode.horizontalConstrained,
    ariaLabelForSelectionColumn: "Toggle selection",
    ariaLabelForSelectAllCheckbox: "Toggle selection for all items",
    checkButtonAriaLabel: "select row",
  };

  // callback to reset filter
  React.useEffect(() => {
    setFilterValue(globalFilterText ?? "");
  }, [globalFilterText]);

  React.useEffect(() => {
    console.log(selectedItems);

    if (props?.onGetContextMenuItem) {
      const contextMenuItems = [...props?.onGetContextMenuItem(selectedItems)];
      setContextMenuItems(contextMenuItems);
      setContextOverflowMenuItems([]);
      setContextFarMenuItems([
        {
          key: "selectionCount",
          text: `${selectedItems?.length} Items Selected`,
        },
      ]);
    }
    
  }, [selectedItems]);

  return (
    <>
      <Stack>
        <div className={mergeStyles(dataGridContainerStyle)}>
          <Stack enableScopedSelectors>
            <Stack.Item className={grdiStyle.default.topCommandActionMenu}>
              <Stack horizontal horizontalAlign="space-between">
                <Stack.Item grow={3} styles={{ root: { width: "100%" } }}>
                  <Stack
                    horizontal
                    horizontalAlign="start"
                    styles={{ root: { width: "100%" } }}
                  >
                    {
                      <CommandBar
                        items={contextMenuItems}
                        overflowItems={contextOverflowMenuItems}
                        farItems={contextFarMenuItems}
                        overflowButtonProps={overflowProps}
                        ariaLabel="Grid Actions"
                        styles={{ root: { width: "100%" } }}
                      />
                    }
                  </Stack>
                </Stack.Item>
                <Stack.Item>
                  <Stack horizontal horizontalAlign="end">
                    <SearchBox
                      styles={{ root: { width: 350 } }}
                      placeholder="Search Keywords"
                      value={filterValue}
                      onChange={(_, searchTerm: string) => {
                        setFilterValue(searchTerm);
                        filterDataGrid(true, null, searchTerm);
                      }}
                    />
                    <DefaultButton
                      styles={{ root: { minWidth: 15, width: 24 } }}
                      iconProps={clearFilterIcon}
                      onClick={resetGridFilter}
                      ariaLabel="Clear Filter"
                      title="Clear Filter"
                    />
                  </Stack>
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item>
              <FluentUIDetailsList
                {...dataTableProps}
                selection={selection}
                loading={props?.loading}
              />
            </Stack.Item>
            {!props?.loading && !props?.items?.length ? (
              <Stack.Item styles={dataGridEmptyMsgStyle}>
                <FontIcon
                  role={"img"}
                  aria-label="No Items"
                  iconName="WebComponents"
                  className={emptyMsgIconClass}
                />
                {props?.emptyItemsMessage ?? "No Items to show"}
              </Stack.Item>
            ) : (
              <></>
            )}
            {!props?.loading && props?.items?.length && !pagedItems?.length ? (
              <Stack.Item styles={dataGridEmptyMsgStyle}>
                <FontIcon
                  role={"img"}
                  aria-label="No Items"
                  iconName="SearchAndApps"
                  className={emptyMsgIconClass}
                />
                {props?.emptyFilterResultMessage ??
                  "No Item found that matches search term"}
              </Stack.Item>
            ) : (
              <></>
            )}
            <Stack.Item>
              <Pagination />
            </Stack.Item>
          </Stack>
        </div>
      </Stack>
    </>
  );
};
