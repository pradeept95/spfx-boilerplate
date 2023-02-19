/* eslint-disable */
import { Spinner } from "@fluentui/react";
import * as React from "react";
import * as gridStyle from "./../../../styles/DataGrid.module.scss";

export const LoadingItems: React.FunctionComponent<{loading : boolean}> = ({loading}): JSX.Element => {
  return (
    <>
      {loading ? (
        <div className={gridStyle.default.loadingBody} >
          <Spinner label="Loading, Please Wait..." />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
