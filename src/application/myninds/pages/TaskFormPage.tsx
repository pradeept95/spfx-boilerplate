/* eslint-disable */
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskForm } from "../components/TaskForm";

export const TaskFormPage: React.FunctionComponent<{}> = (props) => {
  const navigate = useNavigate();
  const {id} = useParams();
  return (
    <>
      <TaskForm id={id} onCancel={()=> navigate("/myninds")}/>
    </>
  );
};
