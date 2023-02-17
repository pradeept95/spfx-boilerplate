/* eslint-disable */
import { useContext } from "react"; 
import DataTableContext from "../context/GridContext";

export const useDataTableGrid = () => {
  return useContext(DataTableContext);
};