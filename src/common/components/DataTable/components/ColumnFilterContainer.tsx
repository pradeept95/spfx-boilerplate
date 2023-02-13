/* eslint-disable */
import {
  DefaultButton, 
  IDetailsColumnProps,
  IStackTokens,
  Stack,
} from "@fluentui/react";
import { Text } from "@fluentui/react/lib/Text";
import { PrimaryButton } from "office-ui-fabric-react";
import * as React from "react"; 
import { useGridService } from "../services/GridService"; 
import { IDataGridColumn } from "../types/DataTableProps";
import { LogicalExpression } from "../types/FilterExpression";
import DateFilterComponent from "./FilterTypeComponents/DateColumnFilter";
import MultiselectColumnFilter from "./FilterTypeComponents/MultiselectColumnFilter";
import NumberFilterComponent from "./FilterTypeComponents/NumberColumnFilter";
import TextFilterComponent from "./FilterTypeComponents/TextColumnFilter";

const stackTokens: IStackTokens = { childrenGap: 5 };

const ColumnFilterContainer: React.FunctionComponent<{
  columnProp: IDetailsColumnProps; 
  toggleCallout: () => void;
}> = ({ columnProp, toggleCallout }) => {
  const [filterType, _] = React.useState(
    (columnProp?.column as IDataGridColumn)?.filterType ?? "text"
  );
  const [currentColumn, setCurrentColumn] = React.useState<IDataGridColumn>(); 
  const { filterDataGrid } = useGridService()

  const applyFilter = () => { 
    filterDataGrid(false, currentColumn); 
    toggleCallout();
  };

  const clearFilter = () => { 
    const currentColumnNoExpression: IDataGridColumn = {
      ...currentColumn,
      filterExpression: undefined,
    };
    filterDataGrid(false, currentColumnNoExpression); 
    setCurrentColumn(currentColumnNoExpression); 
    toggleCallout();
  };

  const handleSetFilterExpression = (
    colFilterExpression: LogicalExpression
  ) => {
    setCurrentColumn({
      ...currentColumn,
      filterExpression: colFilterExpression,
    } as IDataGridColumn);
  };

  React.useEffect(() => {
    setCurrentColumn(columnProp?.column as IDataGridColumn);
  }, [columnProp]);

  return (
    <>
      <Stack enableScopedSelectors tokens={stackTokens}>
        <Stack.Item>
          <Text variant="mediumPlus" nowrap block>
            Filter by {columnProp?.column?.name}
          </Text>
        </Stack.Item>
        <Stack.Item>
          {filterType == "multiselect" && (
            <MultiselectColumnFilter
              column={currentColumn}
              setFilterExpression={handleSetFilterExpression}
            />
          )}

          {filterType == "text" && (
            <TextFilterComponent
              column={currentColumn}
              setFilterExpression={handleSetFilterExpression}
            />
          )}

          {filterType == "number" && (
            <NumberFilterComponent
              column={currentColumn}
              setFilterExpression={handleSetFilterExpression}
            />
          )}

          {filterType == "date" && (
            <DateFilterComponent
              column={currentColumn}
              setFilterExpression={handleSetFilterExpression}
            />
          )}
        </Stack.Item>
        <Stack.Item>
          <Stack
            enableScopedSelectors
            horizontal
            horizontalAlign="space-between"
          >
            <PrimaryButton text="Apply" onClick={applyFilter} />
            <DefaultButton text={"Clear"} onClick={clearFilter} />
          </Stack>
        </Stack.Item>
      </Stack>
    </>
  );
};

export default ColumnFilterContainer;
