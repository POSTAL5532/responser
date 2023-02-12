import React, {PropsWithChildren} from "react";
import {motion, MotionStyle} from "framer-motion";
import classNames from "classnames";

const ANIMATION_DURATION = 0.1;

type AnimatedBlockWrapper = {
    onClick?: () => void;
    className?: string;
    style?: MotionStyle;
    startDelay?: number;
}

export const AnimatedBlockWrapper: React.FC<PropsWithChildren<AnimatedBlockWrapper>> = (props) => {
    const {children, className, onClick, style, startDelay = 0} = props;
    const resultClassName = classNames("animated-block-wrapper", className)

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {delay: startDelay, duration: ANIMATION_DURATION}}}
            exit={{opacity: 0, transition: {duration: ANIMATION_DURATION}}}
            onClick={onClick}
            style={style}
            className={resultClassName}>
            {children}
        </motion.div>
    );
}
