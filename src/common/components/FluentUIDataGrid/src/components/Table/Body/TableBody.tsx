/* eslint-disable */ 
import * as React from "react";
import { TableRow } from "./Rows/TableRow";
 

export const TableBody: React.FunctionComponent<{
  items: any[] 
}> = ({ items }): JSX.Element => {
  return (
    <>
      <tbody>
        {items?.map((item) => <TableRow item={item} />)}
      </tbody>
    </>
  );
};
