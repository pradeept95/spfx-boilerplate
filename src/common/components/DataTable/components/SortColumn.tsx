/* eslint-disable */
import * as React from "react";
import { ActionButton, IDetailsColumnProps, IIconProps } from "@fluentui/react";
import { useSorting } from "../services/SortGridService";
import { useDataTable } from "../hooks/useDataTable";
import { Text } from "@fluentui/react/lib/Text";

const sortAscending: IIconProps = { iconName: "SortDown" };
const sortDescending: IIconProps = { iconName: "SortUp" };

const sortUnsorted: IIconProps = { iconName: "Sort" };

export const SortColumn: React.FunctionComponent<{
  columnProp: IDetailsColumnProps;
}> = ({ columnProp }) => {
  const { column } = columnProp;
  const { columns, filteredItems } = useDataTable();
  const { sortDataGrid } = useSorting();

  return (
    <>
      <ActionButton
        iconProps={
          !column?.isSorted
            ? sortUnsorted
            : column?.isSortedDescending
            ? sortAscending
            : sortDescending
        }
        allowDisabledFocus
        onClick={() => sortDataGrid(column, columns, filteredItems)}
      >
        <Text variant="mediumPlus" nowrap block>
          Sort by {column?.name ?? column?.fieldName}
        </Text>
      </ActionButton>
    </>
  );
};
