/* eslint-disable */
import {
  Dropdown,
  IStackTokens, 
  Separator,
  SpinButton,
  Stack,
} from "@fluentui/react";
import { ActionButton } from "office-ui-fabric-react";
import * as React from "react";
import {
  BasicExpression,
  NumberFilterTypeOptions,
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

const NumberFilterComponent: React.FunctionComponent<
  FilterTypeExpressionProps
> = (props) => {
  const { column, setFilterExpression } = props;

  const [numberFilterExpresson, setNumberFieldExpression] =
    React.useState<LogicalExpression>();

  const handleExpressionChanged = (
    field: keyof BasicExpression,
    index: number,
    value: string
  ) => {
    let newExpression: LogicalExpression = { ...numberFilterExpresson };
    newExpression.expressions[index][field] = value;
    setFilterExpression(newExpression);
    setNumberFieldExpression(newExpression);
  };

  const handleAddExpression = () => {
    let newExpression: LogicalExpression = { ...numberFilterExpresson };
    newExpression.expressions.push({
      key: column.fieldName,
      operation: "equal",
      value: "",
    } as BasicExpression);
    setFilterExpression(newExpression);
    setNumberFieldExpression(newExpression);
  };

  const handleRemoveExpression = (index: number) => {
    let newExpression: LogicalExpression = { ...numberFilterExpresson };

    // remove one item from
    newExpression.expressions?.splice(index, 1);

    setFilterExpression(newExpression);
    setNumberFieldExpression(newExpression);
  };

  React.useEffect(() => {
    // if no column defination, return;
    if (!column) return;

    // otherwise calculate current filter expression
    const filterExpression = column?.filterExpression;
    if (filterExpression) {
      setNumberFieldExpression(filterExpression);
    } else {
      const defaultColumnFilterExpression: LogicalExpression = {
        condition: "or",
        expressions: [
          {
            key: column.fieldName,
            operation: "equal",
            value: "",
          },
        ],
      };
      setFilterExpression(defaultColumnFilterExpression);
      setNumberFieldExpression(defaultColumnFilterExpression);
    }
  }, [column]);

  return (
    <>
      <Stack tokens={outerStackTokens}>
        {numberFilterExpresson?.expressions?.map(
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
                  options={NumberFilterTypeOptions}
                />
                <SpinButton
                  placeholder={`Filter by ${column?.name}`}
                  value={exp.value as string}
                  onChange={(_, searchTerm: string) =>
                    handleExpressionChanged("value", index, searchTerm)
                  }
                />
                {numberFilterExpresson?.expressions?.length > 1 ? (
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
                {numberFilterExpresson?.expressions?.length > 1 &&
                numberFilterExpresson?.expressions?.length !== index + 1 ? (
                  <Separator>
                    {numberFilterExpresson?.condition?.toUpperCase()}
                  </Separator>
                ) : (
                  <></>
                )}
                {numberFilterExpresson?.expressions?.length === index + 1 ? (
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

export default NumberFilterComponent;
