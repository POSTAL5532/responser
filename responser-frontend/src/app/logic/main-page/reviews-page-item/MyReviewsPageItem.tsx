import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {ConditionShow} from "../../../components/ConditionShow";
import {Button, ButtonType} from "../../../components/button/Button";
import {Review} from "../../../model/Review";
import ReviewCard from "../review-card/ReviewCard";
import {SortingWrapper, useMyReviewsPageItem} from "./MyReviewsPageItemStore";
import {Icon, IconType} from "../../../components/icon/Icon";
import {GlobalAppStore, GlobalAppStoreContext} from "../../../GlobalAppStore";
import {PageName} from "../../../components/page-name/PageName";
import {Spinner} from "../../../components/spinner/Spinner";
import {InputField} from "../../../components/form/input-field/InputField";
import {SortingDropdown} from "./SortingDropdown";
import {FilterDropdown} from "./FilterDropdown";
import classNames from "classnames";
import "./MyReviewsPageItem.less";

const MyReviewsPageItem: React.FC = () => {
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const [showBlurSorting, setShowBlurSorting] = useState(false);
    const [showBlurFilter, setShowBlurFilter] = useState(false);

    const {
        init,
        reviews,
        reviewsRequestCriteria,
        setCriteriaSorting,
        loadReviews,
        loadNextReviews,
        hasNextReviews,
        loadingState
    } = useMyReviewsPageItem();

    const {isReviewsLoading, isNextReviewsLoading} = loadingState;

    useEffect(() => {
        if (!!currentUser) {
            init(currentUser.id);
        }
    }, [currentUser]);

    const mapReviewCard = (review: Review) => {
        return <ReviewCard key={review.id} review={review} currentUser={currentUser}/>;
    }

    const currentSortingValue = new SortingWrapper(reviewsRequestCriteria.sortingField, reviewsRequestCriteria.sortDirection);
    const onRatingChange = (range: number[]) => {
        reviewsRequestCriteria.minRating = Math.trunc(range[0]);
        reviewsRequestCriteria.maxRating = Math.trunc(range[1]);
    }

    return (
        <div className="page-item my-reviews-page-item">
            <PageName>My reviews</PageName>

            <div className="filter-form">
                <InputField className="search-filed" rightExtraComponent={<Button styleType={ButtonType.PRIMARY}>Search</Button>}/>

                <div className="sorting-filter-container">
                    <SortingDropdown
                        currentSortingValue={currentSortingValue}
                        setCriteriaSorting={setCriteriaSorting}
                        onDropdownStateChange={setShowBlurSorting}
                        loadReviews={loadReviews}/>

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
                        <Button onClick={loadNextReviews} loading={isNextReviewsLoading} disabled={isNextReviewsLoading}>Load more reviews</Button>
                    </div>
                </ConditionShow>

                <BlurPanel active={showBlurSorting || showBlurFilter}/>
            </div>
        </div>
    );
}

export default observer(MyReviewsPageItem);

const NoReviews: React.FC = () => {
    return (
        <div className="no-reviews">
            <Icon type={IconType.EMPTY}/>
            <span className="label">Create a first review.</span>
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
