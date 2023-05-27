import React, {PropsWithChildren} from "react";
import {Helmet} from "react-helmet";
import classNames from "classnames";
import "./Page.less";

type PageProps = {
    tabTitle?: string;
    className?: string;
}

/**
 * Page wrapper. Adding tab title.
 */
export const Page: React.FC<PropsWithChildren<PageProps>> = (props: PropsWithChildren<PageProps>) => {
    const {tabTitle, className, children} = props;
    const resultClassName = classNames("page", className);

    return (
        <div className={resultClassName}>
            <Helmet>
                <title>Reviewly{tabTitle ? `- ${tabTitle}` : ""}</title>
            </Helmet>

            {children}
        </div>
    );
}
