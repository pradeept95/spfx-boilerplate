/* eslint-disable */
import { Callout, FontWeights, IconButton, IIconProps, mergeStyleSets } from "@fluentui/react";
import { useBoolean, useId } from "@fluentui/react-hooks";
import * as React from "react";

const styles = mergeStyleSets({
  button: {
    width: 130,
  },
  callout: {
    width: 320,
    maxWidth: "90%",
    padding: "20px 24px",
  },
  title: {
    marginBottom: 12,
    fontWeight: FontWeights.semilight,
  },
  link: {
    display: "block",
    marginTop: 20,
  },
});

const openFilterIcon: IIconProps = { iconName: "Filter" };
// const clearFilterIcon: IIconProps = { iconName: "ClearFilter" };

const ColumnFilterComponent: React.FunctionComponent<{}> = (props) => {

  const [isFilterOpen, { toggle: toggleFilterColumn }] = useBoolean(false);

  const buttonId = useId("filter-button");

  // const handleOpenFilter = (e: any) => {
  //   e.preventDefault();
  //   console.log(e);
  //   alert("Filter Clicked");
  // };

  return (
    <>
      <IconButton
        id={buttonId}
        iconProps={openFilterIcon}
        aria-label="Click to Open Filter"
        onClick={toggleFilterColumn}
      />
      {isFilterOpen && (
        <Callout
          className={styles.callout}
          ariaLabel="Select Filter"
          role="dialog"
          gapSpace={0}
          target={`#${buttonId}`}
          onDismiss={toggleFilterColumn}
          setInitialFocus
        ></Callout>
      )}
    </>
  );
};

export default ColumnFilterComponent;
