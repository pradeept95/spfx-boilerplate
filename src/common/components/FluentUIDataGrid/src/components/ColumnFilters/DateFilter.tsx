/* eslint-disable */
import {
  ActionButton,
  DatePicker,
  defaultDatePickerStrings,
  Dropdown,
  IStackTokens, 
  Separator,
  Stack,
} from "@fluentui/react";
import * as React from "react";
import { DataGridColumn } from "../../types/DataGridProps";
import {
  BasicExpression,
  DateFilterTypeOptions, 
  LogicalExpression,
} from "../../types/FilterExpression";

// Tokens definition
const innerStackTokens: IStackTokens = {
  childrenGap: 5,
};

const DateFilter: React.FunctionComponent<{
  column: DataGridColumn<any>;
  colFilterExpression: LogicalExpression;
  setColFilterExpression: React.Dispatch<
    React.SetStateAction<LogicalExpression>
  >;
}> = (props) => {
  const { column, colFilterExpression, setColFilterExpression } = props;

  const handleExpressionChanged = (
    field: keyof BasicExpression,
    index: number,
    value: string | Date
  ) => {
    let newExpression: LogicalExpression = { ...colFilterExpression };
    newExpression.expressions[index][field] = value;
    setColFilterExpression(newExpression);
  };

  const handleAddExpression = () => {
    let newExpression: LogicalExpression = { ...colFilterExpression };
    newExpression.expressions.push({
      key: column.fieldName,
      operation: "contains",
      value: "",
    } as BasicExpression);
    setColFilterExpression(newExpression);
  };

  const handleRemoveExpression = (index: number) => {
    let newExpression: LogicalExpression = { ...colFilterExpression };

    // remove one item from
    newExpression.expressions?.splice(index, 1);
    setColFilterExpression(newExpression);
  };

  const handleSwitchConditionType = () => {
    let newExpression: LogicalExpression = { ...colFilterExpression };
    newExpression.condition = newExpression.condition == "and" ? "or" : "and";
    setColFilterExpression(newExpression);
  };

  React.useEffect(() => {
    // if no column defination, return;
    if (!column) return;

    // otherwise calculate current filter expression
    const filterExpression = column?.filterExpression;
    if (filterExpression) {
      setColFilterExpression(filterExpression);
    } else {
      const defaultColumnFilterExpression: LogicalExpression = {
        condition: "or",
        expressions: [
          {
            key: column.fieldName,
            operation: "date_equal",
            value: "",
          },
        ],
      };
      setColFilterExpression(defaultColumnFilterExpression);
    }
  }, [column]);

  return (
    <>
      {colFilterExpression?.expressions?.map(
        (exp: BasicExpression, index: number) => (
          <>
            <Stack tokens={innerStackTokens}>
              <Dropdown
                ariaLabel="Select Operation Type"
                selectedKey={exp.operation}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={(_, option) =>
                  handleExpressionChanged("operation", index, `${option?.key}`)
                }
                options={DateFilterTypeOptions}
              />
              <DatePicker
                placeholder={`Filter by ${column?.name}`}
                ariaLabel="Select a date"
                value={exp.value as Date}
                strings={defaultDatePickerStrings}
                onSelectDate={(date: Date) =>
                  handleExpressionChanged("value", index, date)
                }
                allowTextInput
                //formatDate={formatDate}
              />
              {colFilterExpression?.expressions?.length > 1 ? (
                <Separator>
                  <ActionButton
                    iconProps={{
                      iconName: "Delete",
                      styles: { root: { color: "red" } },
                    }}
                    text={"Remove Rule"}
                    title="Remove Filter Rule"
                    ariaLabel="Remove Filter Rule"
                    onClick={() => handleRemoveExpression(index)}
                    styles={{
                      root: {
                        color: "red",
                      },
                    }}
                  />
                </Separator>
              ) : (
                <></>
              )}
              {colFilterExpression?.expressions?.length > 1 &&
              colFilterExpression?.expressions?.length !== index + 1 ? (
                <Separator>
                  <ActionButton 
                    text={colFilterExpression?.condition?.toUpperCase()}
                    title="Toggle Condition Type"
                    ariaLabel="Toggle Condition Type"
                    onClick={handleSwitchConditionType}
                  />
                </Separator>
              ) : (
                <></>
              )}
              {colFilterExpression?.expressions?.length === index + 1 ? (
                <Separator>
                  <ActionButton
                    iconProps={{ iconName: "Add" }}
                    text={"Add Rule"}
                    title="Add Filter Rule"
                    ariaLabel="Add Filter Rule"
                    onClick={handleAddExpression}
                  />
                </Separator>
              ) : (
                <></>
              )}
            </Stack>
          </>
        )
      )}
    </>
  );
};

export default DateFilter;
