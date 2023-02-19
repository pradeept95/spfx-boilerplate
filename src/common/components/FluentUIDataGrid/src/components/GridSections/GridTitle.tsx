/* eslint-disable */
import { Text } from "@fluentui/react";
import * as React from "react";

export const GridTitle: React.FunctionComponent<{
    title: string,
    description: string
}> = ({ title, description }): JSX.Element => {
    return (
        <>
            <Text variant="xLarge" block nowrap>{title}</Text>
            <Text block nowrap>{description}</Text>
        </>
    );
};
