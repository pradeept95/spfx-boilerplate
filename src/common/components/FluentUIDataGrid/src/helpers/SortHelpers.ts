/* eslint-disable */
import { DataGridColumn } from "../types/DataGridProps";
import { isValidDate, isValidNumber } from "./utils";

export const compareObjects = (
  a: any,
  b: any,
  key: string,
  isSortedDescending: boolean
): number => {
  if (isValidNumber(a[key] as string) && isValidNumber(b[key] as string)) {
    if (+a[key] == +b[key]) {
      return 0;
    }
    return (!isSortedDescending ? +a[key] < +b[key] : +a[key] > +b[key])
      ? 1
      : -1;
  } else if (isValidDate(a[key] as string) && isValidDate(b[key] as string)) {

    if (new Date(a[key]) == new Date(b[key])) {
      return 0;
    }

    return (
      !isSortedDescending
        ? new Date(a[key] as string) < new Date(b[key] as string)
        : new Date(a[key] as string) > new Date(b[key] as string)
    )
      ? 1
      : -1;
  } else {
    if (a[key] == b[key]) {
      return 0;
    }
    return (!isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1;
  }
};

export const compareValues = (a: any, b: any, isSortedDescending: boolean) => {
  if (isValidNumber(a as string) && isValidNumber(b as string)) {
    return (isSortedDescending ? +a < +b : +a > +b) ? 1 : -1;
  } else if (isValidDate(a as string) && isValidDate(b as string)) {
    return (
      isSortedDescending
        ? new Date(a as string) < new Date(b as string)
        : new Date(a as string) > new Date(b as string)
    )
      ? 1
      : -1;
  } else {
    return (isSortedDescending ? a < b : a > b) ? 1 : -1;
  }
};

export function copyAndSort<T>(
  items: T[],
  columnKey: string,
  isSortedDescending?: boolean
): T[] {
  const key = columnKey as keyof T;
  return items
    .slice(0)
    .sort((a: T, b: T) =>
      compareObjects(a, b, key as string, isSortedDescending)
    );
}

const sortBy = (keys: string[], isSortedDescending?: boolean[]) => (a, b) => {
  let r: any = 0;
  keys.some(
    (k, index: number) =>
      (r = !!isSortedDescending?.[index]
        ? a[k] > b[k] || -(a[k] < b[k])
        : -(a[k] > b[k] || -(a[k] < b[k])))
  );
  return r;
};

export function copyAndSortByMultiple<T>(
  items: T[],
  columnKeys: string[],
  isSortedDescending?: boolean[]
): T[] {
  return items.slice(0).sort(sortBy(columnKeys, isSortedDescending));
}

export const sortByFieldsInPlace = (
  arr: any[],
  sortColumns: DataGridColumn<any>[]
) => {
  let allSortedArray = [...arr];
  allSortedArray.sort((a, b) => {
    for (const sortColumn of sortColumns) {
      const compareResult: number = compareObjects(
        a,
        b,
        sortColumn.fieldName,
        sortColumn.isGrouped && !sortColumn.isSorted
          ? !sortColumn.isSortedDescending
          : sortColumn.isSortedDescending
      ); 
      if (compareResult !== 0) return compareResult; 
    }
    return 0;
  });

  return allSortedArray;
};

export function sortGrid(items: any[], columns: DataGridColumn<any>[]): any[] {
  const sortColumn = columns?.filter((x) => x.isSorted)?.[0];
  const groupedColumns = columns
    ?.filter((x) => x.isGrouped)
    ?.sort((x, y) => (x.groupOrderNumber > y.groupOrderNumber ? 1 : -1));

  let sortColumns: DataGridColumn<any>[] = [];

  // is grouped column exists give priority to grouped column before sorting
  if (groupedColumns?.length) {
    sortColumns = [...sortColumns, ...groupedColumns];
  }

  // if sort column exists add to the sort list
  if (sortColumn && !groupedColumns?.some(x => x.fieldName == sortColumn?.fieldName)) {
    sortColumns = [...sortColumns, sortColumn];
  }

  console.log("Sort Completed", sortColumns);
  if (sortColumns.length) {
    const sortedItems = sortByFieldsInPlace(items, sortColumns); 
    return [...sortedItems]
  }
  
  return items;
}
