/* eslint-disable */
import * as React from "react"; 
import { useTrackPageView } from "@common/hooks/useTrackPageView";
import { AllFeatures } from "../components/FeatureComp/Features";
// import { useLoading } from "@common/features/loading";

const AllFeatureExamples: React.FunctionComponent<{}> = (props) => {
  useTrackPageView({
    name: "Form Example",
  });

  // const { showLoader } = useLoading();

  // React.useEffect(() => {
  //   showLoader && showLoader("Loading...");
  // }, []);

  return (
    <>
      <section>
        <h3>Common Built in Features</h3> <hr />
        <AllFeatures  />
      </section>
    </>
  );
};

export default AllFeatureExamples;
