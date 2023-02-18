/* eslint-disable */

export function markSelectedItems(
  pagedItems: any[],
  selectedItems: any[],
  gridKey: string
): any[] {
  const items = pagedItems?.slice(0)?.map((pageditem) => {
    const isSelected = selectedItems?.some(
      (selectedItem) => selectedItem == pageditem?.[gridKey]
    );
    return {
      ...pageditem,
      isSelected: isSelected,
    };
  });

  return items;
}
