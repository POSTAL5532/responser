import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {observer} from "mobx-react";
import {SortingWrapper, useReviewsPageStore} from "./ReviewsPageStore";
import ReviewsList from "./ReviewsList";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import Page from "../../components/page/Page";
import {navigateToEditReviewPage} from "../edit-review/EditReviewPage";
import {ResourceType} from "../../model/ResourceType";
import {navigateTo} from "../../utils/NavigationUtils";
import {ReviewsHeader} from "./header/ReviewsHeader";
import {ReviewsFooter} from "./footer/ReviewsFooter";
import {useExtensionService} from "../../service/extension/ExtensionService";
import {Review} from "../../model/Review";
import "./ReviewsPage.less";

const ReviewsPage: React.FC = () => {
    const locationState = useLocation<NavigateStateProps>().state;
    const extensionService = useExtensionService();
    const {currentUser, userDataLoading} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const reviewsPageStore = useReviewsPageStore();
    const [removeUserReviewConfirmation, setRemoveUserReviewConfirmation] = useState<boolean>(false);

    const {
        site,
        page,
        reviews,
        currentUserReview,
        reviewsResourceType,
        editableSortingCriteria,
        editableFilterCriteria,
        init,
        createReviewLike,
        updateReviewLike,
        removeReviewLike,
        removeUserReview,
        loadReviews,
        loadNextReviews,
        setCriteriaSorting,
        setupEditableSortingCriteria,
        setupEditableFilterCriteria,
        applyEditableCriteria,
        loadingState
    } = reviewsPageStore;

    const {isSiteLoading, isPageLoading, isReviewRemoving, isReviewsLoading, isNextReviewsLoading} = loadingState;
    const currentSortingValue = new SortingWrapper(editableSortingCriteria?.sortingField, editableSortingCriteria?.sortDirection);

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

    const onOpenSortingClick = () => {
        setupEditableSortingCriteria();
    }

    const onOpenFilterClick = () => {
        setupEditableFilterCriteria();
    }

    const onRatingRangeChange = (values: number[]) => {
        editableFilterCriteria.minRating = Math.trunc(values[0]);
        editableFilterCriteria.maxRating = Math.trunc(values[1]);
    }

    const closeSubmenu = () => {
        setupEditableSortingCriteria(null);
        setupEditableFilterCriteria(null);
        reviewsPageStore.reviewIdForShare = null;
        setRemoveUserReviewConfirmation(false);
    }

    const applySortingFilter = () => {
        applyEditableCriteria();
        closeSubmenu();
        loadReviews();
    }

    const changeResourceType = (resourceType: ResourceType) => {
        init(resourceType, currentUser?.id);
    }

    const reviewsList = currentUserReview ? [currentUserReview, ...reviews] : reviews;
    const setHeaderInLoadingState = isSiteLoading || isPageLoading || !page || !site;

    const isCardsBlured = !!editableSortingCriteria || !!editableFilterCriteria || !!reviewsPageStore.reviewIdForShare || removeUserReviewConfirmation;

    const blurCardLogic = (review: Review) => {
        if (!!editableSortingCriteria || !!editableFilterCriteria) {
            return true;
        }

        if (reviewsPageStore.reviewIdForShare) {
            return review.id !== reviewsPageStore.reviewIdForShare;
        }

        if (removeUserReviewConfirmation) {
            return review.id !== currentUserReview?.id;
        }

        return false;
    }

    const removeUserReviewAction = () => {
        removeUserReview().finally(closeSubmenu);
    }

    return (
        <Page className="reviews-page">
            <ReviewsHeader
                reviewsResourceType={reviewsResourceType}
                resource={reviewsResourceType === ResourceType.PAGE ? page : site}
                isLoading={setHeaderInLoadingState}
                isReviewsLoading={(!page && !site) || isSiteLoading || isPageLoading || isReviewsLoading}
                onResourceTypeChange={changeResourceType}/>

            <ReviewsList
                reviews={reviewsList}
                createLike={createReviewLike}
                updateLike={updateReviewLike}
                removeLike={removeReviewLike}
                loadNextReviews={loadNextReviews}
                isNextReviewsLoading={isNextReviewsLoading}
                isLoading={(!page && !site) || isReviewsLoading || isSiteLoading || isPageLoading}
                onShareReviewClick={review => reviewsPageStore.reviewIdForShare = review.id}
                blur={blurCardLogic}
                blurAll={isCardsBlured}
                disableCardControls={isCardsBlured}
                isRemoveReviewConfirmationOpen={removeUserReviewConfirmation}/>

            <ReviewsFooter
                userAuthorized={!!currentUser}
                hasUserReview={!!currentUserReview}
                onEditReviewClick={onEditReviewClick}
                onAddReviewClick={onAddReviewClick}
                onDeleteReviewClick={() => setRemoveUserReviewConfirmation(true)}
                removeUserReview={removeUserReviewAction}
                onLoginClick={extensionService.openLoginPage}
                onLogOutClick={extensionService.openLogoutPage}
                isLoading={(!page && !site) || isReviewsLoading || isSiteLoading || isPageLoading}
                isReviewRemoving={isReviewRemoving}
                currentResourceType={reviewsResourceType}

                showSorting={!!editableSortingCriteria}
                onOpenSortingClick={onOpenSortingClick}
                currentSortingValue={currentSortingValue}
                setCriteriaSorting={setCriteriaSorting}

                showFilter={!!editableFilterCriteria}
                onOpenFilterClick={onOpenFilterClick}
                minRating={editableFilterCriteria?.minRating}
                maxRating={editableFilterCriteria?.maxRating}
                onRatingRangeChange={onRatingRangeChange}

                onApplySortingFilter={applySortingFilter}

                showShare={!!reviewsPageStore.reviewIdForShare}
                shareReviewId={reviewsPageStore.reviewIdForShare}

                showConfirmReviewRemoving={removeUserReviewConfirmation}

                onSubmenuCloseClick={closeSubmenu}/>
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
