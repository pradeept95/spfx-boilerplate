import { IDataGridColumn } from "./DataTableProps";
import { LogicalExpression } from "./FilterExpression";

export type FilterTypeExpressionProps = {
  column: IDataGridColumn;
  setFilterExpression: (colFilterExpression: LogicalExpression) => void;
};