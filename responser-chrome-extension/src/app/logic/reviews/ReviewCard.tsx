import React from "react";
import {Review} from "../../model/Review";
import {User} from "../../model/User";
import classNames from "classnames";
import {Rating} from "../../components/rating/Rating";
import {Reaction} from "../../components/reaction/Reaction";
import {observer} from "mobx-react";
import {ReviewLike} from "../../model/ReviewLike";
import {Remove} from "../../components/remove/Remove";
import {ConditionShow} from "../../components/ConditionShow";

type ReviewCardProps = {
    review: Review;
    currentUser?: User;
    createLike: (review: Review, positive: boolean) => void;
    updateLike: (reviewLike: ReviewLike, positive: boolean) => void;
    removeLike: (reviewLike: ReviewLike) => void;
    onRemove?: (review: Review) => void;
}


const ReviewCard: React.FC<ReviewCardProps> = (props: ReviewCardProps) => {
    const {review, currentUser, createLike, updateLike, removeLike, onRemove} = props;
    const {user, rating, text, creationDate, reviewLikes} = review;
    const isCurrentUserReview = currentUser && currentUser.id === user.id;
    const className = classNames("review", {"current-user": isCurrentUserReview});

    const positives = [];
    const negatives = [];
    let currentUserReviewLike: ReviewLike;

    reviewLikes.forEach(reviewLike => {
        if (reviewLike.positive) {
            positives.push(reviewLike);
        } else {
            negatives.push(reviewLike)
        }

        if (reviewLike.userId === currentUser?.id) {
            currentUserReviewLike = reviewLike;
        }
    });

    const onReaction = (positive: boolean) => {
        if (!currentUserReviewLike) {
            createLike(review, positive);
            return;
        }

        if (currentUserReviewLike.positive === positive) {
            removeLike(currentUserReviewLike);
            return;
        }

        updateLike(currentUserReviewLike, positive);
    }

    return (
        <div className={className}>
            <div className="card-header">
                <div className="user-name">
                    {user.firstName} {user.lastName} <span className="you">{isCurrentUserReview ? "(you)" : null}</span>
                </div>
                <ConditionShow condition={isCurrentUserReview}>
                    <Remove onClick={() => onRemove?.(review)}/>
                </ConditionShow>
            </div>
            <div className="rating-container"><Rating value={rating} readonly={true}/></div>
            <div className="text">{text}</div>
            <div className="published">{creationDate.format("MMM Do YY, h:mm a")}</div>
            <div className="reactions">
                <Reaction count={positives.length}
                          positive={true}
                          currentUserReacted={currentUserReviewLike?.positive}
                          disabled={!currentUser}
                          onClick={onReaction}/>
                <Reaction count={negatives.length}
                          positive={false}
                          currentUserReacted={currentUserReviewLike && !currentUserReviewLike.positive}
                          disabled={!currentUser}
                          onClick={onReaction}/>
            </div>
        </div>
    );
}

export default observer(ReviewCard);
