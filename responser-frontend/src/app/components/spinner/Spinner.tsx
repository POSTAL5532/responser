import React from "react";
import {SpinnerCircularFixed} from "spinners-react";

type SpinnerProps = {
    size?: number;
    color?: string;
}

export const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
    const {size, color} = props;

    return <SpinnerCircularFixed className="spinner"
                                 size={size}
                                 thickness={180}
                                 speed={180}
                                 color={color || "#6690FF"}
                                 secondaryColor="rgba(0, 0, 0, 0)"/>
}
