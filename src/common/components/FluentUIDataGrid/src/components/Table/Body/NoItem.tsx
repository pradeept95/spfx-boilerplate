/* eslint-disable */
import { FontIcon } from "@fluentui/react";
import * as React from "react";
import * as gridStyle from "./../../../styles/DataGrid.module.scss";

export const NoItem: React.FunctionComponent<{
  noItems: boolean;
  message?: string;
}> = ({ noItems, message }): JSX.Element => {
  return (
    <>
      {noItems ? (
        <div className ={gridStyle.default.noItemBody}
        >
          <FontIcon
            role={"img"}
            aria-label="No Items"
            iconName="WebComponents"
            className={gridStyle.default.emptyMsgIcon}
          />
          {message ?? "No Item(s) to Display"}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
