// /* eslint-disable */
// import { useConfirm } from "@prt-ts/fluent-common-features";
// import * as React from "react";
// import { unstable_useBlocker as useBlocker } from "react-router-dom";

// export function usePrompt({
//   when,
//   message = <>Are you sure you want to leave? You may have unsaved changes!</>,
// }: {
//   when: boolean;
//   message?: JSX.Element;
// }) {
//   const blocker = useBlocker(when);
//   const { confirm } = useConfirm();

//   console.log("usePrompt", when, blocker);

//   React.useEffect(() => {
//     if (blocker.state === "blocked") {
//       confirm({
//         title: "Are you sure?",
//         message: message,
//         confirmButtonLabel: "Yes",
//         onConfirm: () => {
//           blocker.proceed();
//         },
//         cancelButtonLabel: "No",
//         onCancel: () => {
//           blocker.reset();
//         },
//       });
//     }
//   }, [blocker.state, message]);

//   React.useEffect(() => {
//     if (blocker.state === "blocked" && !when) {
//       blocker.reset();
//     }
//   }, [blocker.state, when]);
// }
