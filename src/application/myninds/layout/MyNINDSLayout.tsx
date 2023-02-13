/* eslint-disable */
import { Stack } from "@fluentui/react";
import * as React from "react";
import { Outlet } from "react-router-dom";

export const MyNINDSLayout: React.FunctionComponent = () => {
  return (
    <main>
      <Stack
        enableScopedSelectors
        tokens={{ childrenGap: 5 }}
        styles={{
          root: {
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          },
        }}
      >
        <Outlet />
      </Stack>
    </main>
  );
};
