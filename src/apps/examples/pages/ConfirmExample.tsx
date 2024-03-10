/* eslint-disable */
import * as React from "react";
import { useConfirm } from "@prt-ts/fluent-common-features";
import { useTrackPageView } from "@common/hooks/useTrackPageView";
import { Button, Divider } from "@fluentui/react-components";

const ConfirmExample: React.FunctionComponent<{}> = (props) => {
  useTrackPageView({
    name: "Confirm Example",
  });

  const { confirm } = useConfirm();
  const onConfirm = () => {
    console.log("Confirmed!");
  };

  const onCancel = () => {
    console.log("Cancelled!");
  };

  return (
    <>
      <section>
        <h3>Confirm Dialog Example</h3>
        <Divider />

        <Button
          onClick={() =>
            confirm({
              title: "Default Confirm",
              message: <>Default Confirm with default button props</>,
              onConfirm: onConfirm,
              onCancel: onCancel,
            })
          }
        >
          Confirm
        </Button>

        <Button
          onClick={() =>
            confirm({
              title: "Are you sure you want to delete this item?",
              message: (
                <>
                  Once you delete, you will not be able to revert this action.
                </>
              ),
              onConfirm: onConfirm,
              onCancel: onCancel,
              confirmButtonProps: {
                children: "Delete",
                icon: null,
                style: {
                  backgroundColor: "red",
                  color: "white",
                },
              },
              cancelButtonProps: {
                children: "Cancel",
                icon: null,
              },
            })
          }
        >
          Confirm Delete
        </Button>
      </section>
    </>
  );
};

export default ConfirmExample;
