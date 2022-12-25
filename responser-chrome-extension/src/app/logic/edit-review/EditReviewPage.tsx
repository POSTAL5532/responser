import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react";
import {useLocation} from "react-router";
import {useEditReviewPageStore} from "./EditReviewPageStore";
import {navigateTo} from "../../utils/NavigationUtils";
import {navigateToReviewsPage} from "../reviews/ReviewsPage";
import EditReviewForm from "./EditReviewForm";
import {Page} from "../../components/page/Page";
import {ConditionShow} from "../../components/ConditionShow";
import {ResourceType} from "../../model/ResourceType";
import {Button} from "../../components/button/Button";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import "./EditReviewPage.less";

const EditReviewPage: React.FC = () => {
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {reviewId, pageId, domainId, previousResourceType} = useLocation<NavigateStateProps>().state;
    const store = useEditReviewPageStore();
    const {init, reviewData, saveReview, isNewReview, userLeftSiteReview, userLeftPageReview} = store;

    useEffect(() => {
        init(currentUser.id, reviewId, pageId, domainId);
    }, [reviewId, pageId, domainId]);

    const onCancel = () => {
        navigateToReviewsPage({resourceType: previousResourceType});
    }

    const onSubmit = async () => {
        await saveReview();
        navigateToReviewsPage({resourceType: reviewData.resourceType});
    }

    const getHeaderText = () => {
        if (!reviewData) return;

        let text: string[] = [isNewReview ? "Create" : "Edit"];

        if (reviewData.resourceType === ResourceType.SITE) {
            text.push("site");
        } else if (reviewData.resourceType === ResourceType.PAGE) {
            text.push("page")
        }

        text.push("review");

        return text.join(" ");
    }

    return (
        <Page className="edit-review-page">
            <div className="header">
                <div>{getHeaderText()}</div>
                <Button onClick={onCancel} outlined={true}>Cancel</Button>
            </div>
            <ConditionShow condition={!!reviewData}>
                <EditReviewForm reviewData={reviewData}
                                onSubmit={onSubmit}
                                isNewReview={isNewReview}
                                userLeftSiteReview={userLeftSiteReview}
                                userLeftPageReview={userLeftPageReview}/>
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
