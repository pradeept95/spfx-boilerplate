/* eslint-disable */
import * as React from "react";
import { ActionButton, IDetailsColumnProps, IIconProps } from "@fluentui/react"; 
import { useDataTable } from "../hooks/useDataTable";
import { Text } from "@fluentui/react/lib/Text"; 
import { useGrouping } from "../services/GroupService";

const groupAscending: IIconProps = { iconName: "GroupedAscending" };

export const GroupColumn: React.FunctionComponent<{
  columnProp: IDetailsColumnProps;
}> = ({ columnProp }) => {
  const { column } = columnProp;
  const { columns, filteredItems } = useDataTable();
  const { groupAllItemsByColumn, resetColumnGroup } = useGrouping();

  return (
    <>
      <ActionButton
        iconProps={groupAscending}
        allowDisabledFocus
        onClick={() =>
          !column.isGrouped
            ? groupAllItemsByColumn(column, columns, filteredItems)
            : resetColumnGroup(columns, filteredItems)
        }
      >
        <Text variant="mediumPlus" nowrap block>
          {!column.isGrouped ? (
            <> Group by {column?.name ?? column?.fieldName} </>
          ) : (
            <> Reset Group by {column?.name ?? column?.fieldName} </>
          )}
        </Text>
      </ActionButton>
    </>
  );
};
