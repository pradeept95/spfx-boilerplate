/* eslint-disable */
import {
  SearchBox,
  IDetailsListProps,
  IStyle,
  Stack,
  mergeStyles,
  IDetailsRowProps,
  IRenderFunction,
  DefaultButton,
  ConstrainMode,
  CommandBar,
  ICommandBarItemProps,
  Selection, 
} from "@fluentui/react";
import * as React from "react";
import { useDataTable } from "../hooks/useDataTable";
import { useFiltering } from "../services/FilterGridService";
import { clearFilterIcon } from "../types/DataTableConst";
import { IDatagridType } from "../types/DataTableProps";
import { FluentUIDetailsList } from "./FluentUIDetailsList";
import { Pagination } from "./Pagination";
import * as grdiStyle from "../styles/DataGrid.module.scss";

const dataGridContainerStyle: IStyle = {
  minHeight: "60vh",
};

const _items: ICommandBarItemProps[] = [
  {
    key: "newItem",
    text: "New",
    cacheKey: "myCacheKey", // changing this key will invalidate this item's cache
    iconProps: { iconName: "Add" },
    subMenuProps: {
      items: [
        {
          key: "emailMessage",
          text: "Email message",
          iconProps: { iconName: "Mail" },
          ["data-automation-id"]: "newEmailButton", // optional
        },
        {
          key: "calendarEvent",
          text: "Calendar event",
          iconProps: { iconName: "Calendar" },
        },
      ],
    },
  },
  {
    key: "upload",
    text: "Upload",
    iconProps: { iconName: "Upload" },
    subMenuProps: {
      items: [
        {
          key: "uploadfile",
          text: "File",
        },
        {
          key: "uploadfolder",
          text: "Folder",
        },
      ],
    },
  },
  {
    key: "share",
    text: "Share",
    iconProps: { iconName: "Share" },
    onClick: () => console.log("Share"),
  },
  {
    key: "download",
    text: "Download",
    iconProps: { iconName: "Download" },
    onClick: () => console.log("Download"),
  },
];

export const DataTableGridWrapper: React.FunctionComponent<
  IDatagridType<any>
> = (props) => {
  const { globalFilterText, pagedItems, selectedItems, setSelectedItems } =
    useDataTable();

  function createSelection(newSelectedItems: any[]) {
    console.log("New Selection", newSelectedItems);
    const selection = new Selection({
      onSelectionChanged: () => {
        console.log("Selection Changed", [
          ...newSelectedItems,
          selection.getSelection(),
        ]);
        setSelectedItems([...newSelectedItems, selection.getSelection()]);
      },
      getKey: (item: any) => item.key,
    });

    for (const newSelectedItem of newSelectedItems) {
      const index: number = (pagedItems as any[])?.findIndex(
        (pagedItem) => newSelectedItem?.id == pagedItem?.id
      );
      selection.setIndexSelected(index, true, false);
    }
    return selection;
  }

  const { globalGridFilter, resetGridFilter } = useFiltering();

  const [selection, setSelection] = React.useState(createSelection([]));

  const [filterValue, setFilterValue] = React.useState<string>("");

  const dataTableProps: IDetailsListProps = {
    ...props,
    constrainMode: props?.constrainMode ?? ConstrainMode.horizontalConstrained,
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

  // callback if selected item change
  React.useEffect(() => {
    props?.onSelectionChanged && props.onSelectionChanged(selectedItems);
    setSelection(createSelection(selectedItems));
  }, [selectedItems]);

  // callback to reset filter
  React.useEffect(() => {
    setFilterValue(globalFilterText ?? "");
  }, [globalFilterText]);

  return (
    <>
      <Stack>
        <div className={mergeStyles(dataGridContainerStyle)}>
          <Stack enableScopedSelectors>
            <Stack.Item className={grdiStyle.default.topCommandActionMenu}>
              <Stack horizontal horizontalAlign="space-between">
                <Stack.Item>
                  <Stack horizontal horizontalAlign="start">
                    <CommandBar
                      items={_items}
                      //overflowItems={_overflowItems}
                      //overflowButtonProps={overflowProps}
                      //farItems={_farItems}
                      ariaLabel="Inbox actions"
                      primaryGroupAriaLabel="Email actions"
                      farItemsGroupAriaLabel="More actions"
                    />
                  </Stack>
                </Stack.Item>
                <Stack.Item>
                  <Stack horizontal horizontalAlign="end">
                    <SearchBox
                      styles={{ root: { width: 250 } }}
                      placeholder="Search"
                      value={filterValue}
                      onChange={(_, searchTerm: string) => {
                        setFilterValue(searchTerm);
                        globalGridFilter(searchTerm);
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
            <Stack.Item>
              <Pagination />
            </Stack.Item>
          </Stack>
        </div>
      </Stack>
    </>
  );
};
