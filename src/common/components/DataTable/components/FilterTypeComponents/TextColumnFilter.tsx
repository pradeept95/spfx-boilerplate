/* eslint-disable */
import { Dropdown, IStackTokens, SearchBox, Stack } from "@fluentui/react";
import * as React from "react";
import { BasicExpression, FilterOperationType, FilterTypeOptions } from "../../types/FilterExpression";
import { FilterTypeExpressionProps } from "../../types/FilterTypeOptions";


// Tokens definition 
const stackTokens: IStackTokens = {
    childrenGap: 5,
};

const TextFilterComponent: React.FunctionComponent<FilterTypeExpressionProps> = (props) => {

    const { column, filterExpression, setFilterExpression } = props;

    const [filteredValues, setFilteredValues] = React.useState<string>("")
    const [filterOperation, setFilterOperation] = React.useState<FilterOperationType>("contains")

    const onFilterValueChange = (searchTerm: string) => {

        setFilteredValues(searchTerm)
        setFilterExpression({
            key: column.fieldName,
            operation: filterOperation,
            value: searchTerm

        } as BasicExpression);
    };

    React.useEffect(() => {
        const searchValue = (filterExpression as BasicExpression)?.value as string ?? ""
        setFilteredValues(searchValue);
        console.log("Filter Expression", filterExpression)
    }, [filterExpression])

    return (
        <>
            <Stack tokens={stackTokens}>
                <Dropdown
                    ariaLabel="Select Page Size"
                    selectedKey={filterOperation}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={(_, option) => setFilterOperation(`${option.key}` as FilterOperationType)}
                    options={FilterTypeOptions}
                />
                <SearchBox
                    placeholder={`Filter by ${column?.name}`}
                    value={filteredValues}
                    onChange={(_, searchTerm: string) => onFilterValueChange(searchTerm)}
                />
            </Stack>
        </>
    );
};

export default TextFilterComponent;
