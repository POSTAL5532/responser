import React from "react";
import {observer} from "mobx-react";
import {FallbackProps} from "react-error-boundary/dist/declarations/src/types";
import {MAIN_PAGE_URL} from "../main-page/MainPage";
import {Link, LinkSize} from "../../components/link/Link";
import {Icon, IconType} from "../../components/icon/Icon";
import "./ErrorPage.less";

const ErrorPage: React.FC<FallbackProps> = (props?: FallbackProps) => {
    return (
        <div className="page-content error-content">
            <h1 className="error-page-header">Grats. You broke it!</h1>
            <h2 className="error-page-description">Feel free to use our site navigation =)</h2>
            <span className="or">or</span>
            <Link size={LinkSize.BIG} href={`/app${MAIN_PAGE_URL}`} className="go-back-link">
                <Icon type={IconType.LINK}/>
                Go back to Home
            </Link>
        </div>
    )
}

export default observer(ErrorPage);
