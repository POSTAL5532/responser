import React, {PropsWithChildren, useContext, useEffect} from "react";
import {Helmet} from "react-helmet";
import classNames from "classnames";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import "./Page.less";

type PageProps = {
    tabTitle?: string;
    hideHeader?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * Page wrapper. Adding tab title.
 */
export const Page: React.FC<PropsWithChildren<PageProps>> = (props: PropsWithChildren<PageProps>) => {
    const {tabTitle, className, children, hideHeader = false, ...otherProps} = props;
    const resultClassName = classNames("page", {"hidden-header": hideHeader}, className);
    const globalAppStore = useContext<GlobalAppStore>(GlobalAppStoreContext);

    useEffect(() => {
        globalAppStore.hideHeader = hideHeader;
    }, [hideHeader])

    return (
        <div  {...otherProps} className={resultClassName}>
            <Helmet>
                <title>Reviewly{tabTitle ? `- ${tabTitle}` : ""}</title>
            </Helmet>

            {children}
        </div>
    );
}
