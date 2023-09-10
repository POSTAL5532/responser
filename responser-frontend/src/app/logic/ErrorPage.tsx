import React from "react";
import {FallbackProps} from "react-error-boundary/dist/declarations/src/types";
import {observer} from "mobx-react";

const ErrorPage: React.FC<FallbackProps> = (props: FallbackProps) => {
    return (
        <h1>Something goes wrong!</h1>
    )
}

export default observer(ErrorPage);
