/* eslint-disable */
import { IGroup } from "@fluentui/react";
import * as React from "react"; 
import { CardItemGrouped } from "./Items/CardItemGrouped";

export const CardModeGroupedBody: React.FunctionComponent<{
  items: any[];
  groups: IGroup[]; 
  onCardViewRender : (
    item : any, 
    isSelected : boolean, 
    onItemSelect : (changedItems: any[], isSelected : boolean) => void ) => JSX.Element;
}> = ({ items, groups, onCardViewRender }): JSX.Element => {

  return (
    <>
      <div>
        {groups.map((group) => (
          <>
            <CardItemGrouped items={items} group={group} onCardViewRender={onCardViewRender}/>
          </>
        ))}
      </div>
    </>
  );
};
