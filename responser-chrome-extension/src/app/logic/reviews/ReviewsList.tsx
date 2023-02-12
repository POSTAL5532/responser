import React, {useContext} from "react";
import {observer} from "mobx-react";
import Skeleton from "react-loading-skeleton";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import ReviewCard from "./review-card/ReviewCard";
import {Review} from "../../model/Review";
import {ReviewLike} from "../../model/ReviewLike";
import {Icon, IconType} from "../../components/icon/Icon";
import {ConditionShow} from "../../components/ConditionShow";
import {useBottomScrollListener} from "react-bottom-scroll-listener";
import "./ReviewsList.less";

type ReviewsListProps = {
    reviews: Review[];
    createLike: (review: Review, positive: boolean) => Promise<void>;
    updateLike: (reviewLike: ReviewLike, positive: boolean) => Promise<void>;
    removeLike: (reviewLike: ReviewLike) => Promise<void>;
    isLoading?: boolean;
}

const ReviewsList: React.FC<ReviewsListProps> = (props: ReviewsListProps) => {
    const {reviews, createLike, updateLike, removeLike, isLoading} = props;
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const scrollRef = useBottomScrollListener<HTMLDivElement>(() => console.log("SCROLLED!"));
    const className = "reviews";

    if (isLoading) {
        return (
            <div className={className}>
                <Skeleton height={90} count={3} className="cards-skeleton"/>
            </div>
        );
    }

    const mapReviewCard = (review: Review) => {
        return <ReviewCard key={review.id}
                           review={review}
                           currentUser={currentUser}
                           createLike={createLike}
                           updateLike={updateLike}
                           removeLike={removeLike}/>;
    }

    return (
        <div className={className} ref={scrollRef}>
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
