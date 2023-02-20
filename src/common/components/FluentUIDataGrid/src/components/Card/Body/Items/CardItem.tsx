/* eslint-disable */ 
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { onlyUnique } from "../../../../helpers/FilterHelper";
import { useDataTableGrid } from "../../../../hooks/useDataGrid"; 
import { IDataGridColumn } from "../../../../types/DataGridProps";
import { DefaultCardView } from "../../Components/DefaultCardView";

export const CardItem: React.FunctionComponent<{
  item: any;
  onCardViewRender : (
    item : any, 
    isSelected : boolean, 
    onItemSelect : (changedItems: any[], isSelected : boolean) => void ) => JSX.Element;

}> = ({ item, onCardViewRender }): JSX.Element => {
  const { gridKey$, columns$, selectedItems$ } = useDataTableGrid();

  const columns = useObservableState<IDataGridColumn<any>[]>(columns$, []);
  const selectedItems = useObservableState(selectedItems$, []);
  const gridKey = useObservableState<string>(gridKey$, "");

  const handleOnItemSelect = React.useCallback((newSelectedItems: any[], checked) => {
    const currentSelectedKeys = newSelectedItems?.map((x) => x?.[gridKey]);

    if (checked) {
      const newSelectedKeys = [...selectedItems, ...currentSelectedKeys];
      selectedItems$.next(newSelectedKeys?.filter(onlyUnique));
    } else {
      // remove current items from selected list if exists
      const otherThanCurrentSelectionKeys = selectedItems?.filter(
        (selectedItem) => {
          return !(currentSelectedKeys?.indexOf(selectedItem) > -1);
        }
      );

      selectedItems$.next(otherThanCurrentSelectionKeys?.filter(onlyUnique));
    }
  }, [selectedItems, gridKey]);

  return (
    <>
       {
        onCardViewRender ? onCardViewRender(item, item.isSelected, handleOnItemSelect) 
                        : <DefaultCardView item={item} columns={columns} isSelected = {item.isSelected} onItemSelect={handleOnItemSelect}/>
       }
    </>
  );
};
