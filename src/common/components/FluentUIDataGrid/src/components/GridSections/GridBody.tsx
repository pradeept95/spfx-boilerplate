/* eslint-disable */
import { IGroup } from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { useDataTableGrid } from "../../hooks/useDataGrid";
import { LoadingItems } from "../Table/Body/LoadingItems";
import { NoItem } from "../Table/Body/NoItem";
import { NoItemFound } from "../Table/Body/NoItemFound";
import { TableBody } from "../Table/Body/TableBody";
import { TableBodyGrouped } from "../Table/Body/TableBodyGrouped";
import TableHeader from "../Table/Header/TableHeader";
import * as gridStyle from "./../../styles/DataGrid.module.scss";


export const GridBody: React.FunctionComponent<{ isLoading: boolean }> = ({ isLoading }): JSX.Element => {

    const {
        groups$,
        items$,
        pagedItems$,
    } = useDataTableGrid();

    const items = useObservableState(items$, []);
    const pagedItems = useObservableState(pagedItems$, []);
    const groups = useObservableState<IGroup[]>(groups$, []);


    return (
        <>
            <div style={{ overflowX: isLoading ? "hidden" : "auto" }}>
                <table className={gridStyle.default.tableMainGrid}>
                    <thead>
                        <tr className={gridStyle.default.tableHeaderRow}>
                            <TableHeader hasGroup={groups?.length > 0} />
                        </tr>
                    </thead>
                    {!groups?.length ? (
                        <TableBody items={pagedItems} isLoading={isLoading} />
                    ) : (
                        <TableBodyGrouped
                            items={pagedItems}
                            groups={groups}
                            isLoading={isLoading}
                        />
                    )}
                    <tfoot></tfoot>
                </table>
                <LoadingItems loading={isLoading} />
                <NoItem noItems={!isLoading && !items?.length} />
                <NoItemFound
                    itemNotFound={
                        !isLoading && items?.length && !pagedItems?.length
                    }
                />
            </div>
        </>
    );
};
