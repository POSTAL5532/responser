import React, {PropsWithChildren} from "react";
import {Helmet} from "react-helmet";
import classNames from "classnames";
import "./Page.less";

type PageProps = {
    tabTitle?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * Page wrapper. Adding tab title.
 */
export const Page: React.FC<PropsWithChildren<PageProps>> = (props: PropsWithChildren<PageProps>) => {
    const {tabTitle, className, children, ...otherProps} = props;
    const resultClassName = classNames("page", className);

    return (
        <div  {...otherProps} className={resultClassName}>
            <Helmet>
                <title>Reviewly{tabTitle ? `- ${tabTitle}` : ""}</title>
            </Helmet>

            {children}
        </div>
    );
}
