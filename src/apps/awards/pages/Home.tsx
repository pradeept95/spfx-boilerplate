/* eslint-disable */
import {
  Caption1,
  Text,
  Card,
  CardHeader,
  shorthands,
  makeStyles,
  tokens,
  LargeTitle,
  Button,
} from "@fluentui/react-components";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FunctionComponent<{}> = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LargeTitle>Welcome to NINDS Director's Award Portal</LargeTitle>

      <Button
        size="large"
        shape="circular"
        appearance="primary"
        onClick={() => navigate("/awards/nomination/0/new")}
      >
        Submit New Nominations
      </Button>

      <div className={classes.widgetMain}>
        <DashboardLinkWidget
          onClick={() => {}}
          headerTitle="My Nominations"
          subtitle={"View all submitted and pending nominations"}
        />
        <DashboardLinkWidget
          onClick={() => {}}
          headerTitle="Supervisor View"
          subtitle={"Nominations where you listed as supervisor"}
        />
        <DashboardLinkWidget
          onClick={() => {}}
          headerTitle="Reviewers View"
          subtitle={"All the nominations for review"}
        />
        <DashboardLinkWidget
          onClick={() => {}}
          headerTitle="My Pending Actions"
          subtitle={"View all pending actions & approvals"}
        />
        <DashboardLinkWidget
          onClick={() => {}}
          headerTitle="Award Categories & Criteria"
          subtitle={"View award categories and criteria"}
        />
      </div>
    </div>
  );
};

type DashboardLinkWidgetProps = {
  onClick: () => void;
  headerTitle: string;
  subtitle?: string;
};

const logo: any = require("@assets/irmb_logo.png");

const DashboardLinkWidget: React.FC<DashboardLinkWidgetProps> = ({
  onClick,
  headerTitle,
  subtitle,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} onClick={onClick} orientation="horizontal">
      <CardHeader
        image={<img className={classes.logo} src={logo} alt={headerTitle} />}
        header={<Text weight="semibold">{headerTitle}</Text>}
        description={
          <Caption1 className={classes.caption}>{subtitle}</Caption1>
        }
      />
    </Card>
  );
};

const useStyles = makeStyles({
  root: {
    ...shorthands.gap("36px"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    flexGrow: 1,
  },
  widgetMain: {
    ...shorthands.gap("36px"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  title: {
    ...shorthands.margin(0, 0, "12px"),
  },

  description: {
    ...shorthands.margin(0, 0, "12px"),
  },

  card: {
    width: "20rem",
    maxWidth: "100%",
    height: "fit-content",
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  logo: {
    ...shorthands.borderRadius("4px"),
    width: "48px",
    height: "48px",
  },

  text: {
    ...shorthands.margin(0),
  },
});
