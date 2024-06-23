import {createBrowserHistory} from "history";
import {useLocation} from "react-router";
import React from "react";
import ApplicationProperties from "./app/service/ApplicationProperties";

export const browserHistory = createBrowserHistory({basename: ApplicationProperties.basePath});

export const useQuery = () => {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
