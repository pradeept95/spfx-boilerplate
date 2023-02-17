/* eslint-disable */
import { 
  CommandBar,
  DefaultButton,
  Dropdown,
  IButtonProps,
  ICommandBarItemProps,
  IGroup,
  IStackStyles,
  IStackTokens,
  SearchBox,
  Stack,
} from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { DEFAULT_PAGE_SIZE } from "../defaults/constants";
import { DEFAULT_PAGE_OPTIONS } from "../defaults/page-size-options";
import { useDataTableGrid } from "../hooks/useDataGrid";
import { DataGridColumn, DataGridProps } from "../types/DataGridProps";
import GridPaginationComponent from "./Pagination/GridPaginationComponent";
import TableHeader from "./Table/Header/TableHeader";
import * as gridStyle from "./../styles/DataGrid.module.scss";
import { clearFilterIcon } from "../defaults/icons";
import { LoadingItems } from "./Table/Body/LoadingItems"; 
import { NoItem } from "./Table/Body/NoItem";
import { NoItemFound } from "./Table/Body/NoItemFound"; 
import { TableBody } from "./Table/Body/TableBody";
import { TableBodyGrouped } from "./Table/Body/TableBodyGrouped";

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 5,
};
const overflowProps: IButtonProps = { ariaLabel: "More commands" };

const footerStackStyles: IStackStyles = { root: { margin: "0.6rem 0rem" } };

function FluentUIDataGridContainer<T extends {}>(
  props: DataGridProps<T>
): JSX.Element {
  const { 
    gridKey$,
    groups$,
    columns$,
    globalFilter$,
    items$,
    pagedItems$,
    selectedItems$,
    pageSize$,
    currentPage$,
  } = useDataTableGrid();

  const gridKey = useObservableState(gridKey$, ""); 
  const columns = useObservableState<DataGridColumn<any>[]>(columns$, []);
  const groups = useObservableState<IGroup[]>(groups$, []);
  const items = useObservableState(items$, []);
  const pagedItems = useObservableState(pagedItems$, []);
  const selectedItems = useObservableState(selectedItems$, []);
  const globalFilter = useObservableState<string>(globalFilter$, ""); 

  const [actionMenuItems, setActionMenuItems] = React.useState<
    ICommandBarItemProps[]
  >([]);
  const [actionFarMenuItems, setActionFarMenuItems] = React.useState<
    ICommandBarItemProps[]
  >([]);

  React.useEffect(() => { 
    const newSelectedItems = [...items]?.filter(
      (item) => selectedItems?.indexOf(item?.[gridKey]) > -1
    );

    if (props?.onSelectionChange && newSelectedItems?.length) {
      props?.onSelectionChange(newSelectedItems);
    }

    if (props?.onGetActionMenuItem) {
      const newActionMenuItems = [
        ...props?.onGetActionMenuItem(newSelectedItems),
      ];
      setActionMenuItems(newActionMenuItems);

      setActionFarMenuItems([
        {
          key: "selectionCount",
          text: `${newSelectedItems?.length} Item(s) Selected`,
        },
      ]);
      console.log(actionFarMenuItems);
    }
  }, [selectedItems]);
  
  return (
    <Stack tokens={stackTokens}>
      <Stack.Item className={gridStyle.default.topCommandActionMenu}>
        <Stack
          horizontal
          horizontalAlign="space-between"
          verticalAlign="center"
        >
          <Stack.Item styles={{ root: { width: "100%" } }}>
            <CommandBar
              items={actionMenuItems}
              //overflowItems={contextOverflowMenuItems}
              farItems={actionFarMenuItems}
              overflowButtonProps={overflowProps}
              ariaLabel="Grid Actions"
              role={"navigation"}
            />
          </Stack.Item>
          <Stack.Item>
            <Stack horizontal horizontalAlign="end">
              <SearchBox
                styles={{ root: { width: 300 } }}
                placeholder="Search Keywords"
                aria-label="Search in Grid"
                value={globalFilter}
                onChange={(_, searchTerm: string) => {
                  globalFilter$.next(searchTerm);
                  currentPage$.next(1);
                }}
              />
              <DefaultButton
                styles={{ root: { minWidth: 15, width: 24 } }}
                iconProps={clearFilterIcon}
                onClick={() => {
                  const newColumns = columns?.splice(0)?.map(
                    (col: DataGridColumn<any>) => {
                      return {
                        ...col,
                        isFiltered: false,
                        filterExpression: undefined,
                      };
                    }
                  );
                  globalFilter$.next("");
                  currentPage$.next(1);
                  columns$.next([...newColumns]); 
                }}
                ariaLabel="Clear Filter"
                title="Clear Filter"
              />
            </Stack>
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item>
        <div style={{ overflowX: props?.isLoading ? "hidden" : "auto" }}>
          <table className={gridStyle.default.tableMainGrid}>
            <thead>
              <tr className={gridStyle.default.tableHeaderRow}>
                <TableHeader hasGroup={groups?.length > 0} />
              </tr>
            </thead>
            {!groups?.length ? (
              <TableBody items={pagedItems} isLoading={props?.isLoading} />
            ) : (
              <TableBodyGrouped
                items={pagedItems}
                groups={groups}
                isLoading={props?.isLoading}
              />
            )}
            <tfoot></tfoot>
          </table>
          <LoadingItems loading={props.isLoading} />
          <NoItem noItems={!props.isLoading && !items?.length} />
          <NoItemFound
            itemNotFound={
              !props.isLoading && items?.length && !pagedItems?.length
            }
          />
        </div>
      </Stack.Item>
      <Stack.Item>
        <Stack
          enableScopedSelectors
          horizontal
          horizontalAlign="space-between"
          tokens={stackTokens}
          styles={footerStackStyles}
        >
          <Stack.Item>
            <Dropdown
              styles={{ root: { maxWidth: 100 } }}
              ariaLabel="Select Page Size"
              role={"combobox"}
              defaultSelectedKey={props?.pageSize ?? DEFAULT_PAGE_SIZE}
              options={DEFAULT_PAGE_OPTIONS}
              onChange={(_, pageOption) => {
                console.log(pageOption);
                pageSize$.next(pageOption?.key);
                currentPage$.next(1);
              }}
            />
          </Stack.Item>
          <Stack.Item>
            <GridPaginationComponent />
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </Stack>
  );
}

export default FluentUIDataGridContainer;
