import {Review} from "../../model/Review";
import React from "react";
import {observer} from "mobx-react";
import classNames from "classnames";
import {Rating} from "../../components/rating/Rating";
import "./ReviewsList.less";

type ReviewsListProps = {
    currentUserReview: Review;
    reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = (props: ReviewsListProps) => {
    const {reviews, currentUserReview} = props;

    const reviewsCardsList = (review: Review) => {
        return <ReviewsCard review={review} isCurrentUserReview={false}/>;
    }

    return (
        <div className="reviews">
            {!!currentUserReview && <ReviewsCard review={currentUserReview} isCurrentUserReview={true}/>}
            {reviews.map(reviewsCardsList)}
        </div>
    );
}

export default observer(ReviewsList)

type ReviewsCardProps = {
    review: Review;
    isCurrentUserReview?: boolean;
}

const ReviewsCard: React.FC<ReviewsCardProps> = (props: ReviewsCardProps) => {
    const {review: {user, rating, text, creationDate, reviewLikes}, isCurrentUserReview} = props;
    const className = classNames("review", {"current-user": isCurrentUserReview});

    const positives = [];
    const negatives = [];

    reviewLikes.forEach(rl => {
        if (rl.positive) {
            positives.push(rl)
        } else {
            negatives.push(rl)
        }
    })

    return (
        <div className={className}>
            <div className="user-name">
                {user.firstName} {user.lastName} <span className="you">{isCurrentUserReview ? "(you)" : null}</span>
            </div>
            <div className="rating-container"><Rating value={rating} readonly={true}/></div>
            <div className="text">{text}</div>
            <div className="published">{creationDate.format("MMM Do YY, h:mm a")}</div>
            <div className="reactions">
                <div className="positive">+ {positives.length}</div>
                <div className="negative">- {negatives.length}</div>
            </div>
        </div>
    );
}