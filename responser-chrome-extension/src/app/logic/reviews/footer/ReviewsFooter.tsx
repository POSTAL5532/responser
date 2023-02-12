import React from "react";
import {Button, ButtonType} from "../../../components/button/Button";
import {Icon, IconType} from "../../../components/icon/Icon";
import "./ReviewsFooter.less";

type ReviewsFooterProps = {
    userAuthorized: boolean;
    hasUserReview: boolean;
    onEditReviewClick: () => void;
    onAddReviewClick: () => void;
    onDeleteReviewClick: () => void;
    onLoginClick: () => void;
    onLogOutClick: () => void;
    isLoading: boolean;
}

export const ReviewsFooter: React.FC<ReviewsFooterProps> = (props: ReviewsFooterProps) => {
    const {
        userAuthorized,
        hasUserReview,
        onEditReviewClick,
        onAddReviewClick,
        onDeleteReviewClick,
        onLoginClick,
        onLogOutClick,
        isLoading
    } = props;

    return (
        <div className="reviews-footer">
            {
                !isLoading && userAuthorized && !hasUserReview && onAddReviewClick &&
                <Button className="add-review" onClick={onAddReviewClick}>
                    <Icon type={IconType.PLUS}/>Add review
                </Button>
            }

            {
                !isLoading && userAuthorized && hasUserReview && onEditReviewClick &&
                <Button className="edit-review" onClick={onEditReviewClick}>
                    <Icon type={IconType.EDIT}/>Edit review
                </Button>
            }

            {
                !isLoading && userAuthorized && hasUserReview && onDeleteReviewClick &&
                <Button styleType={ButtonType.SECONDARY}
                        className="delete-review"
                        onClick={onDeleteReviewClick}>
                    <Icon type={IconType.DELETE}/>
                </Button>
            }

            {
                !isLoading && !userAuthorized && onLoginClick &&
                <Button className="login" onClick={onLoginClick}>
                    <Icon type={IconType.LOGIN}/> Sign in for review
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
