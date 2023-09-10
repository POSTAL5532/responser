import React, {PropsWithChildren, useContext, useEffect} from "react";
import classNames from "classnames";
import "./Page.less";
import {observer} from "mobx-react";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";

type Page = {
    className?: string;
}

const Page: React.FC<PropsWithChildren<Page>> = (props: PropsWithChildren<Page>) => {
    const {className, children} = props;
    const resultClassName = classNames("page", className);
    const globalAppStore = useContext<GlobalAppStore>(GlobalAppStoreContext);

    useEffect(() => {
        if (globalAppStore.errorsStore.hasErrors) {
            throw new Error("Application has errors");
        }
    }, [globalAppStore.errorsStore.hasErrors]);

    return (
        <div className={resultClassName}>{children}</div>
    );
}

export default observer(Page);
