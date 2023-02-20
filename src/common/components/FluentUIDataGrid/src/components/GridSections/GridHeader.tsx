/* eslint-disable */
import { CommandBar, DefaultButton, IButtonProps, ICommandBarItemProps, SearchBox, Stack } from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { clearFilterIcon } from "../../defaults/icons";
import { useDataTableGrid } from "../../hooks/useDataGrid";
import { IDataGridColumn } from "../../types/DataGridProps";
import { ColumnSelector } from "../ColumnSelector/ColumnSelector";

const overflowProps: IButtonProps = { ariaLabel: "More commands" };

export const GridHeader: React.FunctionComponent<{
    actionMenuItems: ICommandBarItemProps[],
    actionOverflowMenuItems: ICommandBarItemProps[],
    actionFarMenuItems: ICommandBarItemProps[]
}> = ({ actionMenuItems, actionFarMenuItems, actionOverflowMenuItems }): JSX.Element => {

    const {
        columns$,
        globalFilter$,
        currentPage$,
    } = useDataTableGrid();

    const columns = useObservableState<IDataGridColumn<any>[]>(columns$, []);
    const globalFilter = useObservableState<string>(globalFilter$, "");

    const handleResetFilter = () => {
        const newColumns = columns?.splice(0)?.map(
            (col: IDataGridColumn<any>) => {
                return {
                    ...col,
                    isFiltered: false,
                    filterExpression: undefined,
                };
            }
        );
        globalFilter$.next("");
        currentPage$.next(1);
        columns$.next([...newColumns]);
    }

    const handleKeywordSearch = (_, searchTerm: string) => {
        globalFilter$.next(searchTerm);
        currentPage$.next(1);
    }

    return (
        <>
            <Stack
                horizontal
                horizontalAlign="space-between"
                verticalAlign="center"
            >
                <Stack.Item styles={{ root: { width: "100%" } }}>
                    <CommandBar
                        items={actionMenuItems}
                        overflowItems={actionOverflowMenuItems}
                        farItems={actionFarMenuItems}
                        overflowButtonProps={overflowProps}
                        ariaLabel="Grid Actions"
                        role={"navigation"}
                        styles={
                            {
                                root: {
                                    padding: "0px 15px 0px 0px"
                                }
                            }
                        } 
                    />
                </Stack.Item>
                <Stack.Item>
                    <Stack horizontal horizontalAlign="end">
                        <SearchBox
                            styles={{ root: { width: 300 } }}
                            placeholder="Search Keywords"
                            aria-label="Search in Grid"
                            value={globalFilter}
                            onChange={handleKeywordSearch}
                        />
                        <DefaultButton
                            styles={{ root: { minWidth: 15, width: 24 } }}
                            iconProps={clearFilterIcon}
                            onClick={handleResetFilter}
                            ariaLabel="Clear Filter"
                            title="Clear Filter"
                        />
                        <ColumnSelector />
                    </Stack>
                </Stack.Item>
            </Stack>
        </>
    );
};
