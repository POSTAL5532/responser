import React from "react";
import {FallbackProps} from "react-error-boundary/dist/declarations/src/types";
import {observer} from "mobx-react";
import {Button, ButtonType} from "../../components/button/Button";
import {reloadPage} from "../../utils/NavigationUtils";
import {AppHeader} from "../../components/app-header/AppHeader";
import "./ErrorPage.less";

const ErrorPage: React.FC<FallbackProps> = (props: FallbackProps) => {
    return (
        <div className="page error-page">
            <AppHeader/>

            <div className="error-content">
                <h1 className="error-page-header">Grats. You broke it!</h1>
                <h2 className="error-page-description">An error occurred while processing your request. Try to reopen extension =)</h2>
                <span className="or">or</span>
                <Button onClick={reloadPage} styleType={ButtonType.PRIMARY}>Go to main window</Button>
            </div>
        </div>
    )
}

export default observer(ErrorPage);
