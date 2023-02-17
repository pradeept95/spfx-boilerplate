/* eslint-disable */
import { Spinner } from "@fluentui/react";
import * as React from "react";
export const LoadingItems: React.FunctionComponent<{loading : boolean}> = ({loading}): JSX.Element => {
  return (
    <>
      {loading ? (
        <div
          style={{
            display: "block",
            minHeight: "30vh",
            marginTop: "15vh",
          }}
        >
          <Spinner label="Loading, Please Wait..." />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
