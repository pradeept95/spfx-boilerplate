/* eslint-disable */
import * as React from "react";

import {
  makeStyles,
  Caption1,
  Button,
  shorthands,
  Persona,
} from "@fluentui/react-components";
import {
  EditRegular,
  EditFilled,
  DeleteRegular,
  DeleteFilled,
  bundleIcon,
} from "@fluentui/react-icons";
import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from "@fluentui/react-components";
import { Nominee } from "../shared/types";

const useStyles = makeStyles({
  card: {
    ...shorthands.margin("auto"),
    width: "400px",
    maxWidth: "100%",
  },
});

const EditIcon = bundleIcon(EditFilled, EditRegular);
const DeleteIcon = bundleIcon(DeleteFilled, DeleteRegular);

type AdditionalProps = {
    onEdit: () => void;
    onDelete: () => void;
};
    

export const NomineeCard: React.FC<Nominee  & AdditionalProps> = (props) => {
  const styles = useStyles(); 

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Persona
            name={`${props.firstName || ""} ${props.lastName || ""} [${
              props.employeeType || ""
            }]`}
            secondaryText={props.title}
            presence={{ status: "available" }}
          />
        }
        description={<Caption1>{props.office?.split(" ")?.join("/")}</Caption1>}
      />

          <CardPreview>
              {props.supervisor}
              {props.division} 
      </CardPreview>

      <CardFooter>
        <Button icon={<EditIcon fontSize={16} onClick={props.onEdit}/>}></Button>
        <Button icon={<DeleteIcon fontSize={16} onClick={props.onDelete}/>}></Button>
      </CardFooter>
    </Card>
  );
};
