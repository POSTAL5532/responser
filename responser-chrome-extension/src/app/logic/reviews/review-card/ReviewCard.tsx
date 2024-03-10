import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {observer} from "mobx-react";
import {Review} from "../../../model/Review";
import {Rating} from "../../../components/rating/Rating";
import {ConditionShow} from "../../../components/ConditionShow";
import {useIsOverflow} from "../../../utils/LayoutUtils";
import {Button} from "../../../components/button/Button";
import {Reaction} from "../../../components/reaction/Reaction";
import {ReviewLike} from "../../../model/ReviewLike";
import {User} from "../../../model/User";
import {Icon, IconType} from "../../../components/icon/Icon";
import {getUserAvatarUrl} from "../../../utils/ResourcesUtils";
import {BlurPanel} from "../../../components/blur-panel/BlurPanel";
import "./ReviewCard.less";

type ReviewCardProps = {
    review: Review;
    className?: string;
    currentUser: User;
    underlining: boolean;
    blur: boolean;

    onCreateLikeClick: (review: Review, positive: boolean) => Promise<void>;
    onUpdateLikeClick: (reviewLike: ReviewLike, positive: boolean) => Promise<void>;
    onRemoveLikeClick: (reviewLike: ReviewLike) => Promise<void>;
    onShareReviewClick: (review: Review) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = (props: ReviewCardProps) => {
    const {
        review,
        className,
        currentUser,
        onCreateLikeClick,
        onUpdateLikeClick,
        onRemoveLikeClick,
        onShareReviewClick,
        underlining,
        blur
    } = props;

    const {user, creationDate, rating, text, reviewLikes} = review;
    const isCurrentUserReview = currentUser && currentUser.id === user.id;

    const [expanded, setExpanded] = useState<boolean>(false);
    const [wasOverflowed, setWasOverflowed] = useState<boolean>(false);
    const [likeInProcess, setLikeInProcess] = useState<boolean>(false);

    const textRef = useRef<HTMLDivElement>();
    const cardRef = useRef<HTMLDivElement>(null);

    useIsOverflow(textRef, (hasOverflow) => {
        if (hasOverflow) setWasOverflowed(true)
    });

    const resultClassName = classNames("review-card", {"underlining": underlining, "current-user-review": isCurrentUserReview}, className);

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
            onCreateLikeClick?.(review, positive).finally(() => setLikeInProcess(false));
            return;
        }

        if (currentUserReviewLike.positive === positive) {
            onRemoveLikeClick?.(currentUserReviewLike).finally(() => setLikeInProcess(false));
            return;
        }

        onUpdateLikeClick?.(currentUserReviewLike, positive).finally(() => setLikeInProcess(false));
    }

    const onShareReviewClickListener = () => {
        onShareReviewClick(review);
        if (!!cardRef) {
            cardRef.current.scrollIntoView({block: "start", behavior: "smooth"});
        }
    }

    return (
        <div className={resultClassName} ref={cardRef}>
            <div className="card-header">
                <div className="user-info-container">
                    <img className="user-avatar" src={getUserAvatarUrl(user)} alt={user.fullName}/>
                    <div className="user-data">
                        <span className="user-name">{user.fullName}</span>
                        <span className="review-date">{creationDate.format("MMM Do YY")}</span>
                    </div>
                </div>

                <Rating value={rating} readonly={true}/>
            </div>

            <div className={classNames("review-text", {"expanded": expanded})} ref={textRef}>{text}</div>

            <div className="card-footer">
                <ConditionShow condition={wasOverflowed}>
                    <Button className="show-more" onClick={() => setExpanded(!expanded)}>
                        {expanded ? "show less" : "show more"}
                    </Button>
                </ConditionShow>

                <div className="actions-container">
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

                    <Button className="share-button" onClick={onShareReviewClickListener}><Icon type={IconType.SEND}/></Button>
                </div>
            </div>

            <BlurPanel active={blur} className="review-card-blur"/>
        </div>
    )
}

export default observer(ReviewCard);
