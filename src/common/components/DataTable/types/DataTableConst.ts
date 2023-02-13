import { IIconProps } from "@fluentui/react";

export const DEFAULT_NUMBER_OF_PAGE_BTN = 5;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100000;

// icons
export const openFilterIcon: IIconProps = { iconName: "Filter" };
export const clearFilterIcon: IIconProps = { iconName: "ClearFilter" };

// expand and collapse icon
export const openCalloutIcon: IIconProps = { iconName: "ChevronDown" };
export const ColseCalloutIcon: IIconProps = { iconName: "ChevronUp" };

// paginations
export const moveToFirstIcon: IIconProps = { iconName: "DoubleChevronLeft" };
export const moveToPreviousIcon: IIconProps = { iconName: "ChevronLeft" };
export const moveToNextIcon: IIconProps = { iconName: "ChevronRight" };
export const moveToLastIcon: IIconProps = { iconName: "DoubleChevronRight" };
