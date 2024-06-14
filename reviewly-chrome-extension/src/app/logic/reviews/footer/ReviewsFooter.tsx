import React from "react";
import {Button, ButtonType} from "../../../components/button/Button";
import {Icon, IconType} from "../../../components/icon/Icon";
import {AppFooter} from "../../../components/app-footer/AppFooter";
import {ConditionShow} from "../../../components/ConditionShow";
import {SortingSubmenu} from "./SortingSubmenu";
import {SortingWrapper} from "../ReviewsPageStore";
import {FilterSubmenu} from "./FilterSubmenu";
import {ShareReviewSubmenu} from "./ShareReviewSubmenu";
import ApplicationProperties from "../../../service/ApplicationProperties";
import {ResourceType} from "../../../model/ResourceType";
import {ConfirmReviewRemoving} from "./ConfirmReviewRemoving";
import {User} from "../../../model/User";
import {Tooltip, TooltipPosition} from "../../../components/tooltip/Tooltip";
import "./ReviewsFooter.less";

type ReviewsFooterProps = {
    currentUser: User;
    hasUserReview: boolean;
    onEditReviewClick: () => void;
    onAddReviewClick: () => void;
    onDeleteReviewClick: () => void;
    onLoginClick: () => void;
    onLogOutClick: () => void;
    isLoading: boolean;
    isReviewRemoving: boolean;
    currentResourceType: ResourceType;

    onOpenSortingClick: () => void;
    showSorting: boolean;
    currentSortingValue: SortingWrapper;
    setCriteriaSorting: (sorting: SortingWrapper) => void;

    onOpenFilterClick: () => void;
    showFilter: boolean;
    minRating: number;
    maxRating: number;
    onRatingRangeChange: (values: number[]) => void;

    onApplySortingFilter: () => void;

    showShare: boolean;
    shareReviewId: string;

    showConfirmReviewRemoving: boolean;
    removeUserReview: () => void;

    onSubmenuCloseClick: () => void;
}

