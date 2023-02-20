/* eslint-disable */
import { IStackTokens, Stack } from "@fluentui/react";
import * as React from "react";
import { CardItem } from "./Items/CardItem";

const itemStyles: React.CSSProperties = {
  alignItems: 'center', 
  display: 'flex',
  height: "auto",
  justifyContent: 'center',
  width: 300,
};
const wrapStackTokens: IStackTokens = { childrenGap: 30 };

export const CardModeBody: React.FunctionComponent<{
  items: any[],
  onCardViewRender : (
    item : any, 
    isSelected : boolean, 
    onItemSelect : (changedItems: any[], isSelected : boolean) => void ) => JSX.Element;
}> = ({ items, onCardViewRender }): JSX.Element => {
  return (
    <>
      <Stack enableScopedSelectors horizontal wrap tokens={wrapStackTokens}> 
        {items?.map((item) => <div style={itemStyles}><CardItem item={item} onCardViewRender={onCardViewRender}/></div>)} 
      </Stack>
    </>
  );
};
