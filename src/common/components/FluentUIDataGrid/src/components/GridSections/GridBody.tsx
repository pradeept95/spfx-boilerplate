/* eslint-disable */
import { IGroup } from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { useDataTableGrid } from "../../hooks/useDataGrid";
import { CardModeBody } from "../Card/Body/CardModeBody";
import { CardModeGroupedBody } from "../Card/Body/CardModeGroupBody";
import { CardModeHeader } from "../Card/Header/CardModeHeader";
import { LoadingItems } from "../Table/Body/LoadingItems";
import { NoItem } from "../Table/Body/NoItem";
import { NoItemFound } from "../Table/Body/NoItemFound";
import { TableBody } from "../Table/Body/TableBody";
import { TableBodyGrouped } from "../Table/Body/TableBodyGrouped";
import TableHeader from "../Table/Header/TableHeader";
import * as gridStyle from "./../../styles/DataGrid.module.scss";

export const GridBody: React.FunctionComponent<{
    isLoading: boolean,
    emptyGridMessage: string,
    emptySearchResultMessage: string,
    isTableMode: boolean,
    onCardViewRender : (
        item : any, 
        isSelected : boolean, 
        onItemSelect : (changedItems: any[], isSelected : boolean) => void ) => JSX.Element;
}> = ({ isLoading, emptyGridMessage, emptySearchResultMessage, isTableMode, onCardViewRender }): JSX.Element => {

    const {
        items$,
        pagedItems$,
    } = useDataTableGrid();

    const items = useObservableState(items$, []);
    const pagedItems = useObservableState(pagedItems$, []);

    return (
        <>
            <div>
                {(!isLoading && isTableMode) ? <TableMode /> : <></>}
                {(!isLoading && !isTableMode) ? <CardGridMode onCardViewRender={onCardViewRender}/> : <></>}
                {/* table no-item, loading, no filtered item section */}
                <LoadingItems loading={isLoading} />
                <NoItem noItems={!isLoading && !items?.length} message={emptyGridMessage} />
                <NoItemFound
                    itemNotFound={
                        !isLoading && items?.length && !pagedItems?.length
                    }
                    message={emptySearchResultMessage}
                />
            </div>
        </>
    );
};

const TableMode: React.FunctionComponent<{}> = ({ }): JSX.Element => {
    const {
        groups$,
        pagedItems$
    } = useDataTableGrid();
    const groups = useObservableState<IGroup[]>(groups$, []);
    const pagedItems = useObservableState(pagedItems$, []);

    return (<>
        <table className={gridStyle.default.tableMainGrid}>
            {/* Table Header section*/}
            <TableHeader hasGroup={groups?.length > 0} />

            {/* table body section */}
            {!groups?.length ? (
                <TableBody items={pagedItems} />
            ) : (
                <TableBodyGrouped
                    items={pagedItems}
                    groups={groups}
                />
            )}
        </table>
    </>)

}

const CardGridMode: React.FunctionComponent<{
    onCardViewRender : (
        item : any, 
        isSelected : boolean, 
        onItemSelect : (changedItems: any[], isSelected : boolean) => void ) => JSX.Element;
}> = ({ onCardViewRender }): JSX.Element => {
    const {
        groups$,
        pagedItems$
    } = useDataTableGrid();
    const groups = useObservableState<IGroup[]>(groups$, []);
    const pagedItems = useObservableState(pagedItems$, []);

    return (<>
        <div className={gridStyle.default.tableMainGrid}>
            {/* Grid Mode Header section*/}
            <CardModeHeader hasGroup={groups?.length > 0} />

            {/* Grid Mode body section */}
            {!groups?.length ? (
                <CardModeBody items={pagedItems} onCardViewRender={onCardViewRender}/>
            ) : (
                <CardModeGroupedBody
                    items={pagedItems}
                    groups={groups}
                    onCardViewRender={onCardViewRender}
                />
            )}
        </div>
    </>)
}
