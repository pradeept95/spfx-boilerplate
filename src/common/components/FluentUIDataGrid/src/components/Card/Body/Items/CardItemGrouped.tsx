/* eslint-disable */
import { ActionButton, Checkbox, IGroup, IStackTokens, Stack } from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { collapseGroupIcon, expandGroupIcon } from "../../../../defaults/icons";
import { onlyUnique } from "../../../../helpers/FilterHelper";
import { useDataTableGrid } from "../../../../hooks/useDataGrid";
import * as gridStyle from "../../../../styles/DataGrid.module.scss";
import { CardItem } from "./CardItem";

const itemStyles: React.CSSProperties = {
  alignItems: 'start',
  display: 'flex',
  height: "auto",
  justifyContent: 'center',
  width: 320,
};
const wrapStackTokens: IStackTokens = { childrenGap: 30 };

export const CardItemGrouped: React.FunctionComponent<{
  items: any[];
  group: IGroup;
  onCardViewRender : (
    item : any, 
    isSelected : boolean, 
    onItemSelect : (changedItems: any[], isSelected : boolean) => void ) => JSX.Element;
}> = ({ items, group, onCardViewRender }): JSX.Element => {
  const { gridKey$, groups$, selectedItems$ } = useDataTableGrid();

  // const columns = useObservableState<IDataGridColumn<any>[]>(columns$, []);
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

  const collapseExpandGroup = (checkGroups: IGroup[], current: IGroup): IGroup[] => {

    const newGroup = checkGroups?.map((group) => {
      if (current?.key == group?.key) {
        return {
          ...group,
          isCollapsed: !group.isCollapsed,
        };
      }

      if (!group?.isCollapsed && group?.children?.length) {
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
      <div className={gridStyle.default.tableRowGrouped}>
        <div
          className={gridStyle.default.tableMainGridtd}
        >
          <span style={{ width: "25px", display: "inline-flex" }}>
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
          </span>
          <span
            style={{
              paddingLeft: 20 * group.level + "px",
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
            >
              <strong> {`${group?.name} (${group.count})`}</strong>
            </ActionButton>
          </span>
        </div>
      </div>
      {group?.isCollapsed ? (
        <></>
      ) : (
        <>
          {!group.children?.length
            ? <>
              <Stack enableScopedSelectors horizontal wrap tokens={wrapStackTokens}>
                {
                  [...items]
                    ?.splice(group.startIndex, group.count)
                    ?.map((item) => <div style={itemStyles}><CardItem item={item} onCardViewRender={onCardViewRender}/></div>)
                }
              </Stack>
            </>
            : group?.children?.map((subGroup) => (
              <CardItemGrouped items={items} group={subGroup} onCardViewRender={onCardViewRender}/>
            ))}
        </>
      )}
    </>
  );
};
