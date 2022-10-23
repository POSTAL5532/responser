import React from "react";
import classNames from "classnames";

export const FieldBlock: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (
    props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
    const {className, children, ...otherProps} = props;
    const resultClassName = classNames("field-block", className);

    return (
        <div {...otherProps} className={resultClassName}>
            {children}
        </div>
    );
}