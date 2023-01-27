/* eslint-disable */
import { IColumn, IGroup } from "@fluentui/react";
import { useDataTable } from "..//hooks/useDataTable";
import { DEFAULT_PAGE_SIZE } from "../types/DataTableConst";
 
export const useGrouping = () => {
  (async () => {})();

  const {
    setColumns,
    setCurrentPage,
    setFilteredItems,
    setPageSize,
    setGroups,
  } = useDataTable();

  const groupAllItemsByColumn = (
    column: IColumn,
    columns: IColumn[],
    filteredItems: any[]
  ) => {
    const filteredSortedItems = _copyAndSort(
      filteredItems,
      column.fieldName!,
      column.isSortedDescending
    );

    const newGroups = _getGroups(filteredSortedItems, column);
    console.log(newGroups);

    // reset page to 1 on sort
    setCurrentPage(1);
    // set pagesize to max
    setPageSize(10000);

    // prepare and set new columns
    const newColumns = [...columns];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol?.fieldName === column?.fieldName) {
        newCol.isGrouped = true;
      } else {
        newCol.isGrouped = false;
      }
    });

    setColumns(newColumns);

    setGroups([...newGroups]);

    //set sorted filtered item to filtered item
    setFilteredItems([...filteredSortedItems]);
  }; 

    const resetColumnGroup = (columns: IColumn[], filteredItems: any[]) => {
      // reset page to 1 on sort
      setCurrentPage(1);
      // set pagesize to default
      setPageSize(DEFAULT_PAGE_SIZE);

      // prepare and set new columns
      const newColumns = [...columns];
      newColumns.forEach((newCol: IColumn) => {
        newCol.isGrouped = false;
      });

      setColumns(newColumns);

      setGroups(undefined);

      //set sorted filtered item to filtered item
      setFilteredItems(filteredItems);
    }; 

  return {
    groupAllItemsByColumn,
    resetColumnGroup,
  };
};

function _copyAndSort<T>(
  items: T[],
  columnKey: string,
  isSortedDescending?: boolean
): T[] {
  const key = columnKey as keyof T;
  return items
    .slice(0)
    .sort((a: T, b: T) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
    );
}

// function _groupByKey(groups: IGroup[], items: any[], key: string): any[] {
//   let groupedItems: any[] = [];
//   if (groups) {
//     for (const group of groups) {
//       if (group.children && group.children.length > 0) {
//         const childGroupedItems = this._groupByKey(group.children, items, key);
//         groupedItems = groupedItems.concat(childGroupedItems);
//       } else {
//         const itemsInGroup = items.slice(
//           group.startIndex,
//           group.startIndex + group.count
//         );
//         const nextLevelGroupedItems = _copyAndSort(itemsInGroup, key);
//         groupedItems = groupedItems.concat(nextLevelGroupedItems);
//         group.children = this._getGroups(nextLevelGroupedItems, key, group);
//       }
//     }
//   }
//   return groupedItems;
// }

function _getLeafGroupKey(key: string, separator: string): string {
    let leafKey = key;
    if (key.indexOf(separator) !== -1) {
      const arrKeys = key.split(separator);
      leafKey = arrKeys[arrKeys.length - 1];
    }
    return leafKey;
  }

export function _getGroups(
  groupedItems: any[],
  column : IColumn,
  parentGroup?: IGroup
): IGroup[] {
  const separator = "-";
  const groups = groupedItems.reduce(
    (current: IGroup[], item: any, index: number) => {
      const currentGroup = current[current.length - 1];
      const itemColumnValue = item[column?.fieldName];

      if (
        !currentGroup ||
        _getLeafGroupKey(currentGroup.key, separator) !== itemColumnValue
      ) {
        current.push({
          key: (parentGroup ? parentGroup.key + separator : "") + itemColumnValue,
          name: `Group by ${column?.name}` + ": " + itemColumnValue,
          startIndex: parentGroup ? parentGroup.startIndex + index : index,
          count: 1,
          level: parentGroup ? parentGroup.level! + 1 : 0,
        });
      } else {
        currentGroup.count++;
      }
      return current;
    },
    [] as IGroup[]
  );

  return groups;
}

