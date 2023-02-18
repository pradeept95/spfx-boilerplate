/* eslint-disable */
import {
    DefaultButton,
    IconButton, 
    IStackTokens,
    PrimaryButton,
    Stack,
} from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { combineLatestWith, map } from "rxjs";
import { moveToFirstIcon, moveToLastIcon, moveToNextIcon, moveToPreviousIcon } from "../../defaults/icons";
import { getPageSelectionOptions } from "../../helpers/PaginationHelpers";
import { useDataTableGrid } from "../../hooks/useDataGrid";

import * as gridStyle from "../../styles/DataGrid.module.scss"


const stackTokens: IStackTokens = { childrenGap: 10 }; 

const GridPaginationComponent: React.FunctionComponent<{}> = () => {

    const { filteredItems$, pageSize$, currentPage$ } = useDataTableGrid();
    const pageOptions$ = React.useMemo(() => pageSize$.pipe(
        combineLatestWith(currentPage$, filteredItems$),
        map(([pSize, cPage, [filteredItems, columns]]) => {
            const totalNumberOfPages = filteredItems?.length > 0 ? Math.ceil(filteredItems.length / pSize) : 1;
            const pageOptions = getPageSelectionOptions(cPage, totalNumberOfPages);
            return [pageOptions, totalNumberOfPages] as const;
        })
    ), []);

    const currentPage = useObservableState(currentPage$, 1); 
    const [pageOptions, totalNumberOfPages] = useObservableState(pageOptions$, [[1], 1]);
    
    const handlePageChanges = (action: "first" | 'previous' | "next" | "last" | "current", pageNumber: number) => {
        let nextPage = pageNumber ?? 1;
        switch (action) {

            case 'previous':
                nextPage = pageNumber <= 1 ? 1 : pageNumber;
                break;

            case 'next':
                nextPage = pageNumber > totalNumberOfPages ? totalNumberOfPages : pageNumber;
                break;

            case 'first':
            case 'last':
            case 'current':
            default:
                nextPage = pageNumber;
                break;
        }

        currentPage$.next(nextPage);
    }

    return (
        <>
            <Stack
                enableScopedSelectors
                horizontal
                horizontalAlign="end"
                tokens={stackTokens} 
            >
                <Stack.Item>
                    <div style={{ paddingTop: "5px" }}>
                        Showing Page {currentPage} of {totalNumberOfPages}
                    </div>
                </Stack.Item>
                <Stack.Item>
                    <IconButton
                        iconProps={moveToFirstIcon}
                        aria-label="First"
                        onClick={() => handlePageChanges("first", 1)}
                        className={gridStyle.default.dataGridPageIconBtn}
                        disabled={currentPage === 1}
                    />
                    <IconButton
                        iconProps={moveToPreviousIcon}
                        aria-label="Previous"
                        onClick={() => handlePageChanges("previous", currentPage - 1)}
                        className={gridStyle.default.dataGridPageIconBtn}
                        disabled={currentPage === 1}
                    />
                    {pageOptions.map((page) => {
                        const button =
                            page === currentPage ? (
                                <PrimaryButton
                                    text={`${page}`}
                                    ariaLabel={`Show Page ${page}`}
                                    allowDisabledFocus
                                    className={gridStyle.default.dataGridPageActionBtn}
                                />
                            ) : (
                                <DefaultButton
                                    text={`${page}`}
                                    ariaLabel={`Show Page ${page}`}
                                    onClick={() => handlePageChanges("current", page)}
                                    allowDisabledFocus
                                    className={gridStyle.default.dataGridPageActionBtn}
                                />
                            );
                        return button;
                    })}
                    <IconButton
                        iconProps={moveToNextIcon}
                        aria-label="Next"
                        onClick={() => handlePageChanges("next", currentPage + 1)}
                        className={gridStyle.default.dataGridPageIconBtn}
                        disabled={currentPage === totalNumberOfPages}
                    />
                    <IconButton
                        iconProps={moveToLastIcon}
                        aria-label="Last"
                        onClick={() => handlePageChanges("last", totalNumberOfPages)}
                        className={gridStyle.default.dataGridPageIconBtn}
                        disabled={currentPage === totalNumberOfPages}
                    />
                </Stack.Item>
            </Stack>
        </>
    );
};

export default GridPaginationComponent;