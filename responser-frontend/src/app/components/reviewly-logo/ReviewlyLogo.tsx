import React from "react";
import {Icon, IconType} from "../icon/Icon";
import "./ReviewlyLogo.less";

export const ReviewlyLogo: React.FC = () => {
    return(
        <div className="reviewly-logo">
            <Icon type={IconType.REVIEWLY_LOGO}/>
            <h1 className="title-label">Reviewly</h1>
        </div>
    );
}