/* eslint-disable */
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { HomePage } from "./pages/home";
import ThemeDesignerPage from "./pages/ThemeDesigner";
import { useListSubscription } from "@common/list-subscriptions";
import useChoiceField from "@common/hooks/useChoiceField";

const LayoutExampleApp: React.FunctionComponent<{}> = (props) => {
  const onListUpdate = React.useCallback(() => {
    console.log("list updated");
    alert("list updated");
  }, []);

  useListSubscription({
    listIdOrListName: "b34b1740-0f06-4882-834a-cc1b43c59340",
    onChange: onListUpdate,
  });

  useListSubscription({
    listIdOrListName: "EmailTemplates",
  });

  const choices = useChoiceField("EmailTemplates", "EmailType");

  React.useEffect(() => {
    console.log("getChoiceFieldOptions", choices);
  }, [choices]);

  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="theme" element={<ThemeDesignerPage />} />
          </Route>
        </Routes>
      </section>
    </>
  );
};

export default LayoutExampleApp;
