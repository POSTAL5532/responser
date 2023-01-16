import React, {useContext} from "react";
import {observer} from "mobx-react";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import ReviewCard from "./review-card/ReviewCard";
import {Review} from "../../model/Review";
import {ReviewLike} from "../../model/ReviewLike";
import {Icon, IconType} from "../../components/icon/Icon";
import {ConditionShow} from "../../components/ConditionShow";
import "./ReviewsList.less";

type ReviewsListProps = {
    reviews: Review[];
    createLike: (review: Review, positive: boolean) => void;
    updateLike: (reviewLike: ReviewLike, positive: boolean) => void;
    removeLike: (reviewLike: ReviewLike) => void;
}

const ReviewsList: React.FC<ReviewsListProps> = (props: ReviewsListProps) => {
    const {reviews, createLike, updateLike, removeLike} = props;
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);

    const mapReviewCard = (review: Review) => {
        return <ReviewCard key={review.id}
                           review={review}
                           currentUser={currentUser}
                           createLike={createLike}
                           updateLike={updateLike}
                           removeLike={removeLike}/>;
    }

    return (
        <div className="reviews">
            {reviews.map(mapReviewCard)}
            <ConditionShow condition={reviews.length < 1}>
                <NoReviews/>
            </ConditionShow>
        </div>
    );
}

export default observer(ReviewsList);

const NoReviews: React.FC = () => {
    return (
        <div className="no-reviews">
            <Icon type={IconType.EMPTY}/>
            <span className="label">Create a first review.</span>
        </div>
    );
}
