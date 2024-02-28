import React, {useState} from "react";
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
import "./ReviewCard.less";

type ReviewCardProps = {
    review: Review;
    className?: string;
    currentUser?: User;
    disableReactions?: boolean;
    underlining?: boolean;

    createLike?: (review: Review, positive: boolean) => Promise<void>;
    updateLike?: (reviewLike: ReviewLike, positive: boolean) => Promise<void>;
    removeLike?: (reviewLike: ReviewLike) => Promise<void>;
    onShareReviewClick: (review: Review) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = (props: ReviewCardProps) => {
    const {
        review,
        className,
        currentUser,
        disableReactions,
        createLike,
        updateLike,
        removeLike,
        onShareReviewClick,
        underlining = true
    } = props;

    const {user, creationDate, rating, text, reviewLikes} = review;

    const [expanded, setExpanded] = useState<boolean>(false);
    const [wasOverflowed, setWasOverflowed] = useState<boolean>(false);
    const [likeInProcess, setLikeInProcess] = useState<boolean>(false);

    const textRef = React.useRef<HTMLDivElement>();

    useIsOverflow(textRef, (hasOverflow) => {
        if (hasOverflow) setWasOverflowed(true)
    });

    const resultClassName = classNames("review-card", {"underlining": underlining}, className);

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
            createLike?.(review, positive).finally(() => setLikeInProcess(false));
            return;
        }

        if (currentUserReviewLike.positive === positive) {
            removeLike?.(currentUserReviewLike).finally(() => setLikeInProcess(false));
            return;
        }

        updateLike?.(currentUserReviewLike, positive).finally(() => setLikeInProcess(false));
    }

    return (
        <div className={resultClassName}>
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
                              disabled={disableReactions || likeInProcess || !currentUser}
                              onClick={onReaction}/>
                    <Reaction count={negatives.length}
                              positive={false}
                              currentUserReacted={currentUserReviewLike && !currentUserReviewLike.positive}
                              disabled={disableReactions || likeInProcess || !currentUser}
                              onClick={onReaction}/>

                    <Button className="share-button" onClick={() => onShareReviewClick(review)}><Icon type={IconType.SEND}/></Button>
                </div>
            </div>
        </div>
    )
}

export default observer(ReviewCard);
