import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react";
import {useReviewsPageStore} from "./ReviewsPageStore";
import ReviewsList from "./ReviewsList";
import {Button} from "../../components/button/Button";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {Page} from "../../components/page/Page";
import {navigateTo} from "../../utils/NavigationUtils";
import {getEditReviewPageUrl, getNewReviewPageUrl} from "../edit-review/EditReviewPage";
import {ResourceType} from "../../model/ResourceType";
import {useQuery} from "../../../router";
import {ConditionShow} from "../../components/ConditionShow";
import "./ReviewsPage.less";

export const REVIEWS_PAGE_URL = "/reviews";


type ReviewsPageProps = {
    resourceType: ResourceType;
}

const ReviewsPage: React.FC<ReviewsPageProps> = observer((props: ReviewsPageProps) => {
    const {resourceType} = props;
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
        if (!isLoading) init(resourceType, currentUser?.id);
    }, [isLoading]);

    const navigateToLeaveNewReview = () => {
        navigateTo(getNewReviewPageUrl(page.id));
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
                    <div className="resource-type-buttons">
                        <Button outlined={true} onClick={() => changeResourceType(ResourceType.SITE)} active={reviewsResourceType === ResourceType.SITE}>
                            Site reviews
                        </Button>
                        <Button outlined={true} onClick={() => changeResourceType(ResourceType.PAGE)} active={reviewsResourceType === ResourceType.PAGE}>
                            Page reviews
                        </Button>
                    </div>
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
});

export const getReviewsPageUrl = (resourceType: ResourceType = ResourceType.PAGE) => {
    return `${REVIEWS_PAGE_URL}?resourceType=${resourceType}`;
};

export const reviewsPageRender = () => {
    const rawResourceType = useQuery().get("resourceType") || ResourceType.PAGE;
    const resourceType: ResourceType = ResourceType[rawResourceType as keyof typeof ResourceType];
    return <ReviewsPage resourceType={resourceType}/>;
}
