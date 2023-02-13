/* eslint-disable */
import {
  DatePicker,
  defaultDatePickerStrings,
  Dropdown,
  IStackTokens,
  Separator,
  Stack,
} from "@fluentui/react";
import { ActionButton } from "office-ui-fabric-react";
import * as React from "react";
import {
  BasicExpression,
  DateFilterTypeOptions,
  LogicalExpression,
} from "../../types/FilterExpression";
import { FilterTypeExpressionProps } from "../../types/FilterTypeOptions";

// Tokens definition
const innerStackTokens: IStackTokens = {
  childrenGap: 5,
};
const outerStackTokens: IStackTokens = {
  childrenGap: 10,
};

const DateFilterComponent: React.FunctionComponent<
  FilterTypeExpressionProps
> = (props) => {
  const { column, setFilterExpression } = props;

  const [dateFilterExpresson, setDateFieldExpression] =
    React.useState<LogicalExpression>();

  const handleExpressionChanged = (
    field: keyof BasicExpression,
    index: number,
    value: Date | string
  ) => {
    let newExpression: LogicalExpression = { ...dateFilterExpresson };
    newExpression.expressions[index][field] = value;
    setFilterExpression(newExpression);
    setDateFieldExpression(newExpression);
  };

  const handleAddExpression = () => {
    let newExpression: LogicalExpression = { ...dateFilterExpresson };
    newExpression.expressions.push({
      key: column.fieldName,
      operation: "date_equal",
      value: "",
    } as BasicExpression);
    setFilterExpression(newExpression);
    setDateFieldExpression(newExpression);
  };

  const handleSwitchConditionType = () => {
    let newExpression: LogicalExpression = { ...dateFilterExpresson };
    newExpression.condition = newExpression.condition == "and" ? "or" : "and";
    setFilterExpression(newExpression);
    setDateFieldExpression(newExpression);
  };

  const handleRemoveExpression = (index: number) => {
    let newExpression: LogicalExpression = { ...dateFilterExpresson };

    // remove one item from
    newExpression.expressions?.splice(index, 1);

    setFilterExpression(newExpression);
    setDateFieldExpression(newExpression);
  };

  React.useEffect(() => {
    // if no column defination, return;
    if (!column) return;

    // otherwise calculate current filter expression
    const filterExpression = column?.filterExpression;
    if (filterExpression) {
      setDateFieldExpression(filterExpression);
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
      setFilterExpression(defaultColumnFilterExpression);
      setDateFieldExpression(defaultColumnFilterExpression);
    }
  }, [column]);

  return (
    <>
      <Stack tokens={outerStackTokens}>
        {dateFilterExpresson?.expressions?.map(
          (exp: BasicExpression, index: number) => (
            <>
              <Stack tokens={innerStackTokens}>
                <Dropdown
                  ariaLabel="Select Operation Type"
                  selectedKey={exp.operation}
                  // eslint-disable-next-line react/jsx-no-bind
                  onChange={(_, option) =>
                    handleExpressionChanged(
                      "operation",
                      index,
                      `${option?.key}`
                    )
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
                {dateFilterExpresson?.expressions?.length > 1 ? (
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
                {dateFilterExpresson?.expressions?.length > 1 &&
                dateFilterExpresson?.expressions?.length !== index + 1 ? (
                  <Separator>
                    <ActionButton
                      iconProps={{ iconName: "Add" }}
                      text={dateFilterExpresson?.condition?.toUpperCase()}
                      title="Toggle Condition Type"
                      ariaLabel="Toggle Condition Type"
                      onClick={handleSwitchConditionType}
                    />
                  </Separator>
                ) : (
                  <></>
                )}
                {dateFilterExpresson?.expressions?.length === index + 1 ? (
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
      </Stack>
    </>
  );
};

export default DateFilterComponent;
