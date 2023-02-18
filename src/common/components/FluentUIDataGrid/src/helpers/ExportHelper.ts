/* eslint-disable */
import { ExportObjectModel } from "../../../../types/export-object.type";
import { IDataGridColumn } from "../types/DataGridProps";

export function GetExportData(items: any[], columns: IDataGridColumn<any>[]): ExportObjectModel[] {
    return items?.map(item => {
        const exportObject: ExportObjectModel = {};
        for (let col of columns?.filter(x => !x.hideInDefaultView)) {
            exportObject[col.name] = item?.[col.fieldName]
        }
        return exportObject;
    })
}