export const ReviewsFooter: React.FC<ReviewsFooterProps> = (props: ReviewsFooterProps) => {
    const {
        currentUser,
        hasUserReview,
        currentResourceType,
        onEditReviewClick,
        onAddReviewClick,
        onDeleteReviewClick,
        onLoginClick,
        onLogOutClick,

        onOpenSortingClick,
        showSorting,
        currentSortingValue,
        setCriteriaSorting,

        onOpenFilterClick,
        showFilter,
        minRating,
        maxRating,
        onRatingRangeChange,

        onApplySortingFilter,

        showShare,
        shareReviewId,

        showConfirmReviewRemoving,
        removeUserReview,

        onSubmenuCloseClick,

        isLoading,
        isReviewRemoving
    } = props;

    const userAuthorized = !!currentUser;
    const userEmailConfirmed = userAuthorized && currentUser.emailConfirmed;
    const isBlocked = !!currentUser && currentUser.isBlocked;

    const footerSubmenu = (): JSX.Element => {
        if (showSorting) {
            return <SortingSubmenu currentSortingValue={currentSortingValue} setCriteriaSorting={setCriteriaSorting}/>
        }

        if (showFilter) {
            return <FilterSubmenu minRating={minRating} maxRating={maxRating} onRatingRangeChange={onRatingRangeChange}/>
        }

        if (showShare) {
            return <ShareReviewSubmenu reviewId={shareReviewId}/>;
        }

        if (showConfirmReviewRemoving || isReviewRemoving) {
            return <ConfirmReviewRemoving currentResourceType={currentResourceType}/>;
        }
    };

    const showSubmenu = showSorting || showFilter || showShare || showConfirmReviewRemoving;
    const isClipboardAvailable = !!navigator && !!navigator.clipboard && !!navigator.clipboard.writeText

    return (
        <AppFooter className="reviews-footer" submenu={footerSubmenu()} showSubmenu={showSubmenu}>
            <ConditionShow condition={userAuthorized && !hasUserReview && !!onAddReviewClick && !showSubmenu}>
                <Tooltip content="Users with not conformed emails can't add reviews. Please confirm your email in profile page."
                         show={userEmailConfirmed ? false : undefined}
                         position={TooltipPosition.TOP}
                         className="email-not-confirmed-tooltip">
                    <Button className="add-review" onClick={onAddReviewClick} disabled={isLoading || !userEmailConfirmed || isBlocked} styleType={ButtonType.PRIMARY}>
                        <Icon type={IconType.PLUS}/> Add review
                    </Button>
                </Tooltip>
            </ConditionShow>

            <ConditionShow condition={userAuthorized && hasUserReview && !!onEditReviewClick && !showSubmenu}>
                <Tooltip content="Users with not conformed emails can't edit reviews. Please confirm your email in profile page."
                         show={userEmailConfirmed ? false : undefined}
                         position={TooltipPosition.TOP}
                         className="email-not-confirmed-tooltip">
                    <Button className="edit-review" onClick={onEditReviewClick} disabled={isLoading || !userEmailConfirmed || isBlocked} styleType={ButtonType.PRIMARY}>
                        <Icon type={IconType.EDIT}/> Edit review
                    </Button>
                </Tooltip>
            </ConditionShow>

            <ConditionShow condition={userAuthorized && hasUserReview && !!onDeleteReviewClick && !showSubmenu}>
                <Button className="delete-review" onClick={onDeleteReviewClick} disabled={isLoading || isBlocked}>
                    <Icon type={IconType.REMOVE}/>Delete review
                </Button>
            </ConditionShow>

            <ConditionShow condition={!userAuthorized && !!onLoginClick && !showSubmenu}>
                <Button className="login" onClick={onLoginClick} styleType={ButtonType.PRIMARY} disabled={isLoading}>
                    <Icon type={IconType.LOGIN}/>Log in
                </Button>
            </ConditionShow>

            <ConditionShow condition={showSorting || showFilter}>
                <Button className="apply-sorting-filter" onClick={onApplySortingFilter} styleType={ButtonType.PRIMARY}>
                    <Icon type={IconType.CHECK}/>Apply
                </Button>
            </ConditionShow>

            <ConditionShow condition={showShare && isClipboardAvailable}>
                <Button className="copy-review-link"
                        onClick={() => navigator?.clipboard?.writeText?.(ApplicationProperties.reviewWebLinkUrl + "/" + shareReviewId)}
                        styleType={ButtonType.PRIMARY}>
                    <Icon type={IconType.CLIPBOARD}/>Copy link
                </Button>
            </ConditionShow>

            <ConditionShow condition={showConfirmReviewRemoving}>
                <Button className="remove-review" onClick={removeUserReview} styleType={ButtonType.PRIMARY} disabled={isReviewRemoving} loading={isReviewRemoving}>
                    <Icon type={IconType.CHECK}/>Remove
                </Button>
            </ConditionShow>

            <ConditionShow condition={showSubmenu}>
                <Button className="close-submenu" onClick={onSubmenuCloseClick} disabled={isReviewRemoving}><Icon type={IconType.CLOSE}/>
                    {showConfirmReviewRemoving ? "Cancel" : "Close"}
                </Button>
            </ConditionShow>

            <ConditionShow condition={!showSubmenu}>
                <div className="additional-controls">
                    <Tooltip content="Filter" position={TooltipPosition.TOP} className="filter-sorting-tooltip">
                        <Button onClick={onOpenFilterClick} styleType={ButtonType.LITE} disabled={isLoading}>
                            <Icon type={IconType.SETTINGS}/>
                        </Button>
                    </Tooltip>
                    <Tooltip content="Sorting" position={TooltipPosition.TOP} className="filter-sorting-tooltip">
                        <Button onClick={onOpenSortingClick} styleType={ButtonType.LITE} disabled={isLoading}>
                            <Icon type={IconType.SORTING}/>
                        </Button>
                    </Tooltip>

                    <ConditionShow condition={userAuthorized && !!onLogOutClick}>
                        <Button className="logout" styleType={ButtonType.LITE} onClick={onLogOutClick}>
                            <Icon type={IconType.LOGOUT}/>
                        </Button>
                    </ConditionShow>
                </div>
            </ConditionShow>
        </AppFooter>
    );
}
