import { IDropdownOption } from "@fluentui/react";
import { MAX_PAGE_SIZE } from "./DataTableConst";

export const pageSizeOptions: IDropdownOption[] = [
  { key: 10, text: "10" },
  { key: 20, text: "20" },
  { key: 50, text: "50" },
  { key: 100, text: "100" },
  { key: 200, text: "200" },
  { key: MAX_PAGE_SIZE, text: "All" },
];
