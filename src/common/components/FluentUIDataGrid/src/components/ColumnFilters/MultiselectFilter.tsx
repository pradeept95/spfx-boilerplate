/* eslint-disable */
import { Checkbox, IStackTokens, Stack } from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { onlyUnique } from "../../helpers/FilterHelper";
import { compareValues } from "../../helpers/SortHelpers";
import { useDataTableGrid } from "../../hooks/useDataGrid";
import { IDataGridColumn } from "../../types/DataGridProps";
import {
  BasicExpression,
  LogicalExpression,
} from "../../types/FilterExpression";

const stackTokens: IStackTokens = {
  childrenGap: 5,
};

const MultiSelectFilter: React.FunctionComponent<{
  column: IDataGridColumn<any>;
  colFilterExpression: LogicalExpression;
  setColFilterExpression: React.Dispatch<
    React.SetStateAction<LogicalExpression>
  >;
}> = (props) => {
  const { column, colFilterExpression, setColFilterExpression } = props;
  const [filterOptions, setFilterOptions] = React.useState<string[]>([]);

  const { items$ } = useDataTableGrid();
  const items = useObservableState(items$, []);

  const isChecked = (option): boolean =>
    (
      (colFilterExpression?.expressions?.[0] as BasicExpression)
        ?.value as string[]
    )?.indexOf(option) > -1;

  const isIntermediate = (): boolean => {
    const selectedLength = (
      (colFilterExpression?.expressions?.[0] as BasicExpression)
        ?.value as string[]
    )?.length;
    return (
      selectedLength &&
      selectedLength > 0 &&
      selectedLength !== filterOptions?.length
    );
  };

  const isAllChecked = (): boolean => {
    const selectedLength = (
      (colFilterExpression?.expressions?.[0] as BasicExpression)
        ?.value as string[]
    )?.length;
    return (
      selectedLength &&
      selectedLength > 0 &&
      selectedLength == filterOptions?.length
    );
  };

  const onSelectionChange = (isChecked: boolean, currentValue: string) => {
    const selectedOptions = (
      colFilterExpression?.expressions?.[0] as BasicExpression
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
    setColFilterExpression(newMultiselectFilterExpression);
  };

  const onSelectionAll = (isChecked: boolean) => {
    const newSelected = isChecked ? [...filterOptions] : [];
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
    setColFilterExpression(newMultiselectFilterExpression);
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
      setColFilterExpression(filterExpression);
    } else {
      const defaultColumnFilterExpression = {
        condition: "or",
        expressions: [
          {
            key: column.fieldName,
            operation: "includes",
            value: [],
          },
        ],
      } as LogicalExpression;
      setColFilterExpression(defaultColumnFilterExpression);
    }
  }, [column]);

  return (
    <>
      <Stack
        tokens={stackTokens}
        styles={{ root: { maxHeight: "300px", overflowY: "scroll" } }}
      >
        <Checkbox
          label={"Select All"}
          indeterminate={isIntermediate()}
          checked={isAllChecked()}
          onChange={(_, isChecked) => onSelectionAll(isChecked)}
        />
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

export default MultiSelectFilter;
