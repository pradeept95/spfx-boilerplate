/* eslint-disable */
import { Checkbox } from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { useDataTableGrid } from "../../hooks/useDataGrid";
import { IDataGridColumn } from "../../types/DataGridProps";

export const GroupGridCloumn: React.FunctionComponent<{
  column: IDataGridColumn<any>;
  toggleCallout: () => void;
}> = ({ column, toggleCallout }): JSX.Element => {
  const { columns$, currentPage$, groups$ } = useDataTableGrid();
  const columns = useObservableState(columns$, []);
  const groups = useObservableState(groups$, []);

  const handleColumnGrouped = (
    isGrouped: boolean,
    keepExistingGroup: boolean = true
  ) => {
    const lastMaxGroupOrder = Math.max.apply(Math, [
      ...columns.map((col) => col.groupOrderNumber ?? 1),
    ]);
    const newColumns = columns?.map((col: IDataGridColumn<any>) => {
      if (col?.fieldName == column?.fieldName) {
        col.isGrouped = isGrouped;
        col.groupOrderNumber = isNaN(lastMaxGroupOrder)
          ? 1
          : lastMaxGroupOrder + 1;
      } else {
        col.groupOrderNumber =
          keepExistingGroup && isGrouped ? col.groupOrderNumber : 0;
        col.isGrouped = keepExistingGroup && isGrouped ? col.isGrouped : false;
      }
      return col;
    }); 
    columns$.next([...newColumns]);
    currentPage$.next(1);
    toggleCallout();
  };

  return (
    <>
      <Checkbox
        name={`Groups by ${column.name}`}
        ariaLabel={`Group by ${column.name}`}
        label={`Group by ${column.name}`}
        checked={column.isGrouped}
        onChange={(_, checked) => handleColumnGrouped(checked, false)}
      />
      {groups?.length && !column.isGrouped ? (
        <Checkbox
          name={`Group by ${column.name}`}
          ariaLabel={`Group by ${column.name}`}
          label={`Add ${column.name} to Groups`}
          checked={column.isGrouped}
          onChange={(_, checked) => handleColumnGrouped(checked)}
          styles={{
            root: {
              marginTop: 5,
            },
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};
