import React, {PropsWithChildren} from "react";

type ConditionShowProps = {
    condition: boolean;
}

export const ConditionShow: React.FC<PropsWithChildren<ConditionShowProps>> = (
    props: PropsWithChildren<ConditionShowProps>
) => {
    return(<>{props.condition ? props.children : null}</>);
}
