import React, {PropsWithChildren} from "react";
import classNames from "classnames";
import "./FieldLayout.less";

export enum FieldLayoutType {
    INLINE = "INLINE",
    COLUMN = "COLUMN"
}

type FieldLayoutProps = {
    label: string | React.ReactNode;
    layoutType?: FieldLayoutType;
    disabled?: boolean;
    className?: string;
}

export const FieldLayout: React.FC<PropsWithChildren<FieldLayoutProps>> = (props: PropsWithChildren<FieldLayoutProps>) => {
    const {children, label, layoutType = FieldLayoutType.COLUMN, disabled, className} = props;
    const resultClassName = classNames(
        "field-layout",
        {"disabled": disabled},
        layoutType.toLowerCase(),
        className
    );

    return (
        <div className={resultClassName}>
            <span className="label">{label}</span>
            {children}
        </div>
    );
}