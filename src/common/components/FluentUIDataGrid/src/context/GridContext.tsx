
/* eslint-disable */ 
import { IGroup } from "@fluentui/react";
import { useObservableState } from "observable-hooks";
import * as React from "react";
import { createContext } from "react";
import { BehaviorSubject, combineLatestWith, map } from "rxjs";
import { DEFAULT_PAGE_SIZE } from "../defaults/constants";
import { filterGrid } from "../helpers/FilterHelper"; 
import { groupItems } from "../helpers/GroupHelpers";
import { getPagedItems } from "../helpers/PaginationHelpers";
import { markSelectedItems } from "../helpers/SelectionHelper";
import { sortGrid } from "../helpers/SortHelpers";
import { IDataGridColumn, IDataGridProps } from "../types/DataGridProps";

const DataTableContext = createContext<any>({});
export default DataTableContext;

export function DataTableContextProvider<T extends {}>(props: React.PropsWithChildren<IDataGridProps<T>>): JSX.Element {

    const items$ = React.useMemo(
      () => new BehaviorSubject<T[]>([]),
      []
    );
    const selectedItems$ = React.useMemo(() => new BehaviorSubject<any[]>([]), []);
    const globalFilter$ = React.useMemo(() => new BehaviorSubject(""), []);
    const columns$ = React.useMemo(
      () =>
        new BehaviorSubject<IDataGridColumn<T>[]>(
          props.columns?.map((x) => {
            return { ...x, isFiltered: !!x.filterExpression };
          })
        ),
      [props.columns]
    );   
    const groups$ = React.useMemo(() => new BehaviorSubject<IGroup[]>([]), []);   

    const gridKey$ = React.useMemo(() => new BehaviorSubject<string>(props?.key ?? "id"), []);
    const gridKey = useObservableState(gridKey$, ""); 

    const pageSize$ = React.useMemo(() => new BehaviorSubject<number>(props?.pageSize ?? DEFAULT_PAGE_SIZE), []);
    const currentPage$ = React.useMemo(() => new BehaviorSubject<number>(1), []);

    const filteredItems$ = React.useMemo(
      () =>
        items$.pipe(
          combineLatestWith(globalFilter$, columns$),
          map(([values, searchTerm, columns]) => {
            const filteredItems = filterGrid([...values], searchTerm, columns) as T[];
            return [filteredItems, columns] as const;
          })
        ),
      []
    );

    const filteredSortedItems$ = React.useMemo(
      () =>
        filteredItems$.pipe( 
          //combineLatestWith(columns$),
          map(([values, columns]) => {
            const sortedItems = sortGrid([...values], columns) as T[]
            return [sortedItems, columns] as const;
          })
        ),
      []
    );

    const pagedItems$ = React.useMemo(
      () =>
        filteredSortedItems$.pipe( 
          combineLatestWith(pageSize$, currentPage$),
          map(([[filterSorteditems, columns], pageSize, currentPage]) =>{
            const pageditems = getPagedItems([...filterSorteditems], pageSize, currentPage) as T[];
            return [pageditems, columns] as const;
          }), 
          map(([filterSorteditems, columns]) => { 
            // get grouped column
            const groupedColumns = columns
              ?.filter((x) => x.isGrouped)
              ?.sort((x, y) =>
                x.groupOrderNumber > y.groupOrderNumber ? 1 : -1
              );

            const groups = groupItems(
              [...filterSorteditems],
              [...groupedColumns],
              props?.expandDefaultGroups
            ); 

            groups$.next(groups);
            return filterSorteditems;
          }),
          combineLatestWith(selectedItems$),
          map(([pagedItems, selectedItems]) =>
            markSelectedItems([...pagedItems], selectedItems, gridKey)
          )
        ),
      []
    );  
 
    React.useEffect(() => {
      if (props?.items?.length) {
        items$.next(props.items);
      }
    }, [props.items]); 
  
    return (
        <DataTableContext.Provider value={
            { 
                gridKey$,
                pageSize$,
                currentPage$,

                globalFilter$,
                 
                columns$,
                groups$,
                items$,
                filteredItems$,
                pagedItems$, 
                selectedItems$
            } as const
        }> 
            {props.children}
        </DataTableContext.Provider>
    );
}