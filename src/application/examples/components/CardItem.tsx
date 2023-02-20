/* eslint-disable */
import { Checkbox, DocumentCard, DocumentCardActivity, DocumentCardTitle, IDocumentCardStyles } from "@fluentui/react";
import * as React from "react";
import { SampleSales } from "../../shared/models/sample-sales.model";

const cardStyles: IDocumentCardStyles = {
    root: { display: 'inline-block', marginRight: 20, width: 320 },
};

export const ItemCardView: React.FunctionComponent<{
    item: SampleSales;
    isSelected: boolean,
    onItemSelect: (items: any[], selected) => void
}> = ({ item, isSelected, onItemSelect }): JSX.Element => {

    return (
        <>
            <DocumentCard
                aria-label={
                    'Document Card with logo and text preview. Conversation about annual report. Content preview. ' +
                    'Sent by Velatine Lourvric and 1 other in March 13, 2018.'
                }
                styles={cardStyles}
                // onClickHref="http://bing.com"
            >
                {/* <DocumentCardLogo {...logoProps} /> */}
                {/* <div className={conversationTileClass}> */}
                <Checkbox
                    name="Select or DeSelect Row"
                    ariaLabel="Select/Deselect Row"
                    checked={isSelected}
                    onChange={(ev, checked) => onItemSelect([item], checked)}
                />
                <DocumentCardTitle title={`${item.region} : ${item.city}`} shouldTruncate />
                <DocumentCardTitle
                    title={`${item.product} (${item.category})`}
                    shouldTruncate
                    showAsSecondaryTitle
                /> 
                <DocumentCardTitle
                    title={`${item.unitPrice} x ${item.quantity} = ${item.totalPrice}`} 
                    showAsSecondaryTitle
                />
                {/* </div> */}
                <DocumentCardActivity activity="Sent March 13, 2018" people={[]} />
            </DocumentCard> 
        </>
    );
};
