import React, {useContext} from "react";
import {observer} from "mobx-react";
import Skeleton from "react-loading-skeleton";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import ReviewCard from "./review-card/ReviewCard";
import {Review} from "../../model/Review";
import {ReviewLike} from "../../model/ReviewLike";
import {Icon, IconType} from "../../components/icon/Icon";
import {ConditionShow} from "../../components/ConditionShow";
import {User} from "../../model/User";
import {Button} from "../../components/button/Button";
import "./ReviewsList.less";

type ReviewsListProps = {
    reviews: Review[];
    createLike?: (review: Review, positive: boolean) => Promise<void>;
    updateLike?: (reviewLike: ReviewLike, positive: boolean) => Promise<void>;
    removeLike?: (reviewLike: ReviewLike) => Promise<void>;
    hasNextReviews: boolean;
    loadNextReviews: () => Promise<void>;
    isLoading: boolean;
    isNextReviewsLoading: boolean;
    dontUseCurrentUser?: boolean;
    disableReactions?: boolean;
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
        dontUseCurrentUser,
        disableReactions,
        hasNextReviews
    } = props;

    let currentUser: User;

    if (!dontUseCurrentUser) {
        currentUser = useContext<GlobalAppStore>(GlobalAppStoreContext).currentUser;
    }

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
                           removeLike={removeLike}
                           disableReactions={disableReactions}/>;
    }

    return (
        <div className={className}>
            {reviews.map(mapReviewCard)}

            <ConditionShow condition={reviews.length < 1}>
                <NoReviews/>
            </ConditionShow>

            <ConditionShow condition={reviews.length > 0 && hasNextReviews}>
                <div className="load-next-reviews">
                    <Button onClick={loadNextReviews} loading={isNextReviewsLoading} disabled={isNextReviewsLoading}>Load more reviews</Button>
                </div>
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
