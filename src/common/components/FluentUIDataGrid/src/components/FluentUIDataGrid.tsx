/* eslint-disable */
import {
  ICommandBarItemProps,
  IStackTokens,
  Stack,
} from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { useDataTableGrid } from "../hooks/useDataGrid";
import { IDataGridColumn, IDataGridProps } from "../types/DataGridProps";
import * as gridStyle from "./../styles/DataGrid.module.scss";
import { GridHeader } from "./GridSections/GridHeader";
import { GridFooter } from "./GridSections/GridFooter";
import { GridBody } from "./GridSections/GridBody";
import { GetExportData } from "../helpers/ExportHelper";
import { ExportService } from "../../../../services/ExportService";

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 5,
};

const { exportToCSV, exportToExcel } = ExportService();

function FluentUIDataGridContainer<T extends {}>(
  props: IDataGridProps<T>
): JSX.Element {
  const {
    gridKey$,
    items$,
    selectedItems$,
    columns$,
  } = useDataTableGrid();

  const gridKey = useObservableState(gridKey$, "");
  const items = useObservableState(items$, []);
  const columns = useObservableState(columns$, []);
  const selectedItems = useObservableState(selectedItems$, []);

  const [actionMenuItems, setActionMenuItems] = React.useState<
    ICommandBarItemProps[]
  >([]);
  const [actionOverflowMenuItems, setActionOverflowMenuItems] = React.useState<
    ICommandBarItemProps[]
  >([]);
  const [actionFarMenuItems, setActionFarMenuItems] = React.useState<
    ICommandBarItemProps[]
  >([]);

  const handleSelectUnselectAll = (isSelect: boolean) => {
    if (isSelect) {
      const selectedKeys = items?.map(x => x?.[gridKey]);
      selectedItems$.next([...selectedKeys]);
    } else {
      selectedItems$.next([]);
    }
  }

  const handleExport = async  (items: T[], cols: IDataGridColumn<T>[], exportType: "excel" | "csv") => {
    const exportData = props?.onGetExportItems ? props.onGetExportItems(items) : GetExportData(items, cols);
    switch (exportType) {
      case "excel":
        await exportToExcel("download_excel", exportData)
        break;

      case "csv":
        await exportToCSV("download_csv", exportData)
        break;
    }
  }

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
    }

    setActionOverflowMenuItems([
      {
        key: "select_all",
        text: "Select All Items",
        onClick: () => handleSelectUnselectAll(true),
        disabled: newSelectedItems?.length == items?.length && items.length !== 0
      },
      {
        key: "unselect_all",
        text: "Remove Selection",
        onClick: () => handleSelectUnselectAll(false),
        disabled: newSelectedItems?.length == 0
      },
      {
        key: "export_excel",
        text: "Export to Excel",
        onClick: () => {
           handleExport(newSelectedItems.length > 0 ? newSelectedItems : items, columns, "excel")
        }
      },
      {
        key: "export csv",
        text: "Export to CSV",
        onClick: () => {
          handleExport(newSelectedItems.length > 0 ? newSelectedItems : items, columns, "csv")
        }
      }
    ])

    setActionFarMenuItems([
      {
        key: "selectionCount",
        text: `${newSelectedItems?.length} Item(s) Selected`,
      },
    ]);

  }, [columns, items, selectedItems]);

  return (
    <Stack tokens={stackTokens}>
      <Stack.Item className={gridStyle.default.topCommandActionMenu}>
        <GridHeader
          actionMenuItems={actionMenuItems}
          actionOverflowMenuItems={actionOverflowMenuItems}
          actionFarMenuItems={actionFarMenuItems} />
      </Stack.Item>
      <Stack.Item>
        <GridBody isLoading={props?.isLoading} />
      </Stack.Item>
      <Stack.Item>
        <GridFooter pageSize={props?.pageSize} pageOptions={props?.pageOptions} />
      </Stack.Item>
    </Stack>
  );
}

export default FluentUIDataGridContainer;
