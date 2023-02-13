/* eslint-disable */
import {
  DefaultButton,
  Dropdown,
  IconButton, 
  IStackStyles,
  IStackTokens,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import * as React from "react";
import { useDataTable } from "../hooks/useDataTable";
import { useGridService } from "../services/GridService";
import * as gridStyle from "../styles/DataGrid.module.scss";
import { 
  DEFAULT_PAGE_SIZE, moveToFirstIcon, moveToLastIcon, moveToNextIcon, moveToPreviousIcon,
} from "../types/DataTableConst";
import { pageSizeOptions } from "../types/PageSizeOptions";
import { getPageNumbers } from "../utils/GridHelpers";
  
const stackTokens: IStackTokens = { childrenGap: 10 };
const stackStyles: IStackStyles = { root: { marginTop: 25 } }; 

export const Pagination: React.FunctionComponent<{}> = () => {
  const [pageOptions, setPageOptions] = React.useState<number[]>([]);
  // const { totalCount, pageSize, currentPage } = props;

  const { totalNumberOfPages, pageSize, currentPage } = useDataTable();
  const { onPageChange, onPageSizeChange } = useGridService();

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
            Showing Page {currentPage} of{" "}
            {totalNumberOfPages == 0 ? 1 : totalNumberOfPages}
          </div>
        </Stack.Item>
        <Stack.Item>
          <Stack horizontal horizontalAlign="center">
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
                    type={"button"}
                    ariaLabel={`Show Page ${page}`}
                    // onClick={() => notifyPageChanged(page)}
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
              disabled={currentPage >= totalNumberOfPages}
            />
            <IconButton
              iconProps={moveToLastIcon}
              aria-label="Last"
              onClick={handleGoToLast}
              className={gridStyle.default.dataGridPageIconBtn}
              disabled={currentPage >= totalNumberOfPages}
            />
          </Stack>
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
