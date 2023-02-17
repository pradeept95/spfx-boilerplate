/* eslint-disable */
import { IComboBoxOption } from "@fluentui/react";
import { DEFAULT_MAX_PAGE_SIZE } from "./constants";

export const DEFAULT_PAGE_OPTIONS : IComboBoxOption[]= [
    {
        key : 10,
        text : '10'
    },
    {
        key : 20,
        text : '20'
    },
    {
        key : 50,
        text : '50'
    },
    {
        key : 100,
        text : '100'
    },
    {
        key : DEFAULT_MAX_PAGE_SIZE,
        text : 'All'
    },
]