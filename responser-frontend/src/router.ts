import {createBrowserHistory} from "history";
import {useLocation} from "react-router";
import React from "react";

export const browserHistory = createBrowserHistory();

export const useQuery = () => {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
