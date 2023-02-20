/* eslint-disable */
import { Checkbox, DocumentCard, DocumentCardDetails, DocumentCardType } from "@fluentui/react";
import * as React from "react";
import { IDataGridColumn } from "../../../types/DataGridProps";

export const DefaultCardView: React.FunctionComponent<{
    item: any;
    columns: IDataGridColumn<any>[],
    isSelected: boolean,
    onItemSelect: (items: any[], selected) => void
}> = ({ item, columns, onItemSelect }): JSX.Element => {

    return (
        <>
            <DocumentCard aria-label="Item Details" type={DocumentCardType.normal} styles={{
                root : {
                    width : "100%"
                }
            }}>
                <DocumentCardDetails>
                    <div>
                        <Checkbox
                            name="Select or DeSelect Row"
                            ariaLabel="Select/Deselect Row"
                            checked={item?.isSelected}
                            onChange={(ev, checked) => onItemSelect([item], checked)}
                        />
                        {columns?.filter(x => !x.hideInDefaultView)?.map((col) => (
                            <>
                                {col?.onRender && (
                                    <div>
                                        <span>
                                            <strong>{col?.name} :</strong>
                                        </span>
                                        <span>
                                            {col?.onRender(item)}
                                        </span>
                                    </div>

                                )}
                                {!col?.onRender && (
                                    <div>
                                        <span>
                                            <strong>{col?.name} :</strong>
                                        </span>
                                        <span>
                                            {col?.dataType == "date" ? (
                                                new Date(item[col.fieldName])?.toLocaleDateString(
                                                    col.dataFormat ?? "en-US"
                                                )
                                            ) : (
                                                <></>
                                            )}
                                            {!col?.dataType || col?.dataType == "text" ? (
                                                item[col.fieldName]
                                            ) : (
                                                <></>
                                            )}
                                        </span>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </DocumentCardDetails>
            </DocumentCard>
        </>
    );
};
