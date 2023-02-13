/* eslint-disable */
import {
  Dropdown,
  IStackTokens,
  SearchBox,
  Separator,
  Stack,
} from "@fluentui/react";
import { ActionButton } from "office-ui-fabric-react";
import * as React from "react";
import {
  BasicExpression,
  FilterTypeOptions,
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

const TextFilterComponent: React.FunctionComponent<
  FilterTypeExpressionProps
> = (props) => {
  const { column, setFilterExpression } = props;

  const [textFilterExpresson, setTextFieldExpression] =
    React.useState<LogicalExpression>();

  const handleExpressionChanged = (
    field: keyof BasicExpression,
    index: number,
    value: string
  ) => { 
    let newExpression: LogicalExpression = { ...textFilterExpresson };
    newExpression.expressions[index][field] = value;
    setFilterExpression(newExpression);
    setTextFieldExpression(newExpression);
  };

  const handleAddExpression = () => {
    let newExpression: LogicalExpression = { ...textFilterExpresson };
    newExpression.expressions.push({
      key: column.fieldName,
      operation: "contains",
      value: "",
    } as BasicExpression);
    setFilterExpression(newExpression);
    setTextFieldExpression(newExpression);
  };

    const handleRemoveExpression = (index : number) => {
      let newExpression: LogicalExpression = { ...textFilterExpresson };
      
      // remove one item from 
      newExpression.expressions?.splice(index, 1);
        
      setFilterExpression(newExpression);
      setTextFieldExpression(newExpression);
    };

  React.useEffect(() => {

    // if no column defination, return;
    if (!column) return; 

    // otherwise calculate current filter expression
    const filterExpression = column?.filterExpression;
    if (filterExpression) {
      setTextFieldExpression(filterExpression);
    }else{
      const defaultColumnFilterExpression : LogicalExpression = {
        condition: "or",
        expressions: [
          {
            key: column.fieldName,
            operation: "contains",
            value: "",
          },
        ],
      };
      setFilterExpression(defaultColumnFilterExpression);
      setTextFieldExpression(defaultColumnFilterExpression);
    } 
  }, [column]);

  return (
    <>
      <Stack tokens={outerStackTokens}>
        {textFilterExpresson?.expressions?.map(
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
                  options={FilterTypeOptions}
                />
                <SearchBox
                  placeholder={`Filter by ${column?.name}`}
                  value={exp.value as string}
                  onChange={(_, searchTerm: string) =>
                    handleExpressionChanged("value", index, searchTerm)
                  }
                />
                {textFilterExpresson?.expressions?.length > 1 ? (
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
                {textFilterExpresson?.expressions?.length > 1 &&
                textFilterExpresson?.expressions?.length !== index + 1 ? (
                  <Separator>
                    {textFilterExpresson?.condition?.toUpperCase()}
                  </Separator>
                ) : (
                  <></>
                )}
                {textFilterExpresson?.expressions?.length === index + 1 ? (
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

export default TextFilterComponent;
