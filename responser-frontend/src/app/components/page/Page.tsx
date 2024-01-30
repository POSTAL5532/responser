import React, {PropsWithChildren, useContext, useEffect} from "react";
import {Helmet} from "react-helmet";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {observer} from "mobx-react";
import "./Page.less";

type PageProps = {
    tabTitle?: string;
    hideHeader?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * Page wrapper. Adding tab title.
 */
const Page: React.FC<PropsWithChildren<PageProps>> = (props: PropsWithChildren<PageProps>) => {
    const {tabTitle, className, children} = props;
    const globalAppStore = useContext<GlobalAppStore>(GlobalAppStoreContext);

    useEffect(() => {
        if (!!className) {
            globalAppStore.appPageClassName = className;
        }
    }, [className]);

    useEffect(() => {
        if (globalAppStore.errorsStore.hasErrors) {
            console.log(globalAppStore.errorsStore.errors);
            throw new Error("Application has errors");
        }
    }, [globalAppStore.errorsStore.hasErrors]);

    return (
        <div className="page-content">
            <Helmet>
                <title>Reviewly{tabTitle ? `- ${tabTitle}` : ""}</title>
            </Helmet>

            {children}
        </div>
    );
}

export default observer(Page);
