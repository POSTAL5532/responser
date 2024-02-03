import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {ConditionShow} from "../../../components/ConditionShow";
import {Button, ButtonType} from "../../../components/button/Button";
import {Review} from "../../../model/Review";
import {SortingWrapper, useMyReviewsPageItem} from "./MyReviewsPageItemStore";
import {Icon, IconType} from "../../../components/icon/Icon";
import {GlobalAppStore, GlobalAppStoreContext} from "../../../GlobalAppStore";
import {PageName} from "../../../components/page-name/PageName";
import {Spinner} from "../../../components/spinner/Spinner";
import {InputField} from "../../../components/form/input-field/InputField";
import {SortingDropdown} from "./SortingDropdown";
import {FilterDropdown} from "./FilterDropdown";
import classNames from "classnames";
import ReviewCard from "../../../components/review-card/ReviewCard";
import {PageItem} from "../PageItem";
import "./MyReviewsPageItem.less";

type MyReviewsPageItemProps = {
    hidden: boolean;
}

const MyReviewsPageItem: React.FC<MyReviewsPageItemProps> = (props: MyReviewsPageItemProps) => {
    const {hidden} = props;

    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const [showBlurSorting, setShowBlurSorting] = useState(false);
    const [showBlurFilter, setShowBlurFilter] = useState(false);

    const {
        init,
        reviews,
        totalReviewsCount,
        reviewsRequestCriteria,
        setCriteriaSorting,
        loadReviews,
        loadNextReviews,
        hasNextReviews,
        loadingState
    } = useMyReviewsPageItem();

    const {isReviewsLoading, isNextReviewsLoading, hasAnyLoading} = loadingState;

    useEffect(() => {
        if (!!currentUser) {
            init(currentUser.id);
        }
    }, [currentUser]);

    const mapReviewCard = (review: Review, index: number, array: Review[]) => {
        return <ReviewCard key={review.id} review={review} currentUser={currentUser} underlining={index < array.length - 1}/>;
    }

    const currentSortingValue = new SortingWrapper(reviewsRequestCriteria.sortingField, reviewsRequestCriteria.sortDirection);
    const onRatingChange = (range: number[]) => {
        reviewsRequestCriteria.minRating = Math.trunc(range[0]);
        reviewsRequestCriteria.maxRating = Math.trunc(range[1]);
    }

    return (
        <PageItem hidden={hidden} className="my-reviews-page-item">
            <PageName>My reviews</PageName>

            <div className="filter-form">
                <InputField
                    disabled={hasAnyLoading}
                    className="search-filed"
                    placeholder="Enter URL"
                    rightExtraComponent={<Button styleType={ButtonType.PRIMARY} disabled={hasAnyLoading}><Icon type={IconType.SEARCH}/>Search</Button>}/>

                <div className="sorting-filter-container">
                    <SortingDropdown
                        disabled={hasAnyLoading}
                        currentSortingValue={currentSortingValue}
                        setCriteriaSorting={setCriteriaSorting}
                        onDropdownStateChange={setShowBlurSorting}
                        loadReviews={loadReviews}/>

                    <p className="total-reviews-count">{totalReviewsCount} reviews</p>

                    <FilterDropdown
                        currentResourceTypeValue={reviewsRequestCriteria.resourceType}
                        onResourceTypeChange={value => reviewsRequestCriteria.resourceType = value}
                        minRating={reviewsRequestCriteria.minRating}
                        maxRating={reviewsRequestCriteria.maxRating}
                        onRatingRangeChange={onRatingChange}
                        onDropdownStateChange={setShowBlurFilter}
                        loadReviews={loadReviews}/>
                </div>
            </div>

            <div className="reviews-list">
               {isReviewsLoading ? <div className="reviews-loading"><Spinner/></div> : reviews.map(mapReviewCard)}

                <ConditionShow condition={!isReviewsLoading && reviews.length < 1}>
                    <NoReviews/>
                </ConditionShow>

                <ConditionShow condition={reviews.length > 0 && hasNextReviews}>
                    <div className="load-next-reviews">
                        <Button onClick={loadNextReviews} loading={isNextReviewsLoading} disabled={hasAnyLoading}>Load more reviews</Button>
                    </div>
                </ConditionShow>

                <BlurPanel active={showBlurSorting || showBlurFilter}/>
            </div>
        </PageItem>
    );
}

export default observer(MyReviewsPageItem);

const NoReviews: React.FC = () => {
    return (
        <div className="no-reviews">
            <span className="text">No reviews.</span>
            <span className="text">Try to change filter settings.</span>
        </div>
    );
}


type BlurPanel = {
    active: boolean;
}

const BlurPanel: React.FC<BlurPanel> = ({active}: BlurPanel) => {
    return (
        <div className={classNames("blur-panel", {"active": active})}></div>
    );
}
