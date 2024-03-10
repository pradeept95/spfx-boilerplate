/* eslint-disable */
import * as React from "react"; 
import { Link } from "@fluentui/react-components"; 
import { useAlert, useConfirm } from "@prt-ts/fluent-common-features";
import { useTrackPageView } from "@common/hooks/useTrackPageView";

const NotifyExample: React.FunctionComponent<{}> = (props) => {

  useTrackPageView({
    name: "Notify Example",
  })

  const { success, error, info, warning, update, progress } = useAlert();

  const longProcess = () => {
    const progressToastId = progress({
      title: "Action in Progress",
      body: "Please Wait...",
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        success(
          {
            title: "Success",
            body: "This is a toast body",
            footer: (
              <>
                <Link>Action</Link>
                <Link>Action</Link>
              </>
            ),
          },
          {
            toastId: progressToastId,
          }
        );
        resolve("Success!");
      }, 3000);
    });
  };

  const notify = () => {
    success({
      title: "Success",
      body: "This is a toast body",
      bodySubtitle: "This is a toast body subtitle",
      footer: (
        <>
          <Link>Action</Link>
          <Link>Action</Link>
        </>
      ),
    });
    info({
      title: "Info",
      body: "This is a toast body",
      footer: (
        <>
          <Link>Action</Link>
          <Link>Action</Link>
        </>
      ),
    });
    warning({
      title: "Warning",
      body: "This is a toast body",
      footer: (
        <>
          <Link>Action</Link>
          <Link>Action</Link>
        </>
      ),
    });
    error({
      title: "Error",
      body: "This is a toast body",
      footer: (
        <>
          <Link>Action</Link>
          <Link>Action</Link>
        </>
      ),
    });
  };

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
        <h3>Notify/Alert Example</h3> <hr />
        <button onClick={notify}>Alert All!</button>
        <button
          onClick={() =>
            success({
              title: "Success",
              body: "This is a toast body",
              footer: (
                <>
                  <Link>Action</Link>
                  <Link>Action</Link>
                </>
              ),
            })
          }
        >
          Alert Success!
        </button>
        <button onClick={longProcess}>Update With Promise</button>
        <button
          onClick={() =>
            error({
              title: "Error",
              body: "This is a toast body",
              footer: (
                <>
                  <Link>Action</Link>
                  <Link>Action</Link>
                </>
              ),
            })
          }
        >
          Alert Error for Update!
        </button>
        <button
          onClick={() =>
            update({
              title: "Success",
              body: "Updated Content",
              footer: (
                <>
                  <Link>Action</Link>
                  <Link>Action</Link>
                </>
              ),
            })
          }
        >
          Update Alert
        </button>
        <button onClick={() => {
          confirm({
            title: "Confirm Example",
            message: <div>Are you sure you want to delete this item?</div>,
            onConfirm,
            onCancel,
          });
        }}>Confirm</button>
      </section>
    </>
  );
};

export default NotifyExample;
