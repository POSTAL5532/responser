import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react";
import {useLocation} from "react-router";
import {useEditReviewPageStore} from "./EditReviewPageStore";
import {navigateTo} from "../../utils/NavigationUtils";
import {navigateToReviewsPage} from "../reviews/ReviewsPage";
import EditReviewForm from "./form/EditReviewForm";
import Page from "../../components/page/Page";
import {ResourceType} from "../../model/ResourceType";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {EditReviewFooter} from "./footer/EditReviewFooter";
import "./EditReviewPage.less";

const EditReviewPage: React.FC = () => {
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {
        reviewId,
        pageId,
        domainId,
        previousResourceType
    } = useLocation<NavigateStateProps>().state;

    const editReviewPageStore = useEditReviewPageStore();
    const {reviewData, isNewReview, loadingState} = editReviewPageStore;

    useEffect(() => {
        editReviewPageStore.init(currentUser.id, reviewId, pageId, domainId);
    }, [reviewId, pageId, domainId]);

    const onCancel = () => {
        navigateToReviewsPage({resourceType: previousResourceType});
    }

    const onSubmit = async () => {
        await editReviewPageStore.saveReview();
        navigateToReviewsPage({resourceType: editReviewPageStore.currentResourceType});
    }

    const getHeaderText = () => {
        if (!reviewData) return;

        let text: string[] = [isNewReview ? "Create" : "Edit"];

        if (editReviewPageStore.currentResourceType === ResourceType.SITE) {
            text.push("site");
        } else if (editReviewPageStore.currentResourceType === ResourceType.PAGE) {
            text.push("page")
        }

        text.push("review");

        return text.join(" ");
    }

    const onCurrentResourceTypeChange = (resourceType: ResourceType) => {
        editReviewPageStore.currentResourceType = resourceType;
    }

    return (
        <Page className="edit-review-page">
            <div className="header">
                <span>{getHeaderText()}</span>
            </div>

            <EditReviewForm reviewData={reviewData}
                            isNewReview={isNewReview}
                            currentResourceType={editReviewPageStore.currentResourceType}
                            onCurrentResourceTypeChange={onCurrentResourceTypeChange}
                            userLeftSiteReview={editReviewPageStore.userLeftSiteReview}
                            userLeftPageReview={editReviewPageStore.userLeftPageReview}
                            isLoading={!reviewData || loadingState.isDataInitialization}
                            isDataSubmitting={loadingState.isDataSubmitting}/>

            <EditReviewFooter onSubmit={onSubmit}
                              onCancel={onCancel}
                              isNewReview={isNewReview}
                              submitDisabled={!reviewData?.text || !editReviewPageStore.currentResourceType}
                              isDataSubmitting={loadingState.isDataSubmitting}/>
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
