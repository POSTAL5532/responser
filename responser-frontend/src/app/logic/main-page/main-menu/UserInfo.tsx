import React from "react";
import {Icon, IconType} from "../../../components/icon/Icon";
import {User} from "../../../model/User";
import {Spinner} from "../../../components/spinner/Spinner";
import {Tooltip, TooltipPosition} from "../../../components/tooltip/Tooltip";
import {getUserAvatarUrl} from "../../../utils/ResourcesUtils";

type UserInfoProps = {
    user: User;
}

export const UserInfo: React.FC<UserInfoProps> = (props: UserInfoProps) => {
    const {user} = props;

    if (!user) {
        return(
            <div className="user-info-container">
                <Spinner className="user-info-loading"/>
            </div>
        )
    }

    return(
        <div className="user-info-container">
            <img alt="User avatar" className="user-avatar" src={getUserAvatarUrl(user)}/>
            <div className="user-info">
                <h2 className="username">{user.userName}</h2>
                <div className="rating-container">
                    <Tooltip position={TooltipPosition.BOTTOM} content="Ratings are generated based on evaluations from other users of your reviews.">
                        <Icon type={IconType.HELP_CIRCLE}/>
                    </Tooltip>
                    <span className="reviews-rating-label">Reviews rating</span>
                    <Icon type={IconType.STAR}/>
                    <span className="reviews-rating-value">{user.reviewsCommonRating !== null ? user.reviewsCommonRating.toFixed(1) : "0.0"}</span>
                </div>
            </div>
        </div>
    );
}