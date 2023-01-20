/* eslint-disable */
import * as React from "react";

export type PaginationComponentProps = {
    totalCount: number,
    pageSize: number,
    currentPage: number,
    onPageChange: (currentPage: number, pageSize: number) => void
}

const PaginationComponent: React.FunctionComponent<PaginationComponentProps> = (props) => {

    
    const { totalCount, pageSize, currentPage, onPageChange } = props;

    const handleGoToFirst = () => {
        // go to fist page

        if (currentPage == 1) return; 
        notifyPageChanged(1);
    }

    const handleGoToLast = () => {
        // go to last page 
        const lastPage = getLastPage();
        if (currentPage == lastPage) return;
 
        notifyPageChanged(lastPage);
    }

    const handleGoToPreviousPage = () => {
        // go to previous page 
        if (currentPage <= 1) { 
            // notifyPageChanged(1);
            return;
        }

        // if has previous page -- allow to go to previous page
        const nextPage = currentPage - 1; 
        notifyPageChanged(nextPage);
    }

    const handleGoToNextPage = () => {
        // go to next page 
        const lastPage = getLastPage();

        if (currentPage >= lastPage) { 
            // notifyPageChanged(lastPage);
            return;
        }

        // if has previous page -- allow to go to previous page
        const nextPage = currentPage + 1; 
        notifyPageChanged(nextPage);
    }

    const getLastPage = (): number => {
        const lastPage = Math.floor(totalCount / pageSize) + ((totalCount % pageSize > 0) ? 1 : 0);
        return lastPage;
    }

    const notifyPageChanged = (nextPage: number) => {
        onPageChange(nextPage, pageSize);
    }

    return (
        <>
            <button className="signature-action-btn" onClick={handleGoToFirst}>First</button>
            <button className="signature-action-btn" onClick={handleGoToPreviousPage}>Previous</button>
            {currentPage}
            <button className="signature-action-btn" onClick={handleGoToNextPage}>Next</button>
            <button className="signature-action-btn" onClick={handleGoToLast}>Last</button>
        </>
    );
};

export default PaginationComponent;