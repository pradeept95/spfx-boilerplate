import { IDropdownOption } from "@fluentui/react";

export type FilterValueType = string | number | Date | string[] | number[] | Date[]
export type FilterOperationType =
  | "greater_than"
  | "less_than"
  | "equal"
  | "starts_with"
  | "contains"
  | "includes"
  | "date_equal"
  | "date_greater_than"
  | "date_less_than";

export type BasicExpression = {
    key: string;
    operation:FilterOperationType
    value: FilterValueType
  };
  
export type LogicalExpression = {
    condition: "and" | "or";
    expressions: Expression[];
  };

export type Expression = BasicExpression | LogicalExpression;

export const defaultAndExpression: LogicalExpression = {
    condition: "and",
    expressions: [
      // {
      //   key: "age",
      //   operation: "greater_than",
      //   value: 40,
      // },
      // {
      //   condition: "or",
      //   expressions: [
      //     {
      //       key: "name",
      //       operation: "starts_with",
      //       value: "A",
      //     },
      //     {
      //       key: "name",
      //       operation: "starts_with",
      //       value: "B",
      //     },
      //   ],
      // },
    ],
};
  
export const FilterTypeOptions : IDropdownOption<string>[] = [
  {
    key : "contains",
    text : "Contains"
  },
  {
    key : "equal",
    text : "Equal"
  },
  {
    key : "starts_with",
    text : "Starts With"
  },
  {
    key : "greater_than",
    text : "Greater than"
  },
  {
    key : "less_than",
    text : "Less than"
  } 
]

export const NumberFilterTypeOptions: IDropdownOption<string>[] = [ 
  {
    key: "equal",
    text: "Equal",
  }, 
  {
    key: "greater_than",
    text: "Greater than",
  },
  {
    key: "less_than",
    text: "Less than",
  },
];

export const DateFilterTypeOptions: IDropdownOption<string>[] = [
  {
    key: "date_equal",
    text: "Equal",
  },
  {
    key: "date_greater_than",
    text: "Greater than",
  },
  {
    key: "date_less_than",
    text: "Less than",
  },
];