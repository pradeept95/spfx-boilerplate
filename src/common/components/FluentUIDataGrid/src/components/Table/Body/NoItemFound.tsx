/* eslint-disable */
import { FontIcon } from "@fluentui/react";
import * as React from "react";
import * as gridStyle from "./../../../styles/DataGrid.module.scss";
 
export const NoItemFound: React.FunctionComponent<{
  itemNotFound: boolean;
  message?: string;
}> = ({ itemNotFound, message }): JSX.Element => {
  return (
    <>
      {itemNotFound ? (
        <div className = {gridStyle.default.noItemFoundBody}
        >
          <FontIcon
            role={"img"}
            aria-label="No Items"
            iconName="SearchAndApps"
            className={gridStyle.default.emptyMsgIcon}
          />
          {message ?? "No Item(s) Found or Match to Display."}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
