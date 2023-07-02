import React from "react";
import classNames from "classnames";
import "./Link.less";

export const Link: React.FC<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>> = (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
    const {className, ...otherProps} = props;
    const resultClassName = classNames("link", className);

    return(<a href="src/app/components/Link" className={resultClassName} {...otherProps}/>);
}
