/* eslint-disable */
import { Button, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import * as React from "react";  
import { AwardCriteria, AwardForm } from "@app/awards/components";
import { UserService } from "@common/services/UserService";
import { POMUserService } from "@common/services/POMUserService";
import {
  DrawerInline,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerFooter,
} from "@fluentui/react-components/unstable";
import { useNavigate } from "react-router-dom";

const { ensureUser } = UserService();
const { getUserDetails } = POMUserService();
const AwardSubmissionPage: React.FunctionComponent<{}> = () => {  

  React.useEffect(() => {
    (async () => {
      const user = await ensureUser("thapaliyapr");
      const employee = await getUserDetails("thapaliyapr");
      console.log(user, employee);
    })();
  }, []);


  const navigate = useNavigate();

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <AwardForm id={0} mode="new" onCancel={() => { navigate("/awards"); }}  />
      </div>
      <div className={classes.right}>
        <DrawerInline className={classes.drawer} open>
          <Header />
          <Body />
          <Footer />
        </DrawerInline>
      </div>
    </div>
  );
};

export default AwardSubmissionPage;

const useStyles = makeStyles({
  root: {
    display: "flex", 
    flexGrow: 1,
  },

  left: {
    width: "70%",
    minWidth: "600px",
  },

  right: {
    width: "30%",
    minWidth: "200px",
    ...shorthands.borderLeft(
      tokens.strokeWidthThin,
      "solid",
      tokens.colorPaletteAnchorBorderActive
    ),
 
  },
  drawer: {
    width: "100%",
    height: "100%",
  },
});



const Header = () => {
  return (
    <DrawerHeader>
      <DrawerHeaderTitle>
        2023 NINDS Director’s Awards Program Categories and Criteria
      </DrawerHeaderTitle>
    </DrawerHeader>
  );
};

const Footer = () => {
  return (
    <DrawerFooter>
      <Button appearance="primary">View More</Button> 
    </DrawerFooter>
  );
};

const Body = () => {
  return (
    <DrawerBody>
      <AwardCriteria />
    </DrawerBody>
  );
};