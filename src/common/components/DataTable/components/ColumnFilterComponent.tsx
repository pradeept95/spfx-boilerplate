/* eslint-disable */
import { Callout, DefaultButton, DirectionalHint, FontWeights, IconButton, IDetailsColumnProps, IStackTokens, mergeStyleSets, Stack } from "@fluentui/react";
import { useBoolean, useId } from "@fluentui/react-hooks";
import { PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";
import { useDataTable } from "../hooks/useDataTable";
import { useFiltering } from "../services/FilterGridService";
import { clearFilterIcon, openFilterIcon } from "../types/DataTableConst";
import { BasicExpression } from "../types/FilterExpression";
import MultiselectColumnFilter from "./FilterTypeComponents/MultiselectColumnFilter";
import TextFilterComponent from "./FilterTypeComponents/TextColumnFilter";


const styles = mergeStyleSets({
  button: {
    width: 130,
  },
  callout: {
    width: 320,
    maxWidth: "90%",
    padding: "20px 24px",
  },
  title: {
    marginBottom: 12,
    fontWeight: FontWeights.semilight,
  },
  link: {
    display: "block",
    marginTop: 20,
  },
});


// Tokens definition 
const stackTokens: IStackTokens = {
  childrenGap: 5,
};

const ColumnFilterComponent: React.FunctionComponent<{ columnProp: IDetailsColumnProps }> = (props) => {

  const [filterType, _] = React.useState((props?.columnProp?.column as any)?.filterType ?? "text");

  const { columnGridFilter, getExpressionForColumnIfExist } = useFiltering();
  const { filterExpression } = useDataTable();
  const buttonId = useId("filter-button");
  const [isFilterOpen, { toggle: toggleFilterColumn }] = useBoolean(false);

  const [colFilterExpression, setColFilterExpression] = React.useState<BasicExpression>();

  const applyFilter = () => {
    columnGridFilter(colFilterExpression);
    toggleFilterColumn();
  };

  const resetFilter = (e: any) => {
    columnGridFilter({
      ...colFilterExpression,
      value: ""
    });
    toggleFilterColumn();
  };

  React.useEffect(() => {
    const filterExpressionForCurrentCol: BasicExpression = getExpressionForColumnIfExist(filterExpression, props.columnProp?.column?.fieldName);
    if (filterExpressionForCurrentCol) {
      setColFilterExpression(filterExpressionForCurrentCol);
    }
  }, [filterExpression])

  return (
    <>
      <IconButton
        id={buttonId}
        iconProps={colFilterExpression ? clearFilterIcon : openFilterIcon}
        aria-label="Click to Open Filter"
        onClick={toggleFilterColumn}
      />
      {isFilterOpen && (
        <Callout
          className={styles.callout}
          ariaLabel="Select Filter"
          role="dialog"
          gapSpace={0}
          target={`#${buttonId}`}
          onDismiss={toggleFilterColumn}
          directionalHint={DirectionalHint.bottomCenter}
          setInitialFocus
        >

          <Stack enableScopedSelectors tokens={stackTokens}>
            <Stack.Item>
              <h3>Filter by {props.columnProp?.column?.name}</h3>
            </Stack.Item>
            <Stack.Item>
              {(filterType == "multiselect") &&
                <MultiselectColumnFilter
                  column={props.columnProp?.column}
                  filterExpression={colFilterExpression}
                  setFilterExpression={setColFilterExpression}
                />}

              {(filterType == "text") &&
                <TextFilterComponent
                  column={props.columnProp?.column}
                  filterExpression={colFilterExpression}
                  setFilterExpression={setColFilterExpression}
                />
              }
            </Stack.Item>
            <Stack.Item>
              <Stack enableScopedSelectors horizontal horizontalAlign="space-between">
                <PrimaryButton text="Apply" onClick={applyFilter} />
                <DefaultButton text={!filterExpression ? "Close" : "Clear"} onClick={resetFilter} />
              </Stack>
            </Stack.Item>
          </Stack>
        </Callout>
      )}
    </>
  );
};

export default ColumnFilterComponent;
