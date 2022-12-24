import React, {useEffect} from "react";
import {observer} from "mobx-react";
import { useLocation} from "react-router";
import {useEditReviewPageStore} from "./EditReviewPageStore";
import {navigateTo} from "../../utils/NavigationUtils";
import {navigateToReviewsPage} from "../reviews/ReviewsPage";
import EditReviewForm from "./EditReviewForm";
import {Page} from "../../components/page/Page";
import {ConditionShow} from "../../components/ConditionShow";
import {ResourceType} from "../../model/ResourceType";
import "./EditReviewPage.less";

const EditReviewPage: React.FC = () => {
    const {reviewId, pageId, domainId, previousResourceType} = useLocation<NavigateStateProps>().state;
    const store = useEditReviewPageStore();
    const {init, reviewData, saveReview, isNewReview} = store;

    useEffect(() => {
        init(reviewId, pageId, domainId);
    }, [reviewId, pageId, domainId]);

    const onCancelClick = () => {
        navigateToReviewsPage({resourceType: previousResourceType});
    }

    const onSubmit = async () => {
        await saveReview();
        navigateToReviewsPage({resourceType: reviewData.resourceType});
    }

    return (
        <Page className="edit-review-page">
            <div className="header">{isNewReview ? "Create" : "Edit your"} review</div>
            <ConditionShow condition={!!reviewData}>
                <EditReviewForm reviewData={reviewData}
                                onSubmit={onSubmit}
                                onCancel={onCancelClick}
                                isNewReview={isNewReview}/>
            </ConditionShow>
        </Page>
    );
}

export default observer(EditReviewPage);

export const EDIT_REVIEW_PAGE_URL = "/edit-review";

type NavigateStateProps = {
    reviewId?: string;
    pageId: string;
    domainId: string;
    previousResourceType?: ResourceType;
}
export const navigateToEditReviewPage = (props: NavigateStateProps) => {
    navigateTo(EDIT_REVIEW_PAGE_URL, props);
}
