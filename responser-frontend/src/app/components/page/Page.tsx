import React, {PropsWithChildren} from "react";
import {Helmet} from "react-helmet";
import classNames from "classnames";
import "app/components/page/Page.less";

type PageProps = {
    tabTitle?: string;
    className?: string;
    loading?: boolean;
}

/**
 * Page wrapper. Adding tab title.
 */
export const Page: React.FC<PropsWithChildren<PageProps>> = (props: PropsWithChildren<PageProps>) => {
    const {tabTitle, className, children, loading = false} = props;
    const resultClassName = classNames("page", className);

    return (
        <div className={resultClassName}>
            <Helmet>
                <title>Responser{tabTitle ? `- ${tabTitle}` : ""}</title>
            </Helmet>

            {children}

            {loading && <div className="load-layer">LOADING</div>}
        </div>
    );
}
