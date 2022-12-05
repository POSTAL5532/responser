import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useEditReviewPageStore} from "./EditReviewPageStore";
import {navigateTo} from "../../utils/NavigationUtils";
import {REVIEWS_PAGE_URL} from "../reviews/ReviewsPage";
import EditReviewForm from "./EditReviewForm";
import {useQuery} from "../../../router";
import {Page} from "../../components/page/Page";
import "./EditReviewPage.less";

type EditReviewPageProps = {
    reviewId: string;
    resourceId: string;
}

const EditReviewPage: React.FC<EditReviewPageProps> = observer((props: EditReviewPageProps) => {
    const {reviewId, resourceId} = props;
    const store = useEditReviewPageStore();
    const {init, reviewData, saveReview} = store;

    useEffect(() => {
        init(reviewId, resourceId);
    }, [reviewId]);

    const onCancelClick = () => {
        navigateTo(REVIEWS_PAGE_URL);
    }

    const onSubmit = async () => {
        await saveReview();
        navigateTo(REVIEWS_PAGE_URL);
    }

    return (
        <Page className="edit-review-page">
            <div className="header">Create new review</div>
            <EditReviewForm reviewData={reviewData} onSubmit={onSubmit} onCancel={onCancelClick}/>
        </Page>
    );
});

export const EDIT_REVIEW_PAGE_URL = "/edit-review";

export const getEditReviewPageUrl = (reviewId: string) => {
    return `${EDIT_REVIEW_PAGE_URL}?reviewId=${reviewId}`;
};

export const getNewReviewPageUrl = (resourceId: string) => {
    return `${EDIT_REVIEW_PAGE_URL}?resourceId=${resourceId}`;
};

export const editReviewPageRender = () => {
    const query = useQuery();
    return <EditReviewPage reviewId={query.get("reviewId")} resourceId={query.get("resourceId")}/>;
}
