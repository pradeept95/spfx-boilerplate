/* eslint-disable */
import { FontIcon, mergeStyles } from "@fluentui/react";
import * as React from "react";

const emptyMsgIconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: "0 25px",
  padding: 20,
});

export const NoItemFound: React.FunctionComponent<{
  itemNotFound: boolean;
  message?: string;
}> = ({ itemNotFound, message }): JSX.Element => {
  return (
    <>
      {itemNotFound ? (
        <div
          style={{
            display: "block",
            minHeight: "30vh",
            marginTop: "15vh",
          }}
        >
          <FontIcon
            role={"img"}
            aria-label="No Items"
            iconName="SearchAndApps"
            className={emptyMsgIconClass}
          />
          {message ?? "No Item(s) Found or Match to Display."}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
