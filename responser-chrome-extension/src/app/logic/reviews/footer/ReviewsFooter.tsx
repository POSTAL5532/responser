import React, {useState} from "react";
import {Button, ButtonType} from "../../../components/button/Button";
import {Icon, IconType} from "../../../components/icon/Icon";
import {Spinner} from "../../../components/spinner/Spinner";
import {AppFooter} from "../../../components/app-footer/AppFooter";
import {ConditionShow} from "../../../components/ConditionShow";
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
    isReviewRemoving: boolean;

    onCheck: () => void;
    showCheck: boolean;
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
        onCheck,
        isLoading,
        isReviewRemoving,
        showCheck
    } = props;

    const footerSubmenu = (): JSX.Element => (
        <p style={{margin: 0}}>
            Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata
            Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata Tratata
        </p>
    );

    return (
        <AppFooter className="reviews-footer" submenu={footerSubmenu()} showSubmenu={showCheck}>
            <>
                <Button onClick={onCheck}>Check</Button>

                <ConditionShow condition={!isLoading && userAuthorized && !hasUserReview && !!onAddReviewClick}>
                    <Button className="add-review" onClick={onAddReviewClick} disabled={isReviewRemoving}>
                        <Icon type={IconType.PLUS}/>Add review
                    </Button>
                </ConditionShow>

                <ConditionShow condition={!isLoading && userAuthorized && hasUserReview && !!onEditReviewClick}>
                    <Button className="edit-review" onClick={onEditReviewClick} disabled={isReviewRemoving}>
                        <Icon type={IconType.EDIT}/>Edit review
                    </Button>
                </ConditionShow>

                <ConditionShow condition={!isLoading && userAuthorized && hasUserReview && !!onDeleteReviewClick}>
                    <Button className="delete-review" onClick={onDeleteReviewClick} disabled={isReviewRemoving}>
                        {isReviewRemoving ? <Spinner size={14} color="#555770"/> : <Icon type={IconType.REMOVE}/>} Delete review
                    </Button>
                </ConditionShow>

                <ConditionShow condition={!isLoading && !userAuthorized && !!onLoginClick}>
                    <Button className="login" onClick={onLoginClick} styleType={ButtonType.PRIMARY}>
                        <Icon type={IconType.LOGIN}/>Sign in for review
                    </Button>
                </ConditionShow>

                <ConditionShow condition={userAuthorized && !!onLogOutClick}>
                    <Button className="logout" onClick={onLogOutClick}>
                        <Icon type={IconType.LOGOUT}/>Logout
                    </Button>
                </ConditionShow>
            </>
        </AppFooter>
    );
}
