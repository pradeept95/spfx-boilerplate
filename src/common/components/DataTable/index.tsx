/* eslint-disable */
import { ShimmeredDetailsList, DetailsListLayoutMode, MarqueeSelection, Selection, SelectionMode, Spinner, SearchBox } from "@fluentui/react";
import * as React from "react";
import PaginationComponent from "./components/PaginationComponent";
import useDataTable from "./hooks/useDataTable";
import { IDatagridType } from "./types/DataTableProps";


export const DataTableGrid: React.FunctionComponent<IDatagridType<any>> = (props) => {

    const _selection = new Selection({
        onSelectionChanged: () => {
            console.log(_getSelectionDetails())
        },
    });
    const { onItemInvoked, loading } = props

    const _getKey = (item: any, index?: number): string => {
        return item.key;
    }

    const _getSelectionDetails = (): string => {
        const selectionCount = _selection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected';
            default:
                return `${selectionCount} items selected`;
        }
    }

    const [
        pagedItems,
        filteredItems,
        currentPage,
        columns,
        onPageChange,
        onFilterTable] = useDataTable<IDatagridType<any>>(props);

    return (
        <> 
             <SearchBox placeholder="Search" onChange={(_,searchTerm : string) => onFilterTable(searchTerm)} />
            <MarqueeSelection selection={_selection}>
                <ShimmeredDetailsList
                    items={pagedItems ?? []}
                    compact={true}
                    columns={columns}
                    setKey="multiple"
                    selectionMode={SelectionMode.multiple}
                    getKey={_getKey}
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    selection={_selection}
                    selectionPreservedOnEmptyClick={true}
                    onItemInvoked={onItemInvoked}
                    enterModalSelectionOnTouch={true}
                    ariaLabelForSelectionColumn="Toggle selection"
                    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                    checkButtonAriaLabel="select row"
                />
                <div>
                    {loading && <Spinner label="Please Wait..." />}
                    {!pagedItems?.length && <div> No Record to Display</div>}
                </div> 

                <PaginationComponent
                    totalCount={filteredItems?.length ?? 0}
                    pageSize={props?.pageSize ?? 10}
                    currentPage={currentPage}
                    onPageChange={onPageChange} />
            </MarqueeSelection>
        </>
    )

}
