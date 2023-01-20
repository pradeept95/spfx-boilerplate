import { IDetailsListProps } from "@fluentui/react";

interface DataGridProps<T>  {
    loading : boolean,
    items : T[],
    pageSize? : number;
    pageSizeOptions? : boolean;   
}

export type IDatagridType<T> = DataGridProps<T> & IDetailsListProps


