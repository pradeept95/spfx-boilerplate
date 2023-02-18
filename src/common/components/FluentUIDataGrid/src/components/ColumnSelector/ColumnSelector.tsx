/* eslint-disable */
import { Callout, Checkbox, DefaultButton, mergeStyleSets } from "@fluentui/react";
import { Text } from '@fluentui/react/lib/Text';
import { useBoolean, useId } from "@fluentui/react-hooks";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { colHideShowIcon } from "../../defaults/icons";
import { useDataTableGrid } from "../../hooks/useDataGrid";
import { IDataGridColumn } from "../../types/DataGridProps";

const styles = mergeStyleSets({
    callout: {
        width: 250,
        maxWidth: "90%",
        padding: "20px 24px",
    },
    checkbox : { 
        marginBottom: 5
    }
});

export const ColumnSelector: React.FunctionComponent<{}> = (): JSX.Element => {

    const buttonId = useId("open-column-selector-button");

    const [isSelectColumnVisible, { toggle: toggleIsSelectColumnVisible }] = useBoolean(false);
    const { columns$ } = useDataTableGrid();

    const columns = useObservableState<IDataGridColumn<any>[]>(columns$, []);

    const handleHideShowColumn = (isSelected: boolean, fieldName: string) => {
        const newColumn = [...columns]?.map(col => {
            return {
                ...col,
                hideInDefaultView: col.fieldName == fieldName ? !isSelected : col.hideInDefaultView
            }
        }) 
        columns$.next(newColumn);
    }

    return (
        <>
            <DefaultButton
                id={buttonId}
                styles={{ root: { minWidth: 15, width: 24, marginLeft : 5 } }}
                iconProps={colHideShowIcon}
                onClick={toggleIsSelectColumnVisible}
                ariaLabel="Show/Hide Columns"
                title="Show/Hide Columns"
            />
            {isSelectColumnVisible && (
                <Callout
                    className={styles.callout}
                    role="dialog"
                    gapSpace={0}
                    target={`#${buttonId}`}
                    onDismiss={toggleIsSelectColumnVisible}
                    setInitialFocus
                >
                    <Text variant="xLarge" nowrap block>
                        Hide/Show Columns
                    </Text>
                    {columns?.map((col) => (
                        <Checkbox
                            label={col.name}
                            checked={!col.hideInDefaultView}
                            disabled={col.disableHideShow}
                            onChange={(_, isChecked) => handleHideShowColumn(isChecked, col.fieldName)}
                            className={styles.checkbox}
                        />
                    ))}
                </Callout>
            )}

        </>
    );
};
