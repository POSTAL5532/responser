import React from "react";
import {SpinnerCircularFixed} from "spinners-react";

type SpinnerProps = {
    size?: number;
}

export const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
    const {size} = props;

    return <SpinnerCircularFixed className="spinner"
                                 size={size}
                                 thickness={180}
                                 speed={180}
                                 color="#6690FF"
                                 secondaryColor="rgba(0, 0, 0, 0)"/>
}
