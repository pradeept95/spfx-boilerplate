/* eslint-disable */
import { 
  DefaultButton, 
  IStackTokens,
  PrimaryButton, 
  Stack,
} from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { hasFilterExpression } from "../../helpers/FilterHelper";
import { useDataTableGrid } from "../../hooks/useDataGrid";
import { IDataGridColumn } from "../../types/DataGridProps";
import { 
  LogicalExpression,
} from "../../types/FilterExpression";
import DateFilter from "./DateFilter";
import MultiSelectFilter from "./MultiselectFilter";
import TextFilter from "./TextFilter";

// Tokens definition 
const stackToken: IStackTokens = {
  childrenGap: 2,
};

const FilterContainer: React.FunctionComponent<{
  column: IDataGridColumn<any>;
  toggleCallout: () => void;
}> = ({ column, toggleCallout }) => { 
  const [colFilterExpression, setColFilterExpression] =
    React.useState<LogicalExpression>();

  const [filterType, _] = React.useState(column?.filterType ?? "text");

  const { columns$, currentPage$ } = useDataTableGrid();
  const columns = useObservableState(columns$, []);

  const applyFilter = () => {
    const newColumn = columns?.splice(0)?.map((col) => {
      if (col?.fieldName == column?.fieldName) {
        const isFiltered = hasFilterExpression(colFilterExpression);
        return {
          ...col,
          isFiltered: isFiltered,
          filterExpression: colFilterExpression,
        };
      }
      return col;
    });
 
    currentPage$.next(1);
    columns$.next([...newColumn]);
    toggleCallout();
  };

  const clearFilter = () => {
    const newColumn = columns?.splice(0)?.map((col) => {
      if (col?.fieldName == column?.fieldName) {
        return {
          ...col,
          isFiltered: false,
          filterExpression: undefined,
        };
      }
      return col;
    });

    currentPage$.next(1);
    columns$.next([...newColumn]); 
    toggleCallout();
  };

  return (
    <>
      <Stack tokens={stackToken}>
        {filterType == "text" ? (
          <TextFilter
            column={column}
            colFilterExpression={colFilterExpression}
            setColFilterExpression={setColFilterExpression}
          />
        ) : (
          <></>
        )}
        {filterType == "date" ? (
          <DateFilter
            column={column}
            colFilterExpression={colFilterExpression}
            setColFilterExpression={setColFilterExpression}
          />
        ) : (
          <></>
        )}
        {filterType == "multiselect" ? (
          <MultiSelectFilter
            column={column}
            colFilterExpression={colFilterExpression}
            setColFilterExpression={setColFilterExpression}
          />
        ) : (
          <></>
        )}
      </Stack>
      <Stack enableScopedSelectors horizontal horizontalAlign="space-between">
        <PrimaryButton text="Apply" onClick={applyFilter} />
        <DefaultButton text={"Clear"} onClick={clearFilter} />
      </Stack>
    </>
  );
};

export default FilterContainer;
