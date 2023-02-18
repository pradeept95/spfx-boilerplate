/* eslint-disable */
import { Dropdown, IComboBoxOption, IStackStyles, IStackTokens, Stack } from "@fluentui/react";
import * as React from "react";
import { DEFAULT_PAGE_SIZE } from "../../defaults/constants";
import { DEFAULT_PAGE_OPTIONS } from "../../defaults/page-size-options";
import { useDataTableGrid } from "../../hooks/useDataGrid";
import GridPaginationComponent from "../Pagination/GridPaginationComponent";

const footerStackStyles: IStackStyles = { root: { margin: "0.6rem 0rem" } };
const stackTokens: IStackTokens = {
    childrenGap: 5,
};

export const GridFooter: React.FunctionComponent<{ pageSize: number, pageOptions : IComboBoxOption[] }> = ({ pageSize, pageOptions }): JSX.Element => {
    const {
        pageSize$,
        currentPage$,
    } = useDataTableGrid();

    return (
        <>
            <Stack
                enableScopedSelectors
                horizontal
                horizontalAlign="space-between"
                tokens={stackTokens}
                styles={footerStackStyles}
            >
                <Stack.Item>
                    <Dropdown
                        styles={{ root: { maxWidth: 100 } }}
                        ariaLabel="Select Page Size"
                        role={"combobox"}
                        defaultSelectedKey={pageSize ?? DEFAULT_PAGE_SIZE}
                        options={pageOptions ?? DEFAULT_PAGE_OPTIONS}
                        onChange={(_, pageOption) => {
                            pageSize$.next(pageOption?.key);
                            currentPage$.next(1);
                        }}
                    />
                </Stack.Item>
                <Stack.Item>
                    <GridPaginationComponent />
                </Stack.Item>
            </Stack>
        </>
    );
};
