/* eslint-disable */ 
import { IGroup } from "@fluentui/react";
import * as React from "react"; 
import { TableRowGrouped } from "./Rows/TableRowGrouped";

export const TableBodyGrouped: React.FunctionComponent<{
  items: any[];
  groups: IGroup[];
  isLoading: boolean;
}> = ({ items, groups, isLoading }): JSX.Element => {
   
  return (
    <>
      <tbody>
        {!isLoading &&
          groups.map((group) => (
            <>
              <TableRowGrouped items={items} group={group} />
            </>
          ))}
      </tbody>
    </>
  );
};
