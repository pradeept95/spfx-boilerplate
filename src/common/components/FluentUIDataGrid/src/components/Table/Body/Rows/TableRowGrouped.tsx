/* eslint-disable */
import { ActionButton, Checkbox, IGroup } from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { collapseGroupIcon, expandGroupIcon } from "../../../../defaults/icons";
import { onlyUnique } from "../../../../helpers/FilterHelper";
import { useDataTableGrid } from "../../../../hooks/useDataGrid";
import * as gridStyle from "../../../../styles/DataGrid.module.scss";
import { IDataGridColumn } from "../../../../types/DataGridProps";
import { TableRow } from "./TableRow";

export const TableRowGrouped: React.FunctionComponent<{
  items: any[];
  group: IGroup;
}> = ({ items, group }): JSX.Element => {
  const { gridKey$, columns$, groups$, selectedItems$ } = useDataTableGrid();

  const columns = useObservableState<IDataGridColumn<any>[]>(columns$, []);
  const selectedItems = useObservableState(selectedItems$, []);
  const groups = useObservableState<IGroup[]>(groups$, []);
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

  const collapseExpandGroup = (checkGroups : IGroup[], current : IGroup) : IGroup[] => {
      
      const newGroup = checkGroups?.map((group) => {
      if (current?.key == group?.key) {
        return {
          ...group,
          isCollapsed: !group.isCollapsed,
        };
      }
 
      if(!group?.isCollapsed && group?.children?.length){
        group.children = collapseExpandGroup(group.children, current);
        //group.isCollapsed = !group?.children?.some(x => !x.isCollapsed);
      }

      return group;
    });

    return newGroup;
  }

  const expandOrCollapseGroup = (currentGroup: IGroup) => {
    const newGroup = collapseExpandGroup(groups, currentGroup);
    groups$.next(newGroup);
  };

  return (
    <>
      <tr className={gridStyle.default.tableRowGrouped}>
        <td
          className={gridStyle.default.tableMainGridth}
          style={{ width: "10px" }}
        >
          <Checkbox
            name="Select All or DeSelect all Items in Group"
            ariaLabel="Select/Deselect all Items in Group"
            indeterminate={
              group?.count &&
              [...items]
                ?.splice(group.startIndex, group.count)
                ?.some((x) => x.isSelected) &&
              ![...items]
                ?.splice(group.startIndex, group.count)
                ?.every((x) => x.isSelected)
            }
            checked={
              group?.count &&
              [...items]
                ?.splice(group.startIndex, group.count)
                ?.every((x) => x.isSelected)
            }
            onChange={(_, checked) =>
              handleOnItemSelect(
                [...items]?.splice(group.startIndex, group.count),
                checked
              )
            }
          />
        </td> 
        <td
          className={gridStyle.default.tableMainGridtd}
          colSpan={columns.length}
        >
          <strong
            style={{
              paddingLeft: 10 * group.level + "px",
            }}
          >
            <ActionButton
              ariaLabel={"Collapse All Columns"}
              role="button"
              iconProps={
                group.isCollapsed ? expandGroupIcon : collapseGroupIcon
              }
              allowDisabledFocus
              onClick={() => expandOrCollapseGroup(group)}
              styles={{
                root: {
                  padding: 0,
                  margin: 0,
                  height: "1rem",
                },
                flexContainer: {
                  flexDirection: "row-reverse",
                  FontWeight: 700,
                  fontSize: "0.7rem",
                },
                iconHovered: {
                  FontWeight: 700,
                },
                icon: {
                  FontWeight: 700,
                  fontSize: "0.7rem",
                },
              }}
            ></ActionButton>
            {group?.name + ` (${group.count})`}
          </strong>
        </td>
      </tr>
      {group?.isCollapsed ? (
        <></>
      ) : (
        <>
          {!group.children?.length
            ? [...items]
                ?.splice(group.startIndex, group.count)
                ?.map((item) => <TableRow item={item} />)
            : group?.children?.map((subGroup) => (
                <TableRowGrouped items={items} group={subGroup} />
              ))}
        </>
      )}
    </>
  );
};
