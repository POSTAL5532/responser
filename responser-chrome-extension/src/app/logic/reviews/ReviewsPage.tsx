import React, {useContext, useEffect} from "react";
import {useLocation} from "react-router";
import {observer} from "mobx-react";
import {useReviewsPageStore} from "./ReviewsPageStore";
import ReviewsList from "./ReviewsList";
import {Button} from "../../components/button/Button";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {Page} from "../../components/page/Page";
import {navigateToEditReviewPage} from "../edit-review/EditReviewPage";
import {ResourceType} from "../../model/ResourceType";
import {ConditionShow} from "../../components/ConditionShow";
import {navigateTo} from "../../utils/NavigationUtils";
import {ButtonRadioGroup} from "../../components/button-radio-group/ButtonRadioGroup";
import "./ReviewsPage.less";

const ReviewsPage: React.FC = () => {
    const locationState = useLocation<NavigateStateProps>().state;
    const {currentUser, isLoading} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {
        domain,
        page,
        reviews,
        currentUserReview,
        reviewsResourceType,
        init,
        createReviewLike,
        updateReviewLike,
        removeReviewLike,
        removeReview
    } = useReviewsPageStore();

    useEffect(() => {
        if (!isLoading) init(locationState?.resourceType, currentUser?.id);
    }, [isLoading]);

    const onButtonClick = () => {
        if (!currentUser) return;

        if (currentUserReview) {
            navigateToEditReviewPage({
                reviewId: currentUserReview.id,
                pageId: page.id,
                domainId: domain.id,
                previousResourceType: reviewsResourceType
            });
        } else {
            navigateToEditReviewPage({
                pageId: page.id,
                domainId: domain.id,
                previousResourceType: reviewsResourceType
            });
        }
    }

    const changeResourceType = (resourceType: ResourceType) => {
        init(resourceType, currentUser?.id);
    }

    const getButtonText = (): string => {
        if (!currentUser) return "SignIn for review";
        return currentUserReview ? "Edit you review" : "Leave review";
    };

    const reviewsList = currentUserReview ? [currentUserReview, ...reviews] : reviews;

    return (
        <Page className="reviews-page">
            <div className="header">
                {!isLoading && domain ? <div className="domain-info">{domain.domain}</div> : "LOADING..."}
                {!isLoading && page ? <div className="page-info">{page.name}</div> : "LOADING..."}

                <ConditionShow condition={!isLoading && !!reviewsResourceType}>
                    <ButtonRadioGroup<ResourceType> values={[
                        {value: ResourceType.SITE, label: "Site"},
                        {value: ResourceType.PAGE, label: "Page"}
                    ]} currentValue={reviewsResourceType} onChange={changeResourceType}/>
                </ConditionShow>
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

export const REVIEWS_PAGE_URL = "/reviews";

type NavigateStateProps = {
    resourceType?: ResourceType;
}
export const navigateToReviewsPage = (props?: NavigateStateProps) => {
    navigateTo(REVIEWS_PAGE_URL, props);
}
