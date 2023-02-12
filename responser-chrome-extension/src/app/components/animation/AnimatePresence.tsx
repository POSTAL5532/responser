import React, {PropsWithChildren} from "react";
import {AnimatePresence as NativeAnimatePresence} from "framer-motion";

type AnimatePresenceProps = {
    visible: boolean;
}

export const AnimatePresence: React.FC<PropsWithChildren<AnimatePresenceProps>> = (props) => {
    const {visible, children} = props;

    return (
        <NativeAnimatePresence>{visible && children}</NativeAnimatePresence>
    );
}