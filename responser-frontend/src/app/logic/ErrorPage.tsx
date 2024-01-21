import React from "react";
import {FallbackProps} from "react-error-boundary/dist/declarations/src/types";
import {observer} from "mobx-react";
import {Button} from "../components/button/Button";
import {navigateToMainPage} from "./main-page/MainPage";

const ErrorPage: React.FC<FallbackProps> = (props?: FallbackProps) => {
    return (
        <div>
            <h1>Something goes wrong!</h1>
            <Button onClick={() => navigateToMainPage(true)}>Go main page</Button>
        </div>
    )
}

export default observer(ErrorPage);
