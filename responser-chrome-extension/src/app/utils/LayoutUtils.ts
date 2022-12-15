import React, {MutableRefObject} from "react";

export const useIsOverflow = (ref: MutableRefObject<HTMLElement>, callback?: (hasOverflow:boolean) => void) => {
    const [isOverflow, setIsOverflow] = React.useState(undefined);

    React.useLayoutEffect(() => {
        const { current } = ref;

        const trigger = () => {
            const hasOverflow = current.scrollHeight > current.clientHeight;

            setIsOverflow(hasOverflow);

            if (callback) callback(hasOverflow);
        };

        if (current) {
            trigger();
        }
    }, [callback, ref]);

    return isOverflow;
};