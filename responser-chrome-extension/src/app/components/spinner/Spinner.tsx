import React from "react";
import {SpinnerCircularFixed} from "spinners-react";
import classNames from "classnames";

type SpinnerProps = {
    size?: number;
    color?: string;
    className?: string;
}

export const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
    const {size, color, className} = props;
    const resultClassName = classNames("spinner", className);

    return <SpinnerCircularFixed className={resultClassName}
                                 size={size}
                                 thickness={180}
                                 speed={180}
                                 color={color || "rgba(0, 0, 0, 0.60)"}
                                 secondaryColor="rgba(0, 0, 0, 0)"/>
}
