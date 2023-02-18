/* eslint-disable */ 
import { IGroup } from "@fluentui/react";
import * as React from "react"; 
import { TableRowGrouped } from "./Rows/TableRowGrouped";

export const TableBodyGrouped: React.FunctionComponent<{
  items: any[];
  groups: IGroup[];
  isLoading: boolean;
}> = ({ items, groups, isLoading }): JSX.Element => {
  // const { gridKey$, groups$, columns$, selectedItems$ } = useDataTableGrid();
  // const gridKey = useObservableState<string>(gridKey$, "");
  // const selectedItems = useObservableState(selectedItems$, []);
  // const columns = useObservableState<IDataGridColumn<any>[]>(columns$, []);

  // const handleOnItemSelect = (newSelectedItems: any[], checked) => {
  //   const currentSelectedKeys = newSelectedItems?.map((x) => x?.[gridKey]);

  //   if (checked) {
  //     const newSelectedKeys = [...selectedItems, ...currentSelectedKeys];
  //     selectedItems$.next(newSelectedKeys?.filter(onlyUnique));
  //   } else {
  //     // remove current items from selected list if exists
  //     const otherThanCurrentSelectionKeys = selectedItems?.filter(
  //       (selectedItem) => {
  //         return !(currentSelectedKeys?.indexOf(selectedItem) > -1);
  //       }
  //     );

  //     selectedItems$.next(otherThanCurrentSelectionKeys?.filter(onlyUnique));
  //   }
  // };

  // const expandOrCollapseGroup = (currentGroup: IGroup) => {
  //   const newGroup = groups?.map((group) => {
  //     if (currentGroup?.key == group?.key) {
  //       return {
  //         ...group,
  //         isCollapsed: !group.isCollapsed,
  //       };
  //     }
  //     return group;
  //   });

  //   groups$.next(newGroup);
  // };

  return (
    <>
      <tbody>
        {!isLoading &&
          groups.map((group) => (
            <>
              <TableRowGrouped items={items} group={group} />
            </>
          ))}
      </tbody>
    </>
  );
};
