import React from "react";
import {observer} from "mobx-react";
import {Button} from "antd";
import {navigateTo} from "../../../utils/NavigationUtils";
import {CREATE_FAKE_REVIEW_PAGE_URL} from "../create-fake-review-page/CreateFakeReviewPage";

export const REVIEWS_PAGE_URL = "/reviews";

const ReviewsPage: React.FC = () => {
    return (
        <div className="reviews-page">
            <Button onClick={() => {
                console.log(CREATE_FAKE_REVIEW_PAGE_URL);
                navigateTo(CREATE_FAKE_REVIEW_PAGE_URL);
            }}>Create review</Button>
        </div>
    );
}

export default observer(ReviewsPage);
