/* eslint-disable */
import * as React from "react";
import {
  Card,
  CardHeader,
  CardPreview,
  makeStyles,
  shorthands,
  tokens,
  Text,
  Caption1Strong,
} from "@fluentui/react-components";

const useAccessDeniedStyles = makeStyles({
  card: {
    width: "100%",
    maxWidth: "100%",
    height: "fit-content",
  },

  title: {
    ...shorthands.margin(0, 0, "12px"),
  },

  horizontalCardImage: {
    width: "100px",
    height: "100px",
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },
  text: {
    ...shorthands.margin(0),
  },
});

export const AccessDenied: React.FunctionComponent<{ message?: string }> = ({
  message,
}) => {
  const styles = useAccessDeniedStyles();
  const noAccessMessage = React.useMemo(() => {
    return message
      ? message
      : "You don't have enough permission to access this resources. This page/resources is not shared with you.";
  }, [message]);
  return (
    <div>
      <Card className={styles.card} orientation="horizontal">
        <CardPreview className={styles.horizontalCardImage}>
          <img
            className={styles.horizontalCardImage}
            src={
              "data:image/png;base64,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"
            }
            alt="No Access"
          />
        </CardPreview>

        <CardHeader
          header={<Text weight="semibold">Access Denied</Text>}
          description={
            <Caption1Strong className={styles.caption}>
              {noAccessMessage}
            </Caption1Strong>
          }
        />
      </Card>
    </div>
  );
};
