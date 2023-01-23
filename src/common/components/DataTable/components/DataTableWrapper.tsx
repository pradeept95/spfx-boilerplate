/* eslint-disable */
import {
    SearchBox,
    IDetailsListProps,
    IStyle,
    Stack,
    mergeStyles,
    IDetailsRowProps,
    IRenderFunction,
    DefaultButton,
} from "@fluentui/react";
import * as React from "react"; 
import { useDataTable } from "../hooks/useDataTable";
import { debounce, useFiltering } from "../services/FilterGridService";
import { clearFilterIcon } from "../types/DataTableConst";
import { IDatagridType } from "../types/DataTableProps";
import { FluentUIDetailsList } from "./FluentUIDetailsList";
import PaginationComponent from "./PaginationComponent";

const dataGridContainerStyle: IStyle = {
    minHeight: "60vh",
};


export const DataTableGridWrapper: React.FunctionComponent<IDatagridType<any>> = (
    props
) => {

    const { selectedItems } = useDataTable();
    const { globalGridFilter, resetGridFilter } = useFiltering()

    const dataTableProps: IDetailsListProps = {
        ...props,
        ariaLabelForSelectionColumn: "Toggle selection",
        ariaLabelForSelectAllCheckbox: "Toggle selection for all items",
        checkButtonAriaLabel: "select row",
        onRenderRow: (
            props: IDetailsRowProps,
            defaultRender?: IRenderFunction<IDetailsRowProps>
        ): JSX.Element => {
            return (
                <div data-selection-toggle="true">
                    {defaultRender && defaultRender(props)}
                </div>
            );
        },
    };

    // callback if selected item change
    React.useEffect(() => {
        (props?.onSelectionChanged && props.onSelectionChanged(selectedItems));
    }, [selectedItems])

    return (
        <>
            <Stack>
                <div className={mergeStyles(dataGridContainerStyle)}>
                    <Stack enableScopedSelectors>
                        <Stack.Item>
                            <Stack horizontal horizontalAlign="space-between"> 
                                <Stack.Item>
                                <Stack horizontal horizontalAlign="start">

                                </Stack>
                                </Stack.Item>
                                <Stack.Item>
                                    <Stack horizontal horizontalAlign="end">
                                        <SearchBox
                                            styles={{root : { width: 250}}}
                                            placeholder="Search"
                                            onChange={debounce((_, searchTerm: string) => globalGridFilter(searchTerm), 300)}
                                        />
                                        <DefaultButton 
                                            styles={{root : { minWidth: 15, width: 24}}} 
                                            iconProps={clearFilterIcon} onClick={resetGridFilter} 
                                            ariaLabel="Clear Filter"
                                            title="Clear Filter"
                                        />
                                    </Stack>
                                </Stack.Item>
                            </Stack>
                        </Stack.Item>
                        <Stack.Item>
                            <FluentUIDetailsList  {...dataTableProps} loading={props?.loading} />
                        </Stack.Item>
                        <Stack.Item>
                            <PaginationComponent />
                        </Stack.Item>
                    </Stack>
                </div>
            </Stack>
        </>
    );
};
