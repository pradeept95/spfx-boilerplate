/* eslint-disable */
import { IColumn } from "@fluentui/react";
import { useDataTable } from "..//hooks/useDataTable";
import { DEFAULT_PAGE_SIZE } from "../types/DataTableConst";
import { BasicExpression, defaultAndExpression, Expression, FilterValueType, LogicalExpression } from "../types/FilterExpression";
import { _getGroups } from "./GroupService";

export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
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

export function evaluateExpression(expression: BasicExpression, obj: any): boolean {
    const { key, operation, value } = expression;
    const propValue = (obj[key] as FilterValueType);
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
            return Array.isArray(value) && (value.length == 0 || (value as any)?.indexOf(propValue) > -1);

        case "equal":
        default:
            return `${propValue}`?.toLocaleLowerCase() == `${value}`?.toLocaleLowerCase();
    }
}


export function buildExpression(expression: LogicalExpression, currentExpession: Expression): LogicalExpression {

    if ((currentExpession as LogicalExpression)?.condition) {
        console.log("Logical Expression")
    }
    else {
        console.log("Basic Expression")
        currentExpession = currentExpession as BasicExpression
        const existingExpression = expression?.expressions?.filter((exp: BasicExpression) => exp.key == (currentExpession as BasicExpression).key)?.[0];

        if (existingExpression) {
            (existingExpression as BasicExpression).value = currentExpession.value;
            (existingExpression as BasicExpression).operation = currentExpession.operation;
        } else {
            expression.expressions.push(currentExpession);
        }

        expression.expressions = expression?.expressions?.filter((exp: BasicExpression) => !!exp.value)
    }

    console.log(expression);
    return expression;
}

export function mapFilterType(type: any): string {
    let inputType: string = "";
    switch (type) {
        case "number":
            inputType = "number"
            break;

        case "date":
            inputType = "date"
            break;

        case "string":
        default:
            inputType = "text";
            break;
    }

    return inputType;
} 
 
export const useFiltering = () => {
    (async () => { })();

    const {
      items,
      columns,
      setCurrentPage,
      filterExpression,
      globalFilterText,
      setFilteredItems,
      setGlobalFilterText,
      setFilterExpression,
      setPageSize,
      setGroups,
    } = useDataTable();

    const globalGridFilter = (searchTerm: string) => {
      let currentFilteredItems = items?.filter(function (item: any) {
        return Object.keys(item).some(function (k) {
          return (
            (item as any)?.[k]
              ?.toString()
              ?.toLowerCase()
              ?.indexOf(`${searchTerm}`?.toLocaleLowerCase()) != -1
          );
        });
      });

      if (filterExpression?.expressions?.length) {
        currentFilteredItems = currentFilteredItems?.filter((item: any) =>
          evaluateLogicalExpression(filterExpression, item)
        );
      }

      // check if has group
      const groupedColumn: IColumn = columns?.filter(
        (col: IColumn) => col.isGrouped
      )?.[0];

      if (groupedColumn) {
        const newGroups = _getGroups(currentFilteredItems, groupedColumn);
        setGroups([...newGroups]);
      }

      // store filter text
      setGlobalFilterText(searchTerm);

      // reset page to 1 on search start
      setCurrentPage(1);

      //set sorted filtered item to filtered item
      setFilteredItems(currentFilteredItems);
    };

    const columnGridFilter = (operation: Expression) => {

        console.log(operation, filterExpression); 
        const existingExpression = filterExpression ?? defaultAndExpression;
        const expression = buildExpression(
          { ...existingExpression },
          operation
        );

        let currentFilteredItems: any[] = items;
        if (globalFilterText?.length) {
            currentFilteredItems = currentFilteredItems?.filter(function (item: any) {
                return Object.keys(item).some(function (k) {
                    return (
                        (item as any)?.[k]
                            ?.toString()
                            ?.toLowerCase()
                            ?.indexOf(`${globalFilterText}`?.toLocaleLowerCase()) != -1
                    );
                });
            });
        }

        currentFilteredItems = currentFilteredItems?.filter((item: any) => evaluateLogicalExpression(expression, item));

        // check if has group
        const groupedColumn : IColumn = columns?.filter((col : IColumn) => col.isGrouped)?.[0];

        if(groupedColumn){
            const newGroups = _getGroups(currentFilteredItems, groupedColumn);
            setGroups([...newGroups]);
        } 

        // store filter expression
        setFilterExpression(expression)

        // reset page to 1 on search start
        setCurrentPage(1)

        //set sorted filtered item to filtered item
        setFilteredItems(currentFilteredItems);
    }

    const resetGridFilter = () => {
      // reset expression
      const expression = { ...defaultAndExpression };
      expression.expressions = [];

      // reset global filter and all expression
      setGlobalFilterText("");
      setFilterExpression(expression);
 
      // reset group
      setGroups(undefined);

      // set pagesize to default
       setPageSize(DEFAULT_PAGE_SIZE);

      // reset page to 1 on search start
      setCurrentPage(1);

      //set sorted filtered item to filtered item
      setFilteredItems(items);
    }

    const getExpressionForColumnIfExist = (expression: LogicalExpression, fieldName: string) :  BasicExpression => {
        const expressionsOnly = expression?.expressions;

        // don't go deep if expression doesnot exist
        if(!expressionsOnly) return;

        for (const expressionOnly of expressionsOnly) {
            if ((expressionOnly as LogicalExpression)?.condition) {

                // recursively check if filed exists in deep
                return getExpressionForColumnIfExist((expressionOnly as LogicalExpression), fieldName);

            } else {
                const expressionOnlyAsBascicExpression = (expressionOnly as BasicExpression)
                if (expressionOnlyAsBascicExpression?.key == fieldName) {
                    console.log(expressionOnly);
                    return expressionOnlyAsBascicExpression
                }
            }
        }
    }

    return {
        globalGridFilter,
        columnGridFilter,
        resetGridFilter,
        getExpressionForColumnIfExist
    };
};

