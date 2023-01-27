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
import { useDataTable } from "../hooks/useDataTable";
import { useFiltering } from "../services/FilterGridService"; 
import { BasicExpression } from "../types/FilterExpression";
import MultiselectColumnFilter from "./FilterTypeComponents/MultiselectColumnFilter";
import TextFilterComponent from "./FilterTypeComponents/TextColumnFilter";
import { GroupColumn } from "./GroupColumn";
import { SortColumn } from "./SortColumn"; 

const stackTokens: IStackTokens = { childrenGap: 5 };

const ColumnActionCallout: React.FunctionComponent<{
  columnProp: IDetailsColumnProps;
  toggleCallout: () => void;
}> = ({ columnProp, toggleCallout }) => {
  const [filterType, _] = React.useState(
    (columnProp?.column as any)?.filterType ?? "text"
  );

  const { columnGridFilter, getExpressionForColumnIfExist } = useFiltering();
  // const { sortDataGrid } = useSorting();

  const { filterExpression } = useDataTable();

  const [colFilterExpression, setColFilterExpression] =
    React.useState<BasicExpression>();

  const applyFilter = () => {
    columnGridFilter({
      ...colFilterExpression,
      value: colFilterExpression?.value ?? "",
    }); 
    toggleCallout();
  };

  // const resetFilter = (e: any) => {
  //   columnGridFilter({
  //     ...colFilterExpression,
  //     value: "",
  //   });
  // };

  React.useEffect(() => {
    const filterExpressionForCurrentCol: BasicExpression =
      getExpressionForColumnIfExist(
        filterExpression,
        columnProp?.column?.fieldName
      );
    if (filterExpressionForCurrentCol) {
      setColFilterExpression(filterExpressionForCurrentCol);
    } else {
      setColFilterExpression({ value: undefined } as BasicExpression);
    }
  }, [filterExpression]);

  return (
    <>
      <Stack enableScopedSelectors tokens={stackTokens}>
        <Stack.Item>
          <SortColumn columnProp={columnProp} />
        </Stack.Item>
        <Stack.Item>
          <GroupColumn columnProp={columnProp} />
        </Stack.Item>
        <Stack.Item>
          <Text variant="mediumPlus" nowrap block>
            Filter by {columnProp?.column?.name}
          </Text>
        </Stack.Item>
        <Stack.Item>
          {filterType == "multiselect" && (
            <MultiselectColumnFilter
              column={columnProp?.column}
              filterExpression={colFilterExpression}
              setFilterExpression={setColFilterExpression}
            />
          )}

          {filterType == "text" && (
            <TextFilterComponent
              column={columnProp?.column}
              filterExpression={colFilterExpression}
              setFilterExpression={setColFilterExpression}
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
            <DefaultButton text={"Close"} onClick={toggleCallout} />
          </Stack>
        </Stack.Item>
      </Stack>
    </>
  );
};

export default ColumnActionCallout;
