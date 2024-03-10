import React from "react";
import {Button, ButtonType} from "../../../components/button/Button";
import {Icon, IconType} from "../../../components/icon/Icon";
import {AppFooter} from "../../../components/app-footer/AppFooter";
import {ConditionShow} from "../../../components/ConditionShow";
import {SortingSubmenu} from "./SortingSubmenu";
import {SortingWrapper} from "../ReviewsPageStore";
import {FilterSubmenu} from "./FilterSubmenu";
import {ShareReviewSubmenu} from "./ShareReviewSubmenu";
import "./ReviewsFooter.less";
import ApplicationProperties from "../../../service/ApplicationProperties";

type ReviewsFooterProps = {
    userAuthorized: boolean;
    hasUserReview: boolean;
    onEditReviewClick: () => void;
    onAddReviewClick: () => void;
    onDeleteReviewClick: () => void;
    onLoginClick: () => void;
    onLogOutClick: () => void;
    isLoading: boolean;
    isReviewRemoving: boolean;

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

    onSubmenuCloseClick: () => void;
}

export const ReviewsFooter: React.FC<ReviewsFooterProps> = (props: ReviewsFooterProps) => {
    const {
        userAuthorized,
        hasUserReview,
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

        onSubmenuCloseClick,

        isLoading,
        isReviewRemoving
    } = props;

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
    };

    const showSubmenu = showSorting || showFilter || showShare;
    const isClipboardAvailable = !!navigator && !!navigator.clipboard && !!navigator.clipboard.writeText

    return (
        <AppFooter className="reviews-footer" submenu={footerSubmenu()} showSubmenu={showSubmenu} onSubmenuCloseClick={onSubmenuCloseClick}>
            <>
                <ConditionShow condition={userAuthorized && !hasUserReview && !!onAddReviewClick && !showSubmenu}>
                    <Button className="add-review" onClick={onAddReviewClick} disabled={isReviewRemoving || isLoading} styleType={ButtonType.PRIMARY}>
                        <Icon type={IconType.PLUS}/> Add review
                    </Button>
                </ConditionShow>

                <ConditionShow condition={userAuthorized && hasUserReview && !!onEditReviewClick && !showSubmenu}>
                    <Button className="edit-review" onClick={onEditReviewClick} disabled={isReviewRemoving || isLoading} styleType={ButtonType.PRIMARY}>
                        <Icon type={IconType.EDIT}/> Edit review
                    </Button>
                </ConditionShow>

                <ConditionShow condition={userAuthorized && hasUserReview && !!onDeleteReviewClick && !showSubmenu}>
                    <Button className="delete-review" onClick={onDeleteReviewClick} disabled={isReviewRemoving || isLoading} loading={isReviewRemoving}>
                        <Icon type={IconType.REMOVE}/> Delete review
                    </Button>
                </ConditionShow>

                <ConditionShow condition={!userAuthorized && !!onLoginClick && !showSubmenu}>
                    <Button className="login" onClick={onLoginClick} styleType={ButtonType.PRIMARY} disabled={isLoading}>
                        <Icon type={IconType.LOGIN}/> Log in
                    </Button>
                </ConditionShow>

                <ConditionShow condition={showSorting || showFilter}>
                    <Button className="apply-sorting-filter" onClick={onApplySortingFilter} styleType={ButtonType.PRIMARY}>Apply</Button>
                </ConditionShow>

                <ConditionShow condition={showShare && isClipboardAvailable}>
                    <Button className="copy-review-link"
                            onClick={() => navigator?.clipboard?.writeText?.(ApplicationProperties.reviewWebLinkUrl + "/" + shareReviewId)}
                            styleType={ButtonType.PRIMARY}>
                        <Icon type={IconType.CLIPBOARD}/> Copy link
                    </Button>
                </ConditionShow>

                <ConditionShow condition={!showSubmenu}>
                    <div className="additional-controls">
                        <Button onClick={onOpenFilterClick} styleType={ButtonType.LITE} disabled={isLoading}><Icon type={IconType.SETTINGS}/></Button>
                        <Button onClick={onOpenSortingClick} styleType={ButtonType.LITE} disabled={isLoading}><Icon type={IconType.SORTING}/></Button>

                        <ConditionShow condition={userAuthorized && !!onLogOutClick}>
                            <Button className="logout" styleType={ButtonType.LITE} onClick={onLogOutClick}>
                                <Icon type={IconType.LOGOUT}/>
                            </Button>
                        </ConditionShow>
                    </div>
                </ConditionShow>
            </>
        </AppFooter>
    );
}
