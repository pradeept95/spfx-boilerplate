/* eslint-disable */
import * as React from "react";
import { useLoading } from "../../common/hooks/useLoading";

const LoadingExample: React.FunctionComponent<{}> = (props) => {

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
      </section>
    </>
  );
};

export default LoadingExample;
