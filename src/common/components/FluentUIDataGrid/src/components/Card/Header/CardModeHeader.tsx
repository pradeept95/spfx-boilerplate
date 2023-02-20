/* eslint-disable */
import { ActionButton, Checkbox, DefaultPalette, IGroup, IStackItemStyles, IStackTokens, Stack } from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { useDataTableGrid } from "../../../hooks/useDataGrid";
import { IDataGridColumn } from "../../../types/DataGridProps";
import { CardModeHeaderAction } from "./CardModeHeaderAction";
// import * as gridStyle from "./../../../styles/DataGrid.module.scss";
import { onlyUnique } from "../../../helpers/FilterHelper";
import { collapseGroupIcon, expandGroupIcon } from "../../../defaults/icons";

const stackTokens: IStackTokens = {
    childrenGap: 10,
};

const defaultActionItemStyle: IStackItemStyles = {
    root: {
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
    },
};

export const CardModeHeader: React.FunctionComponent<{ hasGroup: boolean }> = ({ hasGroup }): JSX.Element => {

    const { gridKey$, columns$, groups$, pagedItems$, selectedItems$ } = useDataTableGrid();

    const columns = useObservableState<IDataGridColumn<any>[]>(columns$, []);
    const groups = useObservableState<IGroup[]>(groups$, []);
    const pagedItems = useObservableState<any[]>(pagedItems$, []);
    const selectedItems = useObservableState<any[]>(pagedItems$, []);
    const gridKey = useObservableState<string>(gridKey$, "");

    const handleOnItemSelect = (newSelectedItems: any[], checked) => {
        const currentSelectedKeys = newSelectedItems?.map((x) => x?.[gridKey]);

        if (checked) {
            const newSelectedKeys = [...selectedItems, ...currentSelectedKeys];
            selectedItems$.next(newSelectedKeys?.filter(onlyUnique));
        } else {
            // remove current items from selected list if exists
            const otherThanCurrentSelectionKeys = selectedItems?.filter(
                (selectedItem) => {
                    return !(currentSelectedKeys?.indexOf(selectedItem) > -1);
                }
            );

            selectedItems$.next(otherThanCurrentSelectionKeys?.filter(onlyUnique));
        }
    };

    const toggleGroupExpandForGroups = (
        groups: IGroup[],
        isCollapsed?: boolean
    ) => {
        return groups?.map((group) => {
            return {
                ...group,
                isCollapsed: !isCollapsed,
                children: toggleGroupExpandForGroups(group.children, isCollapsed),
            };
        });
    };

    const toggleGropExpand = () => {
        const isAllCollapsed = groups?.every((x) => x.isCollapsed);
        const newGroup = toggleGroupExpandForGroups(groups, isAllCollapsed);
        groups$.next(newGroup);
    }

    return (
        <>
            <Stack
                enableScopedSelectors
                horizontal
                horizontalAlign="start"
                tokens={stackTokens} 
            >
                <Stack
                    enableScopedSelectors
                    horizontal
                    horizontalAlign="space-around"
                    tokens={stackTokens}
                    styles={{
                        root:
                        {
                            cursor: "pointer",
                            border: "1px solid gray",
                            borderRadius: "10px",
                            backgroundColor: DefaultPalette.neutralQuaternaryAlt,
                            marginRight: 5,
                            padding : "0px 5px"
                        }
                    }}
                >
                    <Stack.Item styles={defaultActionItemStyle}>
                        <Checkbox
                            name="Select All or DeSelect All Rows"
                            ariaLabel="Select/Deselect All Rows"
                            indeterminate={
                                pagedItems?.length &&
                                pagedItems?.some((x) => x.isSelected) &&
                                !pagedItems?.every((x) => x.isSelected)
                            }
                            checked={pagedItems?.length && pagedItems?.every((x) => x.isSelected)}
                            onChange={(_, checked) => handleOnItemSelect(pagedItems, checked)}
                        />
                    </Stack.Item>
                    {hasGroup ? (
                        <Stack.Item styles={defaultActionItemStyle}>
                            <ActionButton
                                ariaLabel={"Collapse All Columns"}
                                role="button"
                                iconProps={
                                    groups?.length && groups?.every((x) => x.isCollapsed)
                                        ? expandGroupIcon
                                        : collapseGroupIcon
                                }
                                allowDisabledFocus
                                onClick={() => toggleGropExpand()}
                                styles={{
                                    root: {
                                        padding: 0,
                                        margin: 0,
                                        height: "1rem",
                                    },
                                    flexContainer: {
                                        flexDirection: "row-reverse",
                                        //color: "white",
                                        FontWeight: 700,
                                        fontSize: "0.7rem",
                                    } 
                                }}
                            ></ActionButton>
                        </Stack.Item>
                    ) : (
                        <></>
                    )}
                </Stack>
                {
                    columns?.filter(col => !col.hideInDefaultView)?.map(col => (
                        <>
                            <CardModeHeaderAction column={col} />
                        </>
                    ))
                }
            </Stack>
        </>
    );
};
