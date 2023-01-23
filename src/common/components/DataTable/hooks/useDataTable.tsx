/* eslint-disable */
import { useContext } from "react";
import DataTableContext from "../context/DataTableContext";

export const useDataTable = () => {
  return useContext(DataTableContext);
};
