import React, {PropsWithChildren} from "react";
import classNames from "classnames";

type PageItemProps = {
    hidden: boolean;
    className?: string;
}

export const PageItem: React.FC<PropsWithChildren<PageItemProps>> = (props: PropsWithChildren<PageItemProps>) => {
    const {hidden, className, children} = props;
    const resultClassName = classNames("page-item", {"hidden": hidden}, className);

    return(
        <div className={resultClassName}>
            {children}
        </div>
    )
}
