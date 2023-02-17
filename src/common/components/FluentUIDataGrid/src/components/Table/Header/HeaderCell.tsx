/* eslint-disable */
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { useDataTableGrid } from "../../../hooks/useDataGrid";
import { DataGridColumn } from "../../../types/DataGridProps";
import { useBoolean, useId } from "@fluentui/react-hooks";
import {
  ActionButton,
  Callout,
  FontIcon,
  FontWeights,
  IStackItemStyles,
  IStackTokens,
  mergeStyles,
  mergeStyleSets,
  Separator,
  Stack,
} from "@fluentui/react";
import FilterContainer from "../../ColumnFilters/FilteContainer";
import {
  ColseCalloutIcon,
  openCalloutIcon,
  sortAscIcon,
  sortDescIcon,
  unsortedIcon,
} from "../../../defaults/icons";
import { GroupGridCloumn } from "../../ColumnGroups/GroupGridCloumn";

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 5,
};

const styles = mergeStyleSets({
  button: {
    width: 130,
  },
  callout: {
    width: 250,
    maxWidth: "90%",
    padding: "20px 24px",
  },
  title: {
    marginBottom: 12,
    fontWeight: FontWeights.semilight,
  },
  link: {
    display: "block",
    marginTop: 20,
  },
});

const stackItemStyles: IStackItemStyles = {
  root: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    width: "max-content",
  },
};
const sortIconStackItemStyles: IStackItemStyles = {
  root: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
  },
};

const actionIconStackItemStyles: IStackItemStyles = {
  root: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
  },
};

// icon style
const iconClass = mergeStyles({
  fontSize: "0.7rem",
  padding: "2px",
});

const HeaderCell: React.FunctionComponent<{
  column: DataGridColumn<any>;
}> = ({ column }) => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  const buttonId = useId("callout-button");
  const sortButtonId = useId("sort-button");

  const { columns$, currentPage$ } = useDataTableGrid();
  const columns = useObservableState(columns$, []);

  const handleSort = (column) => {

    if(column?.disableSort || column.disableAllColumnAction) return; 

    const newColumns = columns?.splice(0)?.map((col: DataGridColumn<any>) => {
      if (col?.fieldName == column?.fieldName) {
        col.isSorted = true;
        col.isSortedDescending = !col?.isSortedDescending;
      } else {
        col.isSorted = false;
      }
      return col;
    });
    currentPage$.next(1);
    columns$.next([...newColumns]);
  };

  return (
    <>
      <Stack
        enableScopedSelectors
        horizontal
        horizontalAlign="space-around"
        tokens={stackTokens}
        styles={{ root: { cursor: "pointer" } }}
      >
        { !(column?.disableAllColumnAction || column?.disableSort) ? (
          <Stack.Item styles={sortIconStackItemStyles}>
            <ActionButton
              id={sortButtonId}
              name={sortButtonId}
              ariaLabel={
                !column?.isSorted
                  ? "Sort Column"
                  : column?.isSortedDescending
                  ? "Sort Column Ascending"
                  : "Sort Column Descending"
              }
              role="button"
              iconProps={
                !column?.isSorted
                  ? unsortedIcon
                  : column?.isSortedDescending
                  ? sortAscIcon
                  : sortDescIcon
              }
              allowDisabledFocus
              onClick={() => handleSort(column)}
              styles={{
                root: {
                  padding: 0,
                  margin: 0,
                  height: "1rem",
                },
                flexContainer: {
                  flexDirection: "row-reverse",
                  color: "white",
                  FontWeight: 700,
                  fontSize: "0.7rem",
                },
                iconHovered: {
                  color: "white",
                  FontWeight: 700,
                },
                icon: {
                  color: "white",
                  FontWeight: 700,
                  fontSize: "0.7rem",
                },
              }}
            ></ActionButton>
          </Stack.Item>
        ) : (
          <></>
        )}
        <Stack.Item
          grow={2}
          styles={stackItemStyles}
          onClick={() => handleSort(column)}
        >
          <strong>{column.name}</strong>
        </Stack.Item>
        {!column?.disableAllColumnAction ? (
          <Stack.Item grow={1} styles={actionIconStackItemStyles}>
            <ActionButton
              id={buttonId}
              name={buttonId}
              ariaLabel={
                isCalloutVisible ? "Close Filter Action" : "Open Filter Action"
              }
              role="button"
              iconProps={isCalloutVisible ? ColseCalloutIcon : openCalloutIcon}
              allowDisabledFocus
              onClick={toggleIsCalloutVisible}
              styles={{
                flexContainer: {
                  flexDirection: "row-reverse",
                  color: "white",
                  FontWeight: 700,
                },
                iconHovered: {
                  color: "white",
                  FontWeight: 700,
                },
                icon: {
                  color: "white",
                  FontWeight: 700,
                },
              }}
            >
              {column?.isFiltered ? (
                <FontIcon
                  aria-label="Grid Sorted"
                  iconName="Filter"
                  className={iconClass}
                />
              ) : (
                <></>
              )}
              {column?.isGrouped ? (
                <FontIcon
                  aria-label="Grid Grouped"
                  iconName={
                    column?.isSortedDescending
                      ? "GroupedDescending"
                      : "GroupedAscending"
                  }
                  className={iconClass}
                />
              ) : (
                <></>
              )}
            </ActionButton>
            {isCalloutVisible && (
              <Callout
                className={styles.callout}
                role="dialog"
                gapSpace={0}
                target={`#${buttonId}`}
                onDismiss={toggleIsCalloutVisible}
                setInitialFocus
              >
                <Separator> Filters</Separator>
                <FilterContainer
                  column={column}
                  toggleCallout={toggleIsCalloutVisible}
                />
                <Separator> Groups</Separator>
                <GroupGridCloumn
                  column={column}
                  toggleCallout={toggleIsCalloutVisible}
                />
              </Callout>
            )}
          </Stack.Item>
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
};

export default HeaderCell;
