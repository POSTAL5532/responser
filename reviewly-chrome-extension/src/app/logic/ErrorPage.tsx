import React from "react";
import {FallbackProps} from "react-error-boundary/dist/declarations/src/types";
import {observer} from "mobx-react";
import {Button} from "../components/button/Button";
import {nativeNavigateTo, reloadPage} from "../utils/NavigationUtils";

const ErrorPage: React.FC<FallbackProps> = (props: FallbackProps) => {
    return (
        <div>
            <h1>Something goes wrong!</h1>
            <Button onClick={reloadPage}>Go to main page</Button>
        </div>
    )
}

export default observer(ErrorPage);
