import { IColumn } from "@fluentui/react";
import { BasicExpression } from "./FilterExpression";

export type FilterTypeExpressionProps = { 
    column: IColumn, 
    filterExpression : BasicExpression,
    setFilterExpression: React.Dispatch<React.SetStateAction<BasicExpression>>
}