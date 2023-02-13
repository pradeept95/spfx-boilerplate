/* eslint-disable */
import {
  ActionButton,
  Callout,
  DirectionalHint,
  IDetailsColumnProps,
  IRenderFunction,
  IStackTokens,
  mergeStyleSets,
  Stack,
} from "@fluentui/react";
import { useBoolean, useId } from "@fluentui/react-hooks";
import * as React from "react"; 
import { ColseCalloutIcon, openCalloutIcon } from "../types/DataTableConst";
import { IDataGridColumn } from "../types/DataTableProps";
import ColumnActionCallout from "./ColumnActionCallout";

const styles = mergeStyleSets({
  callout: {
    width: 320,
    maxWidth: "90%",
    padding: "20px 24px",
  },
});

const stackTokens: IStackTokens = { childrenGap: 5 };

const GridColumnHeader: React.FunctionComponent<{
  columnProp: IDetailsColumnProps;
  defaultRender?: IRenderFunction<IDetailsColumnProps>;
}> = ({ columnProp, defaultRender }) => {

  const buttonId = useId("filter-button");
  const [isCalloutOpen, { toggle: toggleCallout }] = useBoolean(false);

  const columnDetails = columnProp?.column as IDataGridColumn;
  
  const disableCallout =
    columnDetails?.disableAllColumnActions !== undefined &&
    columnDetails?.disableAllColumnActions; 

  return (
    <>
      {disableCallout && (
        <Stack
          enableScopedSelectors
          horizontal
          horizontalAlign="space-around"
          tokens={stackTokens}
        >
          {(defaultRender && defaultRender(columnProp)) || <></>}
        </Stack>
      )}
      {!disableCallout && (
        <Stack
          enableScopedSelectors
          horizontal
          horizontalAlign="space-around"
          tokens={stackTokens}
        >
          {!columnProp?.column?.isIconOnly && (
            <ActionButton
              id={buttonId}
              iconProps={isCalloutOpen ? ColseCalloutIcon : openCalloutIcon}
              allowDisabledFocus
              onClick={toggleCallout}
              styles={{
                flexContainer: {
                  flexDirection: "row-reverse",
                  fontWeight: 600,
                },
              }}
            >
              {(defaultRender && defaultRender(columnProp)) || <></>}
            </ActionButton>
          )}
          {isCalloutOpen && (
            <Callout
              className={styles.callout}
              ariaLabel="Select Filter"
              role="dialog"
              gapSpace={0}
              target={`#${buttonId}`}
              onDismiss={toggleCallout}
              directionalHint={DirectionalHint.bottomCenter}
              setInitialFocus
            >
              <ColumnActionCallout 
                columnProp={columnProp}
                toggleCallout={toggleCallout}
              />
            </Callout>
          )}
        </Stack>
      )}
    </>
  );
};

export default GridColumnHeader;
