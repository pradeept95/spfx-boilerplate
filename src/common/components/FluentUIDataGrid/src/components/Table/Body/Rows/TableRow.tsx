/* eslint-disable */
import { Checkbox } from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { onlyUnique } from "../../../../helpers/FilterHelper";
import { useDataTableGrid } from "../../../../hooks/useDataGrid";
import * as gridStyle from "../../../../styles/DataGrid.module.scss";
import { DataGridColumn } from "../../../../types/DataGridProps";

export const TableRow: React.FunctionComponent<{
  item: any;
}> = ({ item }): JSX.Element => {
  const { gridKey$, columns$, selectedItems$ } = useDataTableGrid();

  const columns = useObservableState<DataGridColumn<any>[]>(columns$, []);
  const selectedItems = useObservableState(selectedItems$, []);
  const gridKey = useObservableState<string>(gridKey$, "");

  const handleOnItemSelect = (newSelectedItems: any[], checked) => {
    const currentSelectedKeys = newSelectedItems?.map((x) => x?.[gridKey]);

    if (checked) {
      const newSelectedKeys = [...selectedItems, ...currentSelectedKeys];
      selectedItems$.next(newSelectedKeys?.filter(onlyUnique));
    } else {
      // remove current items from selected list if exists
      const otherThanCurrentSelectionKeys = selectedItems?.filter(
        (selectedItem) => {
          return !(currentSelectedKeys?.indexOf(selectedItem) > -1);
        }
      );

      selectedItems$.next(otherThanCurrentSelectionKeys?.filter(onlyUnique));
    }
  };

  return (
    <>
      <tr
        className={
          item?.isSelected
            ? gridStyle.default.tableRowSelected
            : gridStyle.default.tableMainGridtr
        }
      >
        <td className={gridStyle.default.tableMainGridtd}>
          <span>
            <Checkbox
              name="Select or DeSelect Row"
              ariaLabel="Select/Deselect Row"
              checked={item?.isSelected}
              onChange={(ev, checked) => handleOnItemSelect([item], checked)}
            />
          </span>
        </td>
        {columns?.map((col) => (
          <>
            {col?.onRender && (
              <td className={gridStyle.default.tableMainGridtd}>
                {col?.onRender(item)}
              </td>
            )}
            {!col?.onRender && (
              <td className={gridStyle.default.tableMainGridtd}>
                {col?.dataType == "date" ? (
                  new Date(item[col.fieldName])?.toLocaleDateString(
                    col.dataFormat ?? "en-US"
                  )
                ) : (
                  <></>
                )}
                {!col?.dataType || col?.dataType == "text" ? (
                  item[col.fieldName]
                ) : (
                  <></>
                )}
              </td>
            )}
          </>
        ))}
      </tr>
    </>
  );
};
