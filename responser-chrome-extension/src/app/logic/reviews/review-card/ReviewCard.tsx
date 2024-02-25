import React, {useState} from "react";
import {observer} from "mobx-react";
import {ReactComponent as UserIcon} from './user.svg';
import {Review} from "../../../model/Review";
import {User} from "../../../model/User";
import classNames from "classnames";
import {Rating} from "../../../components/rating/Rating";
import {Reaction} from "../../../components/reaction/Reaction";
import {ReviewLike} from "../../../model/ReviewLike";
import {ConditionShow} from "../../../components/ConditionShow";
import {useIsOverflow} from "../../../utils/LayoutUtils";
import {Spinner} from "../../../components/spinner/Spinner";
import ApplicationProperties from "../../../service/ApplicationProperties";
import userAvatarPlaceHolder from "../../../../images/user-avatar-placeholder.png";
import "./ReviewCard.less";

type ReviewCardProps = {
    review: Review;
    currentUser?: User;
    createLike: (review: Review, positive: boolean) => Promise<void>;
    updateLike: (reviewLike: ReviewLike, positive: boolean) => Promise<void>;
    removeLike: (reviewLike: ReviewLike) => Promise<void>;
}

const ReviewCard: React.FC<ReviewCardProps> = (props: ReviewCardProps) => {
    const {review, currentUser, createLike, updateLike, removeLike} = props;
    const {user, rating, text, creationDate, reviewLikes} = review;
    const isCurrentUserReview = currentUser && currentUser.id === user.id;
    const className = classNames("review-card", {"current-user": isCurrentUserReview});

    const [expanded, setExpanded] = useState<boolean>(false);
    const [wasOverflowed, setWasOverflowed] = useState<boolean>(false);
    const [likeInProcess, setLikeInProcess] = useState<boolean>(false);
    const textRef = React.useRef<HTMLDivElement>();

    useIsOverflow(textRef, (hasOverflow) => {
        if (hasOverflow) setWasOverflowed(true)
    });

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
        setLikeInProcess(true);

        if (!currentUserReviewLike) {
            createLike(review, positive).finally(() => setLikeInProcess(false));
            return;
        }

        if (currentUserReviewLike.positive === positive) {
            removeLike(currentUserReviewLike).finally(() => setLikeInProcess(false));
            return;
        }

        updateLike(currentUserReviewLike, positive).finally(() => setLikeInProcess(false));
    }

    const userAvatar = user.avatarFileName
        ? ApplicationProperties.userAvatarsStorageUrl + "/" + user.avatarFileName
        : userAvatarPlaceHolder;

    return (
        <div className={className}>
            <div className="card-header">
                <img src={userAvatar} alt="user-avatar" className="user-avatar"/>
                <div className="user-name">{user.fullName}</div>
                <ConditionShow condition={isCurrentUserReview}>
                    <UserIcon className="user-icon"/>
                </ConditionShow>
                <div className="published">{creationDate.format("MMM Do YY")}</div>
                <Rating value={rating} readonly={true}/>
            </div>

            <div className={classNames("text", {"expanded": expanded})} ref={textRef}>{text}</div>

            <div className="card-footer">
                <Reaction count={positives.length}
                          positive={true}
                          currentUserReacted={currentUserReviewLike?.positive}
                          disabled={likeInProcess || !currentUser}
                          onClick={onReaction}/>
                <Reaction count={negatives.length}
                          positive={false}
                          currentUserReacted={currentUserReviewLike && !currentUserReviewLike.positive}
                          disabled={likeInProcess || !currentUser}
                          onClick={onReaction}/>

                <ConditionShow condition={likeInProcess}>
                    <Spinner size={14} color="#555770"/>
                </ConditionShow>

                <ConditionShow condition={wasOverflowed}>
                    <div className="show-more" onClick={() => setExpanded(!expanded)}>
                        {expanded ? "show less" : "show more"}
                    </div>
                </ConditionShow>
            </div>
        </div>
    );
}

export default observer(ReviewCard);
