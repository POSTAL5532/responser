import React, {useContext, useEffect, useState} from "react";
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
import {ResourceTypeChoiceHeader} from "./edit-review-header/EditReviewHeader";
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
    const [showSecondEditingStep, setShowSecondEditingStep] = useState<boolean>(false);

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

    const onCurrentResourceTypeChange = (resourceType: ResourceType) => {
        editReviewPageStore.currentResourceType = resourceType;
    }

    return (
        <Page className="edit-review-page">
            <ResourceTypeChoiceHeader resourceType={editReviewPageStore.currentResourceType} isNewReview={isNewReview}/>

            <EditReviewForm reviewData={reviewData}
                            isNewReview={isNewReview}
                            currentResourceType={editReviewPageStore.currentResourceType}
                            onCurrentResourceTypeChange={onCurrentResourceTypeChange}
                            userLeftSiteReview={editReviewPageStore.userLeftSiteReview}
                            userLeftPageReview={editReviewPageStore.userLeftPageReview}
                            isLoading={!reviewData || loadingState.isDataInitialization}
                            isDataSubmitting={loadingState.isDataSubmitting}
                            showSecondEditingStep={showSecondEditingStep}/>

            <EditReviewFooter onSubmit={onSubmit}
                              onCancel={onCancel}
                              onNext={() => setShowSecondEditingStep(true)}

                              showSubmitButton={showSecondEditingStep || !isNewReview}
                              showNextButton={!showSecondEditingStep && isNewReview}
                              nextButtonDisabled={!editReviewPageStore.currentResourceType}
                              submitButtonLabel={`${isNewReview ? "Add" : "Save"} review`}
                              submitDisabled={!reviewData?.rating || !reviewData?.text}
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
