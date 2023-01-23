/* eslint-disable */
import { Checkbox,  IStackTokens, Stack } from "@fluentui/react";
import * as React from "react";
import { useDataTable } from "../..//hooks/useDataTable";
import { BasicExpression, FilterOperationType } from "../../types/FilterExpression";
import { FilterTypeExpressionProps } from "../../types/FilterTypeOptions";

// Tokens definition 
const stackTokens: IStackTokens = {
    childrenGap: 5,
};

function onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
} 

function compareValues(a : any, b : any){
    if(a.firstname < b.firstname) { return -1; }
    if(a.firstname > b.firstname) { return 1; }
    return 0;
}

const MultiselectColumnFilter: React.FunctionComponent<FilterTypeExpressionProps> = (props) => {

    const { column, filterExpression, setFilterExpression } = props;
    const [filterOperation, _] = React.useState<FilterOperationType>("includes")

    const [filterOptions, setFilterOptions] = React.useState<string[]>([])
    const [filteredValues, setFilteredValues] = React.useState<string[]>([])    

    const { items } = useDataTable();
    const onSelectionChange = (isChecked: boolean, currentValue: string) => {

        const existingFilterValue = filteredValues?.length ? filteredValues : []; 
        const newSelected = isChecked ? [...existingFilterValue, currentValue] : [...existingFilterValue?.filter(f => f !== currentValue)]

        setFilterExpression({
            key: column.fieldName,
            operation: filterOperation,
            value: newSelected

        } as BasicExpression);

        setFilteredValues(newSelected);
    }

    React.useEffect(() => {
        const selectionOptions = items?.map((item: any) => item?.[column?.fieldName]);
        let uniqueOptions = selectionOptions.filter(onlyUnique).sort(compareValues);
        setFilterOptions(uniqueOptions);
    }, [items])

    React.useEffect(() => {  
        setFilteredValues((filterExpression as BasicExpression)?.value as string[]);
        console.log("Filter Expression", filterExpression)
    }, [filterExpression])


    return (
        <>
            <Stack tokens={stackTokens} styles={{root : { maxHeight : '300px', overflowY: 'scroll' }}}>
                {
                    filterOptions?.map(option => <Checkbox
                        label={option}
                        checked={filteredValues?.indexOf(option) > -1}
                        onChange={(_, isChecked) => onSelectionChange(isChecked, option)} />)
                }
            </Stack>
        </>
    );
};

export default MultiselectColumnFilter;