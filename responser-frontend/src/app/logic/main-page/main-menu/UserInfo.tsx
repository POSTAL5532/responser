import React from "react";
import {observer} from "mobx-react";
import {Icon, IconType} from "../../../components/icon/Icon";
import {User} from "../../../model/User";
import {Spinner} from "../../../components/spinner/Spinner";
import {Tooltip, TooltipPosition} from "../../../components/tooltip/Tooltip";
import {getUserAvatarUrl} from "../../../utils/ResourcesUtils";
import {Button} from "../../../components/button/Button";

type UserInfoProps = {
    user: User;
    onChangeUserAvatarClick: () => void;
}

const UserInfo: React.FC<UserInfoProps> = (props: UserInfoProps) => {
    const {user, onChangeUserAvatarClick} = props;

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
            <Button className="change-user-avatar" onClick={onChangeUserAvatarClick}><Icon type={IconType.EDIT}/></Button>
            <div className="user-info">
                <h2 className="username">{user.fullName}</h2>
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

export default observer(UserInfo);
