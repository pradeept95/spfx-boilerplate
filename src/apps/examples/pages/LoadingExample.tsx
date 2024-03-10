/* eslint-disable */
import { useTrackPageView } from "@common/hooks/useTrackPageView";
import { useLoading } from "@prt-ts/fluent-common-features";
import * as React from "react";  

const LoadingExample: React.FunctionComponent<{}> = (props) => {

  useTrackPageView({
    name: "Loading Example",
  });

  const { showLoader, hideLoader } = useLoading();

  function loading() {
    showLoader("Hey, I am loading for 3 sec...");
    setTimeout(() => {
      hideLoader();
    }, 3000);
  }

  return (
    <>
      <section>
        <h3>Lodaing Example</h3> <hr />
        <button onClick={loading}>Loading !</button>
        <h3>Loader Example Code</h3> <hr />
        <pre lang="js">
          <code lang="jsx">
            {`
    // Path: src/apps/examples/pages/LoadingExample.tsx
    // import useLoading from "@prt-ts/fluent-common-features";
    import { useLoading } from "@prt-ts/fluent-common-features";

    // use useLoading hook to get showLoader and hideLoader functions
    const { showLoader, hideLoader } = useLoading();

    // call showLoader function to show loader
    function loading() {
      showLoader("Hey, I am loading for 3 sec...");
      setTimeout(() => {
        hideLoader();
      }, 3000);
    }

    return (
      <>
        <section>
          <h3>Lodaing Example</h3> <hr />
          <button onClick={loading}>Loading !</button>
        </section>
      </>
    );
  `}
          </code>
        </pre>
      </section>
    </>
  );
};

export default LoadingExample;
