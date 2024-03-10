/* eslint-disable */
import { useConfirm } from "@prt-ts/fluent-common-features";
import * as React from "react";
import { unstable_useBlocker as useBlocker } from "react-router-dom";

const confirmationMessage =
  "You have unsaved changes. Are you sure you want to leave this page?";

export function usePrompt({
  when,
  message = confirmationMessage,
}: {
  when: boolean;
  message?: JSX.Element | string;
}) {
  const blocker = useBlocker(when);
  const { confirm } = useConfirm();

  React.useEffect(() => {
    if (blocker.state === "blocked") {
      confirm({
        title: "Are you sure?",
        message: message as JSX.Element,
        onConfirm: async () => {
          await blocker.proceed();
        },

        onCancel: async () => {
          await blocker.reset();
        },
        confirmButtonProps: {
          children: "Leave",
          icon: null,
        },
        cancelButtonProps: {
          children: "Cancel",
          icon: null,
        },
      });
    }
  }, [blocker.state, message]);

  React.useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker.state, when]);
}
