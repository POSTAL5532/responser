import React, {PropsWithChildren} from "react";
import classNames from "classnames";
import "./PageName.less";

type PageNameProps = {
    className?: string;
}

export const PageName: React.FC<PropsWithChildren<PageNameProps>> = (props: PropsWithChildren<PageNameProps>) => {
    const {children, className} = props;
    const resultClassName = classNames("page-name", className);

    return (<h1 className={resultClassName}>{children}</h1>);
}
