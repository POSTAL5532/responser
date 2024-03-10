import React, {useContext, UIEvent} from "react";
import {observer} from "mobx-react";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import ReviewCard from "./review-card/ReviewCard";
import {Review} from "../../model/Review";
import {ReviewLike} from "../../model/ReviewLike";
import {ConditionShow} from "../../components/ConditionShow";
import {Spinner} from "../../components/spinner/Spinner";
import {BlurPanel} from "../../components/blur-panel/BlurPanel";
import classNames from "classnames";
import "./ReviewsList.less";

type ReviewsListProps = {
    reviews: Review[];
    createLike: (review: Review, positive: boolean) => Promise<void>;
    updateLike: (reviewLike: ReviewLike, positive: boolean) => Promise<void>;
    removeLike: (reviewLike: ReviewLike) => Promise<void>;
    loadNextReviews: () => Promise<void>;
    isLoading: boolean;
    isNextReviewsLoading: boolean;
    onShareReviewClick: (review: Review) => void;
    blurAll: boolean;
    blur: (review: Review) => boolean;
}

const ReviewsList: React.FC<ReviewsListProps> = (props: ReviewsListProps) => {
    const {
        reviews,
        createLike,
        updateLike,
        removeLike,
        isLoading,
        loadNextReviews,
        isNextReviewsLoading,
        onShareReviewClick,
        blurAll,
        blur
    } = props;

    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const className = classNames("reviews-list-container", {"blur": blurAll});

    if (isLoading) {
        return (
            <div className={className}>
                <Spinner className="reviews-loading"/>
            </div>
        );
    }

    const onScroll = (event: UIEvent<HTMLDivElement>) => {
        const targetElement = event.target as HTMLDivElement;
        const result = targetElement.scrollHeight - targetElement.scrollTop;
        const isBottom = Math.floor(result) === targetElement.clientHeight;

        if (isBottom) {
            loadNextReviews();
        }
    }

    const mapReviewCard = (review: Review, index: number) => {
        return <ReviewCard
            blur={blur(review)}
            key={review.id}
            review={review}
            underlining={index < (reviews.length - 1)}
            currentUser={currentUser}
            onCreateLikeClick={createLike}
            onUpdateLikeClick={updateLike}
            onRemoveLikeClick={removeLike}
            onShareReviewClick={onShareReviewClick}/>;
    }

    return (
        <div className={className} onScroll={onScroll}>
            <div className="reviews-list">
                {reviews.map(mapReviewCard)}

                <ConditionShow condition={reviews.length < 1}>
                    <div className="no-reviews"><span>No reviews yet...</span></div>
                </ConditionShow>

                <ConditionShow condition={isNextReviewsLoading}>
                    <div className="next-reviews-loading-container">
                        <Spinner className="next-reviews-loading"/>
                    </div>
                </ConditionShow>
            </div>

            <BlurPanel active={blurAll} className="bottom-blur"/>
        </div>
    );
}

export default observer(ReviewsList);
