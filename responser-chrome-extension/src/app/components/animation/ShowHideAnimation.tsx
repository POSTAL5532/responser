import React, {PropsWithChildren} from "react";
import {AnimatedBlockWrapper} from "./AnimatedBlockWrapper";
import {AnimatePresence} from "./AnimatePresence";

type AnimateProps = {
    visible: boolean;
    className?:string;
    startDelay?: number
}

export const ShowHideAnimation: React.FC<PropsWithChildren<AnimateProps>> = (props) => {
    const {visible,startDelay, className, children} = props;

    return(
        <AnimatePresence visible={visible}>
            <AnimatedBlockWrapper className={className} startDelay={startDelay}>
                {children}
            </AnimatedBlockWrapper>
        </AnimatePresence>
    );
}
