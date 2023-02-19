import React from "react";
import classNames from "classnames";
import "app/components/form/label/Label.less";

export const Label: React.FC<React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>> = (
    props: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
) => {
    const className = classNames("label", props.className);

    return (
        <label {...props} className={className}>{props.children}</label>
    );
}
