import React from "react";
import {Button, ButtonType} from "../../../components/button/Button";
import {ResourceType} from "../../../model/ResourceType";
import {Icon, IconType} from "../../../components/icon/Icon";

type ReviewsFooterProps = {
    reviewsResourceType: ResourceType;
    userAuthorized: boolean;
    hasUserReview: boolean;
    onEditReviewClick: () => void;
    onAddReviewClick: () => void;
    onDeleteReviewClick: () => void;
    onLoginClick: () => void;
    onLogOutClick: () => void;
}

export const ReviewsFooter: React.FC<ReviewsFooterProps> = (props: ReviewsFooterProps) => {
    const {
        reviewsResourceType,
        userAuthorized,
        hasUserReview,
        onEditReviewClick,
        onAddReviewClick,
        onDeleteReviewClick,
        onLoginClick,
        onLogOutClick
    } = props;

    const addReviewButtonText = reviewsResourceType === ResourceType.PAGE
        ? "Page review"
        : "Site review";

    const editReviewButtonText = reviewsResourceType === ResourceType.PAGE
        ? "Page review"
        : "Site review";

    return (
        <div className="footer">
            {
                userAuthorized && !hasUserReview && onAddReviewClick &&
                <Button className="add-review"
                        onClick={onAddReviewClick}>
                    <Icon type={IconType.PLUS}/>
                    {addReviewButtonText}
                </Button>
            }

            {
                userAuthorized && hasUserReview && onEditReviewClick &&
                <Button className="edit-review"
                        onClick={onEditReviewClick}>
                    <Icon type={IconType.EDIT}/>
                    {editReviewButtonText}
                </Button>
            }

            {
                userAuthorized && hasUserReview && onDeleteReviewClick &&
                <Button styleType={ButtonType.SECONDARY}
                        className="delete-review"
                        onClick={onDeleteReviewClick}>
                    <Icon type={IconType.DELETE}/>
                </Button>
            }

            {
                !userAuthorized && onLoginClick &&
                <Button className="login"
                        onClick={onLoginClick}>
                    <Icon type={IconType.LOGIN}/>
                    Sign in for review
                </Button>
            }

            {
                userAuthorized && onLogOutClick &&
                <Button styleType={ButtonType.SECONDARY}
                        className="logout"
                        onClick={onLogOutClick}>
                    <Icon type={IconType.LOGOUT}/>
                </Button>
            }
        </div>
    );
}
