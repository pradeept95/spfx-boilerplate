/* eslint-disable */
import { IColumn, IGroup } from "@fluentui/react";
import { DEFAULT_NUMBER_OF_PAGE_BTN } from "../types/DataTableConst";
import {
  BasicExpression,
  Expression,
  FilterValueType,
  LogicalExpression,
} from "../types/FilterExpression";

// helpers for filtering
export function debounce<F extends (...params: any[]) => void>(
  fn: F,
  delay: number
) {
  let timeoutID: number = null;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}

export function evaluateLogicalExpression(
  expr: LogicalExpression,
  obj: Object
): boolean {
  const { condition, expressions } = expr; 
  const fn = condition === "and" ? expressions.every : expressions.some;
  return fn.call(expressions, (expr: any) => {
    const isQuery = "condition" in expr;
    if (isQuery) {
      return evaluateLogicalExpression(expr, obj);
    } else {
      return evaluateExpression(expr, obj);
    }
  });
}

export function evaluateExpression(
  expression: BasicExpression,
  obj: any
): boolean {
  const { key, operation, value } = expression;
  const propValue = obj[key] as FilterValueType;
  switch (operation) {
    case "greater_than":
      return propValue > value;
    case "less_than":
      return propValue < value;
    case "contains":
      return new RegExp(value + "").test(propValue + "");
    case "starts_with":
      return new RegExp("^" + value + "").test(propValue + "");

    case "includes":
      return (
        Array.isArray(value) &&
        (value.length == 0 || (value as any)?.indexOf(propValue) > -1)
      );

    case "date_equal":
    case "date_greater_than":
    case "date_less_than":
      return compareDates(propValue, value, operation);

    case "equal":
    default:
      return (
        `${propValue}`?.toLocaleLowerCase() == `${value}`?.toLocaleLowerCase()
      );
  }
}

export function buildExpression(
  expression: LogicalExpression,
  currentExpession: Expression
): LogicalExpression {
  if ((currentExpession as LogicalExpression)?.condition) {
    console.log("Logical Expression");
  } else {
    console.log("Basic Expression");
    currentExpession = currentExpession as BasicExpression;
    const existingExpression = expression?.expressions?.filter(
      (exp: BasicExpression) =>
        exp.key == (currentExpession as BasicExpression).key
    )?.[0];

    if (existingExpression) {
      (existingExpression as BasicExpression).value = currentExpession.value;
      (existingExpression as BasicExpression).operation =
        currentExpession.operation;
    } else {
      expression.expressions.push(currentExpession);
    }

    expression.expressions = expression?.expressions?.filter(
      (exp: BasicExpression) => !!exp.value
    );
  }

  console.log(expression);
  return expression;
}
  
export function compareDates(
  date1: any,
  date2: any,
  compareType: "date_equal" | "date_greater_than" | "date_less_than"
) {
  try {
    const d1 = new Date(date1);
    d1.setHours(0, 0, 0);

    const d2 = new Date(date2);
    d2.setHours(0, 0, 0);

    switch (compareType) {
      case "date_equal":
        return d1 == d2;

      case "date_greater_than":
        return d1 > d2;

      case "date_less_than":
        return d1 < d2; 
    } 
  } catch {
    return false;
  }
}

// helpers sorting and grouping

export const compareObjects = (
  a: any,
  b: any,
  key: string,
  isSortedDescending: boolean
) => {
  if (isValidNumber(a[key] as string) && isValidNumber(b[key] as string)) {
    return (isSortedDescending ? +a[key] < +b[key] : +a[key] > +b[key])
      ? 1
      : -1;
  } else if (isValidDate(a[key] as string) && isValidDate(b[key] as string)) {
    return (
      isSortedDescending
        ? new Date(a[key] as string) < new Date(b[key] as string)
        : new Date(a[key] as string) > new Date(b[key] as string)
    )
      ? 1
      : -1;
  } else {
    return (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1;
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

const sortBy =
  (keys : string[], isSortedDescending?: boolean[]) =>
  (a, b) => {
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


// helpers for grouping
export function groupByKey(groups: IGroup[], items: any[], key: string): any[] {
  let groupedItems: any[] = [];
  if (groups) {
    for (const group of groups) {
      if (group.children && group.children.length > 0) {
        const childGroupedItems = this._groupByKey(group.children, items, key);
        groupedItems = groupedItems.concat(childGroupedItems);
      } else {
        const itemsInGroup = items.slice(
          group.startIndex,
          group.startIndex + group.count
        );
        const nextLevelGroupedItems = copyAndSort(itemsInGroup, key);
        groupedItems = groupedItems.concat(nextLevelGroupedItems);
        group.children = this._getGroups(nextLevelGroupedItems, key, group);
      }
    }
  }
  return groupedItems;
}

export function getLeafGroupKey(key: string, separator: string): string {
  let leafKey = key;
  if (key.indexOf(separator) !== -1) {
    const arrKeys = key.split(separator);
    leafKey = arrKeys[arrKeys.length - 1];
  }
  return leafKey;
}

export function getGroups(
  groupedItems: any[],
  column: IColumn,
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
          isCollapsed : false 
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

// helpers for pagination

const range = (from: number, to: number, step: number = 1) =>
  [...Array(Math.floor((to - from) / step) + 1)]?.map(
    (_, i) => from + i * step
  );

export function getPageNumbers(currentPage: number, totalPageCount: number): number[] {
  let start = currentPage - Math.floor(DEFAULT_NUMBER_OF_PAGE_BTN / 2);
  let end = currentPage + Math.floor(DEFAULT_NUMBER_OF_PAGE_BTN / 2);

  if (start < 1) {
    start = 1;
    end =
      totalPageCount > DEFAULT_NUMBER_OF_PAGE_BTN
        ? DEFAULT_NUMBER_OF_PAGE_BTN
        : totalPageCount;
  } else if (end > totalPageCount) {
    const possibleStart = totalPageCount - DEFAULT_NUMBER_OF_PAGE_BTN + 1;
    start = possibleStart < 1 ? 1 : possibleStart;
    end = totalPageCount;
  }

  const currentPageOptions: number[] =
    end - start >= 0 ? range(start, end) : [];
  return currentPageOptions?.length > 0 ? currentPageOptions : [1];
};


// basic helper functions
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  if (Object.prototype.toString.call(date) === "[object Date]") {
    if (!isNaN(date.getTime())) {
      // date is valid
      return true;
    } else {
      //Date is not valid
      return false;
    }
  } else {
    // date is not valid
    return false;
  } 
};

export const isValidNumber = (numberString: string): boolean => {
     return (
       numberString != null &&
       numberString !== "" &&
       !isNaN(Number(numberString?.toString()))
     );
};
