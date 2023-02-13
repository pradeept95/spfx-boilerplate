/* eslint-disable */
import { 
  IDetailsColumnProps,
  IStackTokens,
  Stack,
} from "@fluentui/react"; 
import * as React from "react"; 
import { IDataGridColumn } from "../types/DataTableProps"; 
import ColumnFilterContainer from "./ColumnFilterContainer"; 
import { GroupColumn } from "./GroupColumn";
import { SortColumn } from "./SortColumn";

const stackTokens: IStackTokens = { childrenGap: 5 };

const ColumnActionCallout: React.FunctionComponent<{
  columnProp: IDetailsColumnProps;
  toggleCallout: () => void 
}> = ({ columnProp, toggleCallout }) => {  

  const columnDetails = columnProp?.column as IDataGridColumn; 

  const disableFilter =
    columnDetails?.disableFilter !== undefined && columnDetails?.disableFilter;

  const disableSorting =
    columnDetails?.disableSorting !== undefined &&
    columnDetails?.disableSorting;

  const disableGrouping =
    columnDetails?.disableGrouping !== undefined &&
    columnDetails?.disableGrouping;
 
  return (
    <>
      <Stack enableScopedSelectors tokens={stackTokens}>
        {!disableSorting && (
          <Stack.Item>
            <SortColumn columnProp={columnProp} />
          </Stack.Item>
        )}
        {!disableGrouping && (
          <Stack.Item>
            <GroupColumn columnProp={columnProp} />
          </Stack.Item>
        )}
        {!disableFilter && (
          // <>
          //   <Stack.Item>
          //     <Text variant="mediumPlus" nowrap block>
          //       Filter by {columnProp?.column?.name}
          //     </Text>
          //   </Stack.Item>
          //   <Stack.Item>
          //     {filterType == "multiselect" && (
          //       <MultiselectColumnFilter
          //         column={columnProp?.column}
          //         filterExpression={colFilterExpression}
          //         setFilterExpression={setColFilterExpression}
          //       />
          //     )}

          //     {filterType == "text" && (
          //       <TextFilterComponent
          //         column={columnProp?.column}
          //         filterExpression={colFilterExpression}
          //         setFilterExpression={setColFilterExpression}
          //       />
          //     )}
          //   </Stack.Item>
          //   <Stack.Item>
          //     <Stack
          //       enableScopedSelectors
          //       horizontal
          //       horizontalAlign="space-between"
          //     >
          //       <PrimaryButton text="Apply" onClick={applyFilter} />
          //       <DefaultButton text={"Close"} onClick={toggleCallout} />
          //     </Stack>
          //   </Stack.Item>
          // </>
          <ColumnFilterContainer columnProp={columnProp} toggleCallout={toggleCallout} />
        )}
      </Stack>
    </>
  );
};

export default ColumnActionCallout;
