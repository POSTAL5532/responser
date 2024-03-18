import React from "react";
import classNames from "classnames";
import "./Link.less";

export enum LinkSize {
    BIG = "big",
    SMALL = "small",
}

type LinkProps = {
    size?: LinkSize;
} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const Link: React.FC<LinkProps> = (props: LinkProps) => {
    const {className, size, href = "#", ...otherProps} = props;
    const resultClassName = classNames("link", size, className);

    return (<a href={href} className={resultClassName} {...otherProps}/>);
}
