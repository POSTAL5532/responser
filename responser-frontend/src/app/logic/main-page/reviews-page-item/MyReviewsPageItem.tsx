import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react";
import classNames from "classnames";
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
import ReviewCard from "../../../components/review-card/ReviewCard";
import {PageItem} from "../PageItem";
import EditReviewModal from "./EditReviewModal";
import {RemoveReviewConfirmationModal} from "./RemoveReviewConfirmationModal";
import "./MyReviewsPageItem.less";

type MyReviewsPageItemProps = {
    hidden: boolean;
}

const MyReviewsPageItem: React.FC<MyReviewsPageItemProps> = (props: MyReviewsPageItemProps) => {
    const {hidden} = props;

    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const [showBlurSorting, setShowBlurSorting] = useState(false);
    const [showBlurFilter, setShowBlurFilter] = useState(false);
    const [showEditReviewModal, setShowEditReviewModal] = useState(false);

    const myReviewsPageIteStore = useMyReviewsPageItem();

    const {
        init,
        reviews,
        editingReview,
        editingReviewData,
        reviewForDelete,
        totalReviewsCount,
        reviewsRequestCriteria,
        hasNextReviews,
        loadingState,
        setCriteriaSorting,
        loadReviews,
        loadNextReviews,
        initReviewForEdit,
        cleanEditingData,
        updateReview,
        createReviewLike,
        updateReviewLike,
        setReviewForDelete,
        clearReviewForDelete,
        removeReview,
        removeReviewLike,
    } = myReviewsPageIteStore;

    const {
        isReviewsLoading,
        isNextReviewsLoading,
        isEditingReviewLoading,
        isEditingReviewSaving,
        isReviewRemoving,
        hasAnyLoading
    } = loadingState;

    useEffect(() => {
        if (!!currentUser) init(currentUser.id);
    }, [currentUser]);

    const currentSortingValue = new SortingWrapper(reviewsRequestCriteria.sortingField, reviewsRequestCriteria.sortDirection);

    const onRatingChange = (range: number[]) => {
        reviewsRequestCriteria.minRating = Math.trunc(range[0]);
        reviewsRequestCriteria.maxRating = Math.trunc(range[1]);
    }

    const onEditReviewClick = (reviewId: string) => {
        setShowEditReviewModal(true);
        initReviewForEdit(reviewId);
    }

    const onUpdateReview = () => {
        updateReview().finally(() => setShowEditReviewModal(false));
    }

    const onEditModalClose = () => {
        setShowEditReviewModal(false)
        cleanEditingData();
    }

    const mapReviewCard = (review: Review, index: number, array: Review[]) => {
        return <ReviewCard
            key={review.id}
            review={review}
            currentUser={currentUser}
            createLike={createReviewLike}
            updateLike={updateReviewLike}
            removeLike={removeReviewLike}
            underlining={index < array.length - 1}
            onEditReviewClick={onEditReviewClick}
            onRemoveReviewClick={setReviewForDelete}/>;
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

            <EditReviewModal
                show={showEditReviewModal}
                editingReview={editingReview}
                editingReviewData={editingReviewData}
                onClose={onEditModalClose}
                onSave={onUpdateReview}
                reviewIsLoading={isEditingReviewLoading}
                reviewIsSaving={isEditingReviewSaving}/>

            <RemoveReviewConfirmationModal
                removing={isReviewRemoving}
                show={!!reviewForDelete}
                onClose={clearReviewForDelete}
                onConfirm={removeReview}/>
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
