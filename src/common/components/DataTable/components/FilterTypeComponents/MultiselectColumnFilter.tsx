/* eslint-disable */
import { Checkbox, IStackTokens, Stack } from "@fluentui/react";
import * as React from "react";
import { useDataTable } from "../../hooks/useDataTable";
import {
  BasicExpression,
  LogicalExpression,
} from "../../types/FilterExpression";
import { FilterTypeExpressionProps } from "../../types/FilterTypeOptions";
import { compareValues } from "../../utils/GridHelpers";

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 5,
};

function onlyUnique(value: any, index: number, self: any) {
  return self.indexOf(value) === index;
} 

const MultiselectColumnFilter: React.FunctionComponent<
  FilterTypeExpressionProps
> = (props) => {
  const { column, setFilterExpression } = props;
  const [filterOptions, setFilterOptions] = React.useState<string[]>([]);

  const [multiSelectFilterExpression, setMultiSelectFilterExpression] =
    React.useState<LogicalExpression>();

  const { items } = useDataTable();

  const onSelectionChange = (isChecked: boolean, currentValue: string) => {
    const selectedOptions = (
      multiSelectFilterExpression?.expressions?.[0] as BasicExpression
    )?.value as string[];

    const existingFilterValue = selectedOptions?.length ? selectedOptions : [];
    const newSelected = isChecked
      ? [...existingFilterValue, currentValue]
      : [...existingFilterValue?.filter((f) => f !== currentValue)];

    const newMultiselectFilterExpression = {
      condition: "or",
      expressions: [
        {
          key: column.fieldName,
          operation: "includes",
          value: newSelected,
        },
      ],
    } as LogicalExpression;
    setFilterExpression(newMultiselectFilterExpression);
    setMultiSelectFilterExpression(newMultiselectFilterExpression);
  };

  React.useEffect(() => {
    if (!items?.length || !column) return;

    const selectionOptions = items?.map(
      (item: any) => item?.[column?.fieldName]
    );
    let uniqueOptions = selectionOptions
      .filter(onlyUnique)
      .sort((a, b) => compareValues(a, b, false));
    setFilterOptions([...uniqueOptions]);
  }, [items, column]);

  React.useEffect(() => {
    // if no column defination, return;
    if (!column) return;

    // otherwise calculate current filter expression
    const filterExpression = column?.filterExpression;
    if (filterExpression) {
      setMultiSelectFilterExpression(filterExpression);
    } else {
      const defaultMultiselectFilterExpression = {
        condition: "or",
        expressions: [
          {
            key: column.fieldName,
            operation: "includes",
            value: [],
          },
        ],
      } as LogicalExpression;
      setFilterExpression(defaultMultiselectFilterExpression);
      setMultiSelectFilterExpression(defaultMultiselectFilterExpression);
    } 
  }, [column]);

  const isChecked = (option): boolean =>
    (
      (multiSelectFilterExpression?.expressions?.[0] as BasicExpression)
        ?.value as string[]
    )?.indexOf(option) > -1;

  return (
    <>
      <Stack
        tokens={stackTokens}
        styles={{ root: { maxHeight: "300px", overflowY: "scroll" } }}
      >
        {filterOptions?.map((option) => (
          <Checkbox
            label={option}
            checked={isChecked(option)}
            onChange={(_, isChecked) => onSelectionChange(isChecked, option)}
          />
        ))}
      </Stack>
    </>
  );
};

export default MultiselectColumnFilter;
