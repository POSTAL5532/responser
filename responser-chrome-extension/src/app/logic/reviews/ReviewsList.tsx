import React, {useContext, UIEvent} from "react";
import {observer} from "mobx-react";
import Skeleton from "react-loading-skeleton";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import ReviewCard from "./review-card/ReviewCard";
import {Review} from "../../model/Review";
import {ReviewLike} from "../../model/ReviewLike";
import {Icon, IconType} from "../../components/icon/Icon";
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
    blur?: boolean;
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
        blur = false,
    } = props;
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const className = classNames("reviews-list-container", {"blur": blur});

    if (isLoading) {
        return (
            <div className={className}>
                <Skeleton height={90} count={3} className="cards-skeleton"/>
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
            blur={blur}
            key={review.id}
            review={review}
            underlining={index < (reviews.length - 1)}
            currentUser={currentUser}
            createLike={createLike}
            updateLike={updateLike}
            removeLike={removeLike}
            onShareReviewClick={() => console.log("On share click")}/>;
    }

    return (
        <div className={className} onScroll={onScroll}>
            <div className="reviews-list">
                {reviews.map(mapReviewCard)}
            </div>

            {isNextReviewsLoading && <Spinner/>}

            <ConditionShow condition={reviews.length < 1}>
                <NoReviews/>
            </ConditionShow>

            <BlurPanel active={blur} className="bottom-blur"/>
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
