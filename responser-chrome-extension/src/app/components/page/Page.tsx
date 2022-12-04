import React, {PropsWithChildren} from "react";
import classNames from "classnames";

type Page = {
    className?: string;
}

export const Page: React.FC<PropsWithChildren<Page>> = (props: PropsWithChildren<Page>) => {
    const {className, children} = props;
    const resultClassName = classNames("page", className);

    return (
        <div className={resultClassName}>
            {children}
        </div>
    );
}
