/* eslint-disable */
import {
  HighContrastSelector,
  IButtonStyles,
  ICommandBarItemProps 
} from "@fluentui/react";
import { IconButton } from "office-ui-fabric-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DataTableGrid } from "../../../common/components/DataTable";
import { IDataGridColumn } from "../../../common/components/DataTable/types/DataTableProps";
import { useCreateAndAssignTask } from "../shared/hooks/useCreateTask";
import { useGetAllPendingActions } from "../shared/hooks/useGetAllPendingActions";
import { MyNINDSActions } from "../shared/model/my-ninds.model";

const customSplitButtonStyles: IButtonStyles = {
  splitButtonMenuButton: {
    background: "transparent",
    width: 28,
    border: "none",
  },
  splitButtonMenuIcon: { fontSize: "7px" },
  splitButtonDivider: {
    backgroundColor: "#c8c8c8",
    width: 1,
    right: 26,
    position: "absolute",
    top: 4,
    bottom: 4,
  },
  splitButtonContainer: {
    selectors: {
      [HighContrastSelector]: { border: "none" },
    },
  },
};

export const MyPendingActionPage: React.FunctionComponent<{}> = (props) => {
  const [loading, pendingActions, refreshPendingActions] =
    useGetAllPendingActions();
  const [createAndAssignTask] = useCreateAndAssignTask();
  const navigate = useNavigate(); 
  
  const handleCompleteTask = async (item: MyNINDSActions) => {
    console.log(item);
    await createAndAssignTask({
      ...item,
      Active: false,
    } as MyNINDSActions);
    await refreshPendingActions();
  };

  const handleGetContextMenuItem = (
    selecteItems: MyNINDSActions[]
  ): ICommandBarItemProps[] => {
    let commands: ICommandBarItemProps[] = [
      {
        key: "newItem",
        text: "New Task",
        iconProps: { iconName: "Add" },
        onClick: () => navigate("/myninds/0/new"),
      },
    ];

    if (selecteItems?.length == 1) {
      commands.push({
        key: "edit",
        text: "Edit Task",
        iconProps: { iconName: "Edit" },
        disabled: selecteItems?.length !== 1,
        onClick: () => navigate(`/myninds/${selecteItems?.[0]?.id}/new`),
      });
    }

    if (selecteItems?.length == 1) {
      commands.push({
        key: "complete",
        text: "Mark Completed",
        iconProps: { iconName: "SkypeCircleCheck" },
        onClick: () => {
          handleCompleteTask(selecteItems?.[0]);
        },
      });
    }

    return commands;
  };

  const columns: IDataGridColumn[] = [
    {
      key: "id",
      name: "Actions",
      fieldName: "id",
      minWidth: 50,
      maxWidth: 100,
      disableAllColumnActions: true,
      onRender: (item: any) => {
        return (
          <>
            <IconButton
              title="Take Action"
              primary
              split
              iconProps={{ iconName: "NavigateExternalInline" }}
              splitButtonAriaLabel="See Actions"
              aria-roledescription="More Actions"
              styles={customSplitButtonStyles}
              menuProps={{
                items: [
                  {
                    key: "edit",
                    text: "Edit Task",
                    iconProps: { iconName: "Edit" },
                    onClick: () => {
                      navigate(`/myninds/${item?.id}/edit`);
                    },
                  },
                  {
                    key: "complete",
                    text: "Mark Completed",
                    iconProps: { iconName: "SkypeCircleCheck" },
                    onClick: () => {
                      handleCompleteTask(item);
                    },
                  },
                ],
              }}
              onClick={() => {
                window.open(item.actionUrl, "_blank");
              }}
            />
          </>
        );
      },
    },
    {
      key: "applicationId",
      name: "Application ID",
      fieldName: "applicationId",
      minWidth: 100,
      maxWidth: 140,
      isResizable: true,
      filterType: "multiselect",
    },
    {
      key: "application",
      name: "Application",
      fieldName: "application",
      maxWidth: 130,
      isResizable: true,
      minWidth: 180,
      data: "string",
      filterType: "multiselect",
      isGrouped: true,
    },
    {
      key: "action",
      name: "Action",
      fieldName: "action",
      minWidth: 70,
      maxWidth: 150,
      isResizable: true,
      data: "string",
      isMultiline: true,
    },
    {
      key: "details",
      name: "Action Details",
      fieldName: "details",
      minWidth: 130,
      maxWidth: 180,
      isResizable: true,
      data: "html",
      isMultiline: true,
      disableGrouping: true,
      onRender: (item: any) => {
        return (
          <span dangerouslySetInnerHTML={{ __html: item?.details }}></span>
        );
      },
    },
  ];

  return (
    <> 
      <DataTableGrid
        gridKeyField="id"
        loading={loading}
        items={pendingActions}
        columns={columns}
        pageSize={20} 
        emptyItemsMessage="You don't have any tasks to take action."
        onSelectionChanged={(selectedItems) => {
          console.log(selectedItems);
        }} 
        onGetContextMenuItem = {handleGetContextMenuItem}
      />
    </>
  );
};
