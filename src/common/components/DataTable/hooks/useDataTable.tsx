/* eslint-disable */
import {
  IColumn, 
  IDetailsColumnProps, 
  IRenderFunction,
  IStackTokens,
  Stack,
} from "@fluentui/react";
import * as React from "react";
import ColumnFilterComponent from "../components/ColumnFilterComponent";
import { IDatagridType } from "../types/DataTableProps";

type BasicExpression = {
  key: string;
  operation:
    | "greater_than"
    | "less_than"
    | "equal"
    | "starts_with"
    | "contains";
  value: string | number;
};

type LogicalExpression = {
  condition: "and" | "or";
  expressions: Expression[];
};
type Expression = BasicExpression | LogicalExpression;

const expr: LogicalExpression = {
  condition: "and",
  expressions: [
    {
      key: "age",
      operation: "greater_than",
      value: 40,
    },
    {
      condition: "or",
      expressions: [
        {
          key: "name",
          operation: "starts_with",
          value: "A",
        },
        {
          key: "name",
          operation: "starts_with",
          value: "B",
        },
      ],
    },
  ],
};

const people = [
  { name: "Elsworth", age: 41 },
  { name: "Xenos", age: 45 },
  { name: "Debra", age: 90 },
  { name: "Allen", age: 4 },
  { name: "Malissia", age: 18 },
  { name: "Patric", age: 55 },
  { name: "Minni", age: 84 },
  { name: "Alberik", age: 63 },
  { name: "Euell", age: 10 },
  { name: "Barton", age: 27 },
];

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

function evaluateLogicalExpression(
  expr: LogicalExpression,
  obj: Object
): boolean {
  const { condition, expressions } = expr;
  const fn = condition == "and" ? expressions.every : expressions.some;
  return fn.call(expressions, (expr: any) => {
    const isQuery = "condition" in expr;
    if (isQuery) {
      return evaluateLogicalExpression(expr, obj);
    } else {
      return evaluateExpression(expr, obj);
    }
  });
}

function evaluateExpression(expression: BasicExpression, obj: any): boolean {
  const { key, operation, value } = expression;
  const propValue = obj[key];
  switch (operation) {
    case "greater_than":
      return propValue > value;
    case "less_than":
      return propValue < value;
    case "contains":
      return new RegExp(value + "").test(propValue + "");
    case "starts_with":
      return new RegExp("^" + value + "").test(propValue + "");
    case "equal":
    default:
      return propValue === value;
  }
}

const filterIconStyle: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  width: 25,
};

const headerAreaStyle: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
};

const stackTokens: IStackTokens = { childrenGap: 5 }; 

export default function useDataTable<T extends object>(
  props: Partial<IDatagridType<any>>
) {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(1);

  const [allItems, setAllItems] = React.useState<T[]>([]);
  const [filteredItems, setFilteredItems] = React.useState<T[]>([]);
  const [pagedItems, setPagedItems] = React.useState<T[]>([]);
  const [columns, setColumns] = React.useState<IColumn[]>([]);

  React.useEffect(() => {
    initializeItemsAndPagedItems();
    const result = people.filter((user) =>
      evaluateLogicalExpression(expr, user)
    );
    console.log(result); //[{ name: 'Alberik', age: 63 }]
  }, [props.items]);

  React.useEffect(() => {
    prepareGridColumns();
  }, [props.columns, filteredItems, pageSize]);

  const initializeItemsAndPagedItems = () => {
    setAllItems(props?.items);
    setFilteredItems(props?.items);
    setPageSize(props?.pageSize);
    setPagedItems(props?.items?.slice(0, props?.pageSize));
  };

  const prepareGridColumns = () => {
    const newColumns = props?.columns?.map((col) => {
      return {
        ...col,
        // onColumnClick: (e, c) =>
        //   _onColumnClick(e, c, props?.columns, filteredItems, pageSize),
        onRenderHeader: (
          colProps?: IDetailsColumnProps,
          defaultRender?: IRenderFunction<IDetailsColumnProps>
        ): JSX.Element | null => (
          <>
            <Stack
              enableScopedSelectors
              horizontal
              horizontalAlign="space-around"
              tokens={stackTokens}
            >
              <span style={headerAreaStyle}>
                {(defaultRender && defaultRender(colProps)) || <></>}
              </span>
              <span style={filterIconStyle}>
                <ColumnFilterComponent />
              </span>
            </Stack>
          </>
        ),
      } as IColumn;
    });
    setColumns(newColumns);
  };

  const onPageChange = (currentPage: number, pageSize: number) => {
    updatePagedItemData(filteredItems, currentPage, pageSize);
  };

  const onColumnSort = (
    column: IColumn,
    allColumns: IColumn[],
    itemsToSort: T[],
    newPageSize: number
  ) => {
    const newColumns: IColumn[] = [...allColumns];
    const currColumn: IColumn = newColumns.filter(
      (currCol) => column.key === currCol.key
    )[0];

    newColumns.forEach((newCol: IColumn) => {
      if (newCol?.fieldName === currColumn?.fieldName) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        console.log(
          `${currColumn.name} is sorted ${
            currColumn.isSortedDescending ? "descending" : "ascending"
          }`
        );
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
      newCol.onColumnClick = (e, c) =>
        _onColumnClick(e, c, props?.columns, itemsToSort, newPageSize);
    });
    const newAllSortedItems = _copyAndSort(
      itemsToSort,
      currColumn.fieldName!,
      currColumn.isSortedDescending
    );

    // set states
    setFilteredItems(newAllSortedItems);
    setColumns(newColumns);

    // reset page to first page and update pagedData
    updatePagedItemData(newAllSortedItems, 1, newPageSize);
  };

  const onFilterTable = (searchText: string) => {
    const currentFilteredResult = allItems?.filter(function (item) {
      return Object.keys(item).some(function (k) {
        return (
          (item as any)?.[k]
            ?.toString()
            ?.toLowerCase()
            ?.indexOf(`${searchText}`?.toLocaleLowerCase()) != -1
        );
      });
    });

    // reset page to first page and update pagedData
    setFilteredItems(currentFilteredResult);
    updatePagedItemData(currentFilteredResult, 1, pageSize);
  };

  const updatePagedItemData = (
    items: T[],
    currentPage: number,
    pageSize: number
  ) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex =
      startIndex + pageSize > items?.length
        ? items?.length
        : startIndex + pageSize;
    console.log("Page Changed", currentPage, pageSize, startIndex, endIndex);

    setPagedItems(items?.slice(startIndex, endIndex));
    setCurrentPage(currentPage);
    setPageSize(pageSize);
  };

  function _onColumnClick(
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn,
    allColumns: IColumn[],
    itemsToSort: T[],
    pageSize: number
  ): void {
    onColumnSort(column, allColumns, itemsToSort, pageSize);
  }

  return [
    pagedItems,
    filteredItems,
    columns,
    currentPage,
    pageSize,
    onPageChange,
    onFilterTable,
  ] as const;
}
