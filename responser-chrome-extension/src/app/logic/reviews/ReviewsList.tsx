import {Review} from "../../model/Review";
import React, {useContext} from "react";
import {observer} from "mobx-react";
import classNames from "classnames";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {Rating} from "../../components/rating/Rating";
import "./ReviewsList.less";

type ReviewsListProps = {
    reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = (props: ReviewsListProps) => {
    const context = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {reviews} = props;

    const reviewsCardsList = (review: Review) => {
        const isCurrentUserReview = review.user.id === context.currentUser?.id;
        return <ReviewsCard review={review} isCurrentUserReview={isCurrentUserReview}/>;
    }

    return (
        <div className="reviews">
            {reviews.map(reviewsCardsList)}
        </div>
    );
}

export default observer(ReviewsList)

type ReviewsCardProps = {
    review: Review;
    isCurrentUserReview: boolean;
}

const ReviewsCard: React.FC<ReviewsCardProps> = (props: ReviewsCardProps) => {
    const {review: {user, rating, text, creationDate}, isCurrentUserReview} = props;
    const className = classNames("review", {"current-user": isCurrentUserReview});

    return (
        <div className={className}>
            <div className="user-name">{user.firstName} {user.lastName} {isCurrentUserReview ? "(you)" : null}</div>
            <div className="rating-container"><Rating value={rating} readonly={true}/></div>
            <div className="text">{text}</div>
            <div className="published">{creationDate.toString()}</div>
        </div>
    );
}