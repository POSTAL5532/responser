import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react";
import {useReviewsPageStore} from "./ReviewsPageStore";
import ReviewsList from "./ReviewsList";
import {Button} from "../../components/button/Button";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {Page} from "../../components/page/Page";
import {navigateTo} from "../../utils/NavigationUtils";
import {getEditReviewPageUrl, getNewReviewPageUrl} from "../edit-review/EditReviewPage";
import "./ReviewsPage.less";

export const REVIEWS_PAGE_URL = "/reviews";

const ReviewsPage: React.FC = () => {
    const {currentUser, isLoading} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {
        domain,
        resource,
        reviews,
        currentUserReview,
        init,
        createReviewLike,
        updateReviewLike,
        removeReviewLike,
        removeReview
    } = useReviewsPageStore();

    useEffect(() => {
        if (!isLoading) init(currentUser?.id);
    }, [isLoading]);

    const navigateToLeaveNewReview = () => {
        navigateTo(getNewReviewPageUrl(resource.id));
    }

    const navigateToEditReview = () => {
        navigateTo(getEditReviewPageUrl(currentUserReview.id));
    }

    const onButtonClick = () => {
        if (!currentUser) return;

        if (currentUserReview) {
            navigateToEditReview();
        } else {
            navigateToLeaveNewReview();
        }
    }

    const getButtonText = (): string => {
        if (!currentUser) return "SignIn for review";

        return currentUserReview ? "Edit you review" : "Leave review";
    };

    const reviewsList = currentUserReview ? [currentUserReview, ...reviews] : reviews;

    return (
        <Page className="reviews-page">
            <div className="header">
                {domain ? <div className="domain">{domain.domain}</div> : "LOADING..."}
                {resource ? <div className="resource">{resource.name}</div> : "LOADING..."}
            </div>

            <ReviewsList reviews={reviewsList}
                         createLike={createReviewLike}
                         updateLike={updateReviewLike}
                         removeLike={removeReviewLike}
                         onRemove={removeReview}/>

            <div className="leave-review-container">
                <Button disabled={!currentUser} onClick={onButtonClick}>{getButtonText()}</Button>
            </div>
        </Page>
    );
}

export default observer(ReviewsPage);
