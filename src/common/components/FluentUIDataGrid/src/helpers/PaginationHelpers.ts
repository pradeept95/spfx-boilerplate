/* eslint-disable */
import { DEFAULT_NUMBER_OF_PAGE_BTN, DEFAULT_PAGE_SIZE } from "../defaults/constants";

const range = (from: number, to: number, step: number = 1) =>
    [...Array(Math.floor((to - from) / step) + 1)]?.map((_, i) => from + i * step);

export const getPageSelectionOptions = (
    currentPage: number,
    totalNumberOfPages: number 
): number[] => {
    let start = currentPage - Math.floor(DEFAULT_NUMBER_OF_PAGE_BTN / 2);
    let end = currentPage + Math.floor(DEFAULT_NUMBER_OF_PAGE_BTN / 2);

    if (start < 1) {
        start = 1;
        end = totalNumberOfPages > DEFAULT_NUMBER_OF_PAGE_BTN ? DEFAULT_NUMBER_OF_PAGE_BTN
            : totalNumberOfPages;
    } else if (end > totalNumberOfPages) {
        const possibleStart =
        totalNumberOfPages - DEFAULT_NUMBER_OF_PAGE_BTN + 1;
        start = possibleStart < 1 ? 1 : possibleStart;
        end = totalNumberOfPages;
    } 
    const currentPageOptions: number[] = end - start >= 0 ? range(start, end) : [];
    return currentPageOptions?.length ? [...currentPageOptions] : [1];
};

export function getPagedItems(
  filterSorteditems: any[],
  pageSize: number,
  currentPage: number
): any[] {
  const calculatedPageSize = pageSize ?? DEFAULT_PAGE_SIZE;
  const firstIndex = (currentPage - 1) * pageSize;
  const lastIndex =
    calculatedPageSize > filterSorteditems?.length
      ? filterSorteditems.length
      : calculatedPageSize;
  const pagedItems = filterSorteditems?.splice(firstIndex, lastIndex);
  console.log("Paged Completed", pagedItems);
  return pagedItems;
}
