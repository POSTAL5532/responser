import React from "react";
import {createMemoryHistory} from "history";
import {useLocation} from "react-router";

export const appRouteHistory = createMemoryHistory();

export const useQuery = () => {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
