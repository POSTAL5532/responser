import React, {PropsWithChildren} from "react";
import classNames from "classnames";
import "./FieldMessage.less";

type FieldMessageProps = {
    isError?: boolean;
    visible?: boolean;
    className?: string;
}

export const FieldMessage: React.FC<PropsWithChildren<FieldMessageProps>> = (props: PropsWithChildren<FieldMessageProps>) => {
    const {className, children, isError = false, visible = true} = props;
    const resultClassName = classNames("error-message", {"is-error": isError}, className);

    return visible ? <span className={resultClassName}>{children}</span> : null;
}
