import React, {useContext, useEffect} from "react";
import {useLocation} from "react-router";
import {observer} from "mobx-react";
import {useReviewsPageStore} from "./ReviewsPageStore";
import ReviewsList from "./ReviewsList";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import Page from "../../components/page/Page";
import {navigateToEditReviewPage} from "../edit-review/EditReviewPage";
import {ResourceType} from "../../model/ResourceType";
import {navigateTo} from "../../utils/NavigationUtils";
import {ReviewsHeader} from "./header/ReviewsHeader";
import {ReviewsFooter} from "./footer/ReviewsFooter";
import {useExtensionService} from "../../service/extension/ExtensionService";
import "./ReviewsPage.less";

const ReviewsPage: React.FC = () => {
    const locationState = useLocation<NavigateStateProps>().state;
    const extensionService = useExtensionService();
    const {currentUser, userDataLoading} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {
        site,
        page,
        reviews,
        currentUserReview,
        reviewsResourceType,
        init,
        createReviewLike,
        updateReviewLike,
        removeReviewLike,
        removeUserReview,
        loadNextReviews,
        currentPageInfo,
        loadingState
    } = useReviewsPageStore();

    const {
        isSiteLoading,
        isPageLoading,
        isReviewRemoving,
        isReviewsLoading,
        isNextReviewsLoading
    } = loadingState;

    useEffect(() => {
        if (!userDataLoading) init(locationState?.resourceType, currentUser?.id);
    }, [userDataLoading]);

    const onEditReviewClick = () => {
        navigateToEditReviewPage({
            reviewId: currentUserReview.id,
            pageId: page.id,
            domainId: site.id,
            previousResourceType: reviewsResourceType
        });
    }

    const onAddReviewClick = () => {
        navigateToEditReviewPage({
            pageId: page.id,
            domainId: site.id,
            previousResourceType: reviewsResourceType
        });
    }

    const changeResourceType = (resourceType: ResourceType) => {
        init(resourceType, currentUser?.id);
    }

    const reviewsList = currentUserReview ? [currentUserReview, ...reviews] : reviews;

    return (
        <Page className="reviews-page">
            <ReviewsHeader reviewsResourceType={reviewsResourceType}
                           resource={reviewsResourceType === ResourceType.PAGE ? page : site}
                           isLoading={(!page && !site) || isSiteLoading || isPageLoading}
                           isReviewsLoading={(!page && !site) || isSiteLoading || isPageLoading || isReviewsLoading}
                           onResourceTypeChange={changeResourceType}
                           pageInfo={currentPageInfo}/>

            <ReviewsList reviews={reviewsList}
                         createLike={createReviewLike}
                         updateLike={updateReviewLike}
                         removeLike={removeReviewLike}
                         loadNextReviews={loadNextReviews}
                         isNextReviewsLoading={isNextReviewsLoading}
                         isLoading={(!page && !site) || isReviewsLoading || isSiteLoading || isPageLoading}/>

            <ReviewsFooter userAuthorized={!!currentUser}
                           hasUserReview={!!currentUserReview}
                           onEditReviewClick={onEditReviewClick}
                           onAddReviewClick={onAddReviewClick}
                           onDeleteReviewClick={removeUserReview}
                           onLoginClick={extensionService.openLoginPage}
                           onLogOutClick={extensionService.openLogoutPage}
                           isLoading={(!page && !site) || isReviewsLoading || isSiteLoading || isPageLoading}
                           isReviewRemoving={isReviewRemoving}/>
        </Page>
    );
}

export default observer(ReviewsPage);

export const REVIEWS_PAGE_URL = "/reviews";

type NavigateStateProps = {
    resourceType?: ResourceType;
}
export const navigateToReviewsPage = (props?: NavigateStateProps) => {
    navigateTo(REVIEWS_PAGE_URL, props);
}
