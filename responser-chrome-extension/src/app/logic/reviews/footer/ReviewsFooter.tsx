import React from "react";
import {Button, ButtonType} from "../../../components/button/Button";
import {Icon, IconType} from "../../../components/icon/Icon";
import "./ReviewsFooter.less";
import {Spinner} from "../../../components/spinner/Spinner";

type ReviewsFooterProps = {
    userAuthorized: boolean;
    hasUserReview: boolean;
    onEditReviewClick: () => void;
    onAddReviewClick: () => void;
    onDeleteReviewClick: () => void;
    onLoginClick: () => void;
    onLogOutClick: () => void;
    isLoading: boolean;
    isReviewRemoving: boolean;
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
        isLoading,
        isReviewRemoving
    } = props;

    return (
        <div className="reviews-footer">
            {
                !isLoading && userAuthorized && !hasUserReview && onAddReviewClick &&
                <Button className="add-review" onClick={onAddReviewClick} disabled={isReviewRemoving}>
                    <Icon type={IconType.PLUS}/>Add review
                </Button>
            }

            {
                !isLoading && userAuthorized && hasUserReview && onEditReviewClick &&
                <Button className="edit-review" onClick={onEditReviewClick} disabled={isReviewRemoving}>
                    <Icon type={IconType.EDIT}/>Edit review
                </Button>
            }

            {
                !isLoading && userAuthorized && hasUserReview && onDeleteReviewClick &&
                <Button styleType={ButtonType.SECONDARY}
                        className="delete-review"
                        onClick={onDeleteReviewClick}
                        disabled={isReviewRemoving}>
                    {
                        isReviewRemoving
                            ? <Spinner size={14} color="#555770"/>
                            : <Icon type={IconType.DELETE}/>
                    }
                    Delete review
                </Button>
            }

            {
                !isLoading && !userAuthorized && onLoginClick &&
                <Button className="login" onClick={onLoginClick}>
                    <Icon type={IconType.LOGIN}/>Sign in for review
                </Button>
            }

            {
                userAuthorized && onLogOutClick &&
                <Button styleType={ButtonType.SECONDARY} className="logout" onClick={onLogOutClick}>
                    <Icon type={IconType.LOGOUT}/>Logout
                </Button>
            }
        </div>
    );
}
