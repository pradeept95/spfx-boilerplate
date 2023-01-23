/* eslint-disable */
import {
  DefaultButton,
  Dropdown, 
  IconButton,
  IDropdownOption,
  IIconProps,
  IStackStyles,
  IStackTokens,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import * as React from "react";
import { useDataTable } from "..//hooks/useDataTable";
import { usePagination } from "../services/PaginationService";
import * as gridStyle from '../styles/DataGrid.module.scss'
import { DEFAULT_NUMBER_OF_PAGE_BTN, DEFAULT_PAGE_SIZE } from "../types/DataTableConst";
 
const range = (from: number, to: number, step: number = 1) =>
  [...Array(Math.floor((to - from) / step) + 1)]?.map((_, i) => from + i * step);

const getPageNumbers = (
  currentPage: number,
  totalPageCount: number
): number[] => {
  let start = currentPage - Math.floor(DEFAULT_NUMBER_OF_PAGE_BTN / 2);
  let end = currentPage + Math.floor(DEFAULT_NUMBER_OF_PAGE_BTN / 2);

  if (start < 1) {
    start = 1;
    end =
      totalPageCount > DEFAULT_NUMBER_OF_PAGE_BTN
        ? DEFAULT_NUMBER_OF_PAGE_BTN
        : totalPageCount;
  } else if (end > totalPageCount) {
    const possibleStart =
      totalPageCount - DEFAULT_NUMBER_OF_PAGE_BTN + 1;
    start = possibleStart < 1 ? 1 : possibleStart;
    end = totalPageCount;
  }

  const currentPageOptions: number[] = end - start >=0 ? range(start, end) : [];
  return currentPageOptions;
};

const pageSizeOptions: IDropdownOption[] = [
  { key: 10, text: "10" },
  { key: 20, text: "20" },
  { key: 50, text: "50" },
  { key: 100, text: "100" },
  { key: 200, text: "200" },
];

const stackTokens: IStackTokens = { childrenGap: 10 };
const stackStyles: IStackStyles = { root: { marginTop: 25 } };

const moveToFirstIcon: IIconProps = { iconName: "DoubleChevronLeft" };
const moveToPreviousIcon: IIconProps = { iconName: "ChevronLeft" };
const moveToNextIcon: IIconProps = { iconName: "ChevronRight" };
const moveToLastIcon: IIconProps = { iconName: "DoubleChevronRight" };

const PaginationComponent: React.FunctionComponent<{}> = () => {
  const [pageOptions, setPageOptions] = React.useState<number[]>([]);
  // const { totalCount, pageSize, currentPage } = props;

 const { totalNumberOfPages, pageSize, currentPage }= useDataTable();

  const { onPageChange, onPageSizeChange} = usePagination();

  React.useEffect(() => {
    const totalPageCount = totalNumberOfPages;
    const currentPageOptions = getPageNumbers(currentPage, totalPageCount);
    setPageOptions(currentPageOptions);
  }, []);

  React.useEffect(() => {
    const totalPageCount = totalNumberOfPages;
    const currentPageOptions = getPageNumbers(currentPage, totalPageCount);
    setPageOptions(currentPageOptions);
  }, [currentPage, totalNumberOfPages, pageSize]);

  const handleGoToFirst = () => {
    // go to fist page

    if (currentPage == 1) return;
    notifyPageChanged(1);
  };

  const handleGoToLast = () => {
    // go to last page
    const lastPage = totalNumberOfPages;
    if (currentPage == lastPage) return;

    notifyPageChanged(lastPage);
  };

  const handleGoToPreviousPage = () => {
    // go to previous page
    if (currentPage <= 1) {
      // notifyPageChanged(1);
      return;
    }

    // if has previous page -- allow to go to previous page
    const nextPage = currentPage - 1;
    notifyPageChanged(nextPage);
  };

  const handleGoToNextPage = () => {
    // go to next page
    const lastPage = totalNumberOfPages;

    if (currentPage >= lastPage) {
      // notifyPageChanged(lastPage);
      return;
    }

    // if has previous page -- allow to go to previous page
    const nextPage = currentPage + 1;
    notifyPageChanged(nextPage);
  };

  const handlePageSizeChange = (_: any, option: any) => {
    console.log(option.key);
    // set next page to initial page
    onPageSizeChange(+option?.key);
  };

  // const getLastPage = (): number => {
  //   const lastPage =
  //     Math.floor(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0);
  //   return lastPage;
  // };

  const notifyPageChanged = (nextPage: number) => {
    onPageChange(nextPage);
  };

  return (
    <>
      <Stack
        enableScopedSelectors
        horizontal
        horizontalAlign="center"
        tokens={stackTokens}
        styles={stackStyles}
      >
        <Stack.Item>
          <div style={{ paddingTop: "5px" }}>
            Showing Page {currentPage} of {totalNumberOfPages}
          </div>
        </Stack.Item>
        <Stack.Item>
          <IconButton
            iconProps={moveToFirstIcon}
            aria-label="First"
            onClick={handleGoToFirst}
            className={gridStyle.default.dataGridPageIconBtn}
            disabled={currentPage === 1}
          />
          <IconButton
            iconProps={moveToPreviousIcon}
            aria-label="Previous"
            onClick={handleGoToPreviousPage}
            className={gridStyle.default.dataGridPageIconBtn}
            disabled={currentPage === 1}
          />
          {pageOptions.map((page) => {
            const button =
              page === currentPage ? (
                <PrimaryButton
                  text={`${page}`}
                  ariaLabel={`Show Page ${page}`}
                  onClick={() => notifyPageChanged(page)}
                  allowDisabledFocus
                  className={gridStyle.default.dataGridPageActionBtn}
                />
              ) : (
                <DefaultButton
                  text={`${page}`}
                  ariaLabel={`Show Page ${page}`}
                  onClick={() => notifyPageChanged(page)}
                  allowDisabledFocus
                  className={gridStyle.default.dataGridPageActionBtn}
                />
              );
            return button;
          })}
          <IconButton
            iconProps={moveToNextIcon}
            aria-label="Next"
            onClick={handleGoToNextPage}
            className={gridStyle.default.dataGridPageIconBtn}
            disabled={currentPage === totalNumberOfPages}
          />
          <IconButton
            iconProps={moveToLastIcon}
            aria-label="Last"
            onClick={handleGoToLast}
            className={gridStyle.default.dataGridPageIconBtn}
            disabled={currentPage === totalNumberOfPages}
          />
        </Stack.Item>
        <Stack.Item>
          <Dropdown
            ariaLabel="Select Page Size"
            selectedKey={pageSize ?? DEFAULT_PAGE_SIZE}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={handlePageSizeChange}
            options={pageSizeOptions}
          />
        </Stack.Item>
      </Stack>
    </>
  );
};

export default PaginationComponent;
