/* eslint-disable */

import { IGroup } from "@fluentui/react";
import { IDataGridColumn } from "../types/DataGridProps";

function getLeafGroupKey(key: string, separator: string): string {
  let leafKey = key;
  if (key.indexOf(separator) !== -1) {
    const arrKeys = key.split(separator);
    leafKey = arrKeys[arrKeys.length - 1];
  }
  return leafKey;
}

function getGroups(
  groupedItems: any[],
  column: IDataGridColumn<any>,
  isExpanded: boolean,
  parentGroup?: IGroup
): IGroup[] {
  const separator = "-";
  const groups = groupedItems.reduce(
    (current: IGroup[], item: any, index: number) => {
      const currentGroup = current[current.length - 1];
      const itemColumnValue = item[column?.fieldName];

      if (
        !currentGroup ||
        getLeafGroupKey(currentGroup.key, separator) !== itemColumnValue
      ) {
        current.push({
          key:
            (parentGroup ? parentGroup.key + separator : "") + itemColumnValue,
          name: `Group by ${column?.name}` + ": " + itemColumnValue,
          startIndex: parentGroup ? parentGroup.startIndex + index : index,
          count: 1,
          level: parentGroup ? parentGroup.level! + 1 : 0,
          isCollapsed: !isExpanded,
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

export function createGroups(
  groupCount: number,
  groupDepth: number,
  startIndex: number,
  itemsPerGroup: number,
  level: number = 0,
  key: string = "",
  isCollapsed?: boolean
): IGroup[] {
  if (key !== "") {
    key = key + "-";
  }
  const count = Math.pow(itemsPerGroup, groupDepth);
  return [...Array(groupCount)].map((value: number, index: number) => {
    return {
      count: count,
      key: "group" + key + index,
      name: "group " + key + index,
      startIndex: index * count + startIndex,
      level: level,
      isCollapsed: isCollapsed,
      children:
        groupDepth > 1
          ? createGroups(
              groupCount,
              groupDepth - 1,
              index * count + startIndex,
              itemsPerGroup,
              level + 1,
              key + index
            )
          : [],
    };
  });
}

export function groupItems(
  sortedItems: any[],
  columns: IDataGridColumn<any>[],
  isExpanded: boolean,
  parentGroup?: IGroup
): IGroup[] {
  if (columns.length) {
    //first calculate top level group
    let groups: IGroup[] = getGroups(
      sortedItems,
      columns?.[0],
      isExpanded,
      parentGroup
    );

    if (columns.length > 1) {
      for (let group of groups) {
        group.children = groupItems(
          [...sortedItems]?.splice(group.startIndex, group.count),
          [...columns]?.splice(1),
          isExpanded,
          group
        );
      }
    }

    return groups;
  }

  return [];

  // if we are grouping more than one column, we have to calculate group depper and deeper based on number of columns
  // calculate subgroup in group
  // if (columns.length > 1) {
  //   for (let index = 0; index < groups.length; index++) {
  //     groups[index].children = groupItems(
  //       [...sortedItems]?.splice(groups[index].startIndex, groups[index].count),
  //       columns,
  //       isExpanded,
  //       index + 1,
  //       groups[index]
  //     );
  //   }
}
