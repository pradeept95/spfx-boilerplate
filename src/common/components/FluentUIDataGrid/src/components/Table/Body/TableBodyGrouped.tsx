/* eslint-disable */
import { IGroup } from "@fluentui/react";
import * as React from "react";
import { TableRowGrouped } from "./Rows/TableRowGrouped";

export const TableBodyGrouped: React.FunctionComponent<{
  items: any[];
  groups: IGroup[]; 
}> = ({ items, groups }): JSX.Element => {

  return (
    <>
      <tbody>
        {groups.map((group) => (
          <>
            <TableRowGrouped items={items} group={group} />
          </>
        ))}
      </tbody>
    </>
  );
};
