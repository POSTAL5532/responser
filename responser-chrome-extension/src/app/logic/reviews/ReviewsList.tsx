import React, {useContext} from "react";
import {observer} from "mobx-react";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import ReviewCard from "./ReviewCard";
import {Review} from "../../model/Review";
import {ReviewLike} from "../../model/ReviewLike";
import "./ReviewsList.less";

type ReviewsListProps = {
    reviews: Review[];
    createLike: (review: Review, positive: boolean) => void;
    updateLike: (reviewLike: ReviewLike, positive: boolean) => void;
    removeLike: (reviewLike: ReviewLike) => void;
    onRemove?: (review: Review) => void;
}

const ReviewsList: React.FC<ReviewsListProps> = (props: ReviewsListProps) => {
    const {reviews, createLike, updateLike, removeLike, onRemove} = props;
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);

    const mapReviewCard = (review: Review) => {
        return <ReviewCard key={review.id}
                           review={review}
                           currentUser={currentUser}
                           createLike={createLike}
                           updateLike={updateLike}
                           removeLike={removeLike}
                           onRemove={onRemove}/>;
    }

    return (
        <div className="reviews">
            {reviews.map(mapReviewCard)}
        </div>
    );
}

export default observer(ReviewsList)
