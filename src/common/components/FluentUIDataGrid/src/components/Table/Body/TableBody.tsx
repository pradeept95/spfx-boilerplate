/* eslint-disable */ 
import * as React from "react";
import { TableRow } from "./Rows/TableRow";
 

export const TableBody: React.FunctionComponent<{
  items: any[];
  isLoading: boolean;
}> = ({ items, isLoading }): JSX.Element => {
  return (
    <>
      <tbody>
        {!isLoading &&
          items?.map((item) => <TableRow item={item} />)}
      </tbody>
    </>
  );
};
