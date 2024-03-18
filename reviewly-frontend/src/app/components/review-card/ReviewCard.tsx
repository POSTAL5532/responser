import React, {useState} from "react";
import {Review} from "../../model/Review";
import classNames from "classnames";
import {ResourceType} from "../../model/ResourceType";
import {UrlUtils} from "../../utils/UrlUtils";
import {Rating} from "../rating/Rating";
import {Link} from "../link/Link";
import {ConditionShow} from "../ConditionShow";
import {useIsOverflow} from "../../utils/LayoutUtils";
import {Button} from "../button/Button";
import {Reaction} from "../reaction/Reaction";
import {ReviewLike} from "../../model/ReviewLike";
import {User} from "../../model/User";
import {Icon, IconType} from "../icon/Icon";
import {observer} from "mobx-react";
import {getWebResourceIconUrl} from "../../utils/ResourcesUtils";
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

    onEditReviewClick?: (reviewId: string) => void;
    onRemoveReviewClick?: (review: Review) => void;
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
        onEditReviewClick,
        onRemoveReviewClick,
        onShareReviewClick,
        underlining = true
    } = props;

    const {id, webResource, creationDate, rating, text, reviewLikes} = review;

    const [expanded, setExpanded] = useState<boolean>(false);
    const [wasOverflowed, setWasOverflowed] = useState<boolean>(false);
    const [likeInProcess, setLikeInProcess] = useState<boolean>(false);

    const textRef = React.useRef<HTMLDivElement>();

    useIsOverflow(textRef, (hasOverflow) => {
        if (hasOverflow) setWasOverflowed(true)
    });

    const resultClassName = classNames("review-card", {"underlining": underlining}, className);
    const webResourceHost = UrlUtils.getHostFromWebResource(webResource);

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
                <div className="resource-info-container">
                    <img className="resource-icon" src={getWebResourceIconUrl(webResource)} alt={webResourceHost}/>
                    <div className="domain-date">
                        <span className="resource-domain">{webResourceHost}</span>
                        <span className="review-date">{creationDate.format("MMM Do YY")}</span>
                    </div>
                </div>

                <div className={classNames("resource-type", (webResource.resourceType.toLowerCase() + "-type"))}>
                    {webResource.resourceType === ResourceType.SITE ? "Site review" : "Page review"}
                </div>

                <Rating value={rating} readonly={true}/>
            </div>

            <Link className="resource-link" href={webResource.url} target="_blank">{webResource.url}</Link>

            <div className={classNames("review-text", {"expanded": expanded})} ref={textRef}>{text}</div>

            <div className="card-footer">
                <ConditionShow condition={wasOverflowed}>
                    <Button className="show-more" onClick={() => setExpanded(!expanded)}>
                        {expanded ? "show less" : "show more"}
                    </Button>
                </ConditionShow>

                <div className="actions-container">
                    <ConditionShow condition={!!onRemoveReviewClick}>
                        <Button className="remove-review" onClick={() => onRemoveReviewClick(review)}><Icon type={IconType.REMOVE}/> Remove</Button>
                    </ConditionShow>

                    <ConditionShow condition={!!onEditReviewClick}>
                        <Button className="edit-review" onClick={() => onEditReviewClick(id)}><Icon type={IconType.EDIT}/> Edit</Button>
                    </ConditionShow>

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
