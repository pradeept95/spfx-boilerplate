/* eslint-disable */
import { IColumn, IDetailsColumnProps, IDetailsListProps, IRenderFunction, IStackTokens, MarqueeSelection, Selection, ShimmeredDetailsList, Stack } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import { useDataTable } from "..//hooks/useDataTable";
import { useSorting } from "../services/SortGridService";
import ColumnFilterComponent from "./ColumnFilterComponent";

const filterIconStyle: React.CSSProperties = {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: 25,
};

const headerAreaStyle: React.CSSProperties = {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer"
};

const stackTokens: IStackTokens = { childrenGap: 5 };

const _getKey = (item: any, index?: number): string => {
    return item?.id;
};

export const FluentUIDetailsList: React.FunctionComponent<IDetailsListProps & { loading: boolean }> = (props) => {
    const { loading } = props;

    const [gridColumns, setGridColumns] = useState<IColumn[]>([])
    const { pagedItems, filteredItems, columns, selectedItems, setSelectedItems } = useDataTable()
    const { sortDataGrid } = useSorting()

    const _selection = new Selection({
        onSelectionChanged: () => {
            console.log(_getSelectionDetails());
            const newSelectedItems = [...selectedItems, _selection.getSelection()]
            setSelectedItems(newSelectedItems)
        },
        getKey: _getKey,
    });

    const _getSelectionDetails = (): string => {
        const selectionCount = _selection.getSelectedCount();
        switch (selectionCount) {
            case 0:
                return "No items selected";
            case 1:
                return "1 item selected";
            default:
                return `${selectionCount} items selected`;
        }
    };

    React.useEffect(() => {

        const newColumns = [...columns];

        newColumns.forEach((newCol: IColumn) => {
            //newCol.onColumnClick = (e, c) => sortDataGrid(c, newColumns, filteredItems);


            newCol.onRenderHeader = (
                colProps?: IDetailsColumnProps,
                defaultRender?: IRenderFunction<IDetailsColumnProps>
            ): JSX.Element | null => (
                <>
                    <Stack
                        enableScopedSelectors
                        horizontal
                        horizontalAlign="space-around"
                        tokens={stackTokens} >
                        <span role={'button'}
                            tabIndex={0}
                            title={"Click to Sort Column"}
                            style={headerAreaStyle}
                            onClick={() => sortDataGrid(colProps.column, newColumns, filteredItems)}>
                            {(defaultRender && defaultRender(colProps)) || <></>}
                        </span>
                        <span style={filterIconStyle}>
                            <ColumnFilterComponent columnProp={colProps} />
                        </span>
                    </Stack>
                </>
            ),


                newCol.showSortIconWhenUnsorted = false;
        });

        setGridColumns(columns);

    }, [columns, filteredItems])


    return (
        <>
            <MarqueeSelection selection={_selection}>
                <ShimmeredDetailsList
                    {...props}
                    selection={_selection}
                    items={pagedItems}
                    columns={gridColumns}
                    enableShimmer={loading} />
            </MarqueeSelection>
        </>
    );
};
