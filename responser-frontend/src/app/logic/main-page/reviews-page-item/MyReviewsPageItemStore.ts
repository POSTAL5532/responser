import {useState} from "react";
import {action, computed, makeAutoObservable, runInAction} from "mobx";
import {Logger} from "../../../utils/Logger";
import {ReviewService} from "../../../service/ReviewService";
import {Review} from "../../../model/Review";
import {Pagination} from "../../../model/Pagination";
import {ReviewsRequestCriteria} from "../../../model/ReviewsRequestCriteria";
import {ReviewsCriteriaSortingField} from "../../../model/ReviewsCriteriaSortingField";
import {SortDirection} from "../../../model/SortDirection";
import {ReviewData} from "../../../model/ReviewData";
import {ReviewLike} from "../../../model/ReviewLike";
import {ReviewLikeService} from "../../../service/ReviewLikeService";
import {ReviewLikeData} from "../../../model/ReviewLikeData";

export class MyReviewsPageItemStore {

    public static readonly PAGE_ELEMENTS_COUNT = 10;

    logger: Logger = new Logger("MyReviewsPageItemStore");

    reviewService: ReviewService = new ReviewService();

    reviewLikeService: ReviewLikeService = new ReviewLikeService();

    reviews: Review[] = [];

    editingReview: Review = null;

    editingReviewData: ReviewData = null;

    reviewForDelete: Review = null;

    loadingState: ReviewsPageItemStoreLoadingState = new ReviewsPageItemStoreLoadingState();

    currentPageNumber: number;

    hasNextReviews: boolean;

    totalReviewsCount: number = 0;

    reviewsRequestCriteria: ReviewsRequestCriteria = new ReviewsRequestCriteria();

    constructor() {
        makeAutoObservable(this);
        this.reviewsRequestCriteria.sortingField = ReviewsCriteriaSortingField.CREATION_DATE;
        this.reviewsRequestCriteria.sortDirection = SortDirection.DESC;
        this.reviewsRequestCriteria.resourceType = null;
        this.reviewsRequestCriteria.minRating = 1;
        this.reviewsRequestCriteria.maxRating = 5;
    }

    init = async (currentUserId: string) => {
        this.logger.debug("Init store");

        this.reviewsRequestCriteria.forUserId = currentUserId;
        await this.loadReviews();

        this.logger.debug("Store initialisation finished");
    }

    loadReviews = async () => {
        this.logger.debug("Load reviews");

        this.currentPageNumber = 0;
        this.hasNextReviews = false;
        const pagination = new Pagination(this.currentPageNumber, MyReviewsPageItemStore.PAGE_ELEMENTS_COUNT);

        this.loadingState.isReviewsLoading = true;
        const reviewsResponse = await this.reviewService.getReviews(this.reviewsRequestCriteria, pagination).finally(
            () => runInAction(() => this.loadingState.isReviewsLoading = false)
        );

        this.reviews = reviewsResponse.data;
        this.hasNextReviews = !reviewsResponse.isLast;
        this.totalReviewsCount = reviewsResponse.totalElements;
    }

    loadNextReviews = async () => {
        if (!this.hasNextReviews || this.loadingState.isNextReviewsLoading) return;

        this.logger.debug("Load next reviews");

        const pagination = new Pagination(this.currentPageNumber + 1, MyReviewsPageItemStore.PAGE_ELEMENTS_COUNT);

        this.loadingState.isNextReviewsLoading = true;
        const reviewsResponse = await this.reviewService.getReviews(this.reviewsRequestCriteria, pagination).finally(
            () => runInAction(() => this.loadingState.isNextReviewsLoading = false)
        );

        this.reviews.push(...reviewsResponse.data);
        this.currentPageNumber += 1;
        this.hasNextReviews = !reviewsResponse.isLast;
    }

    initReviewForEdit = async (reviewId: string) => {
        this.logger.debug("Load review for editing:", reviewId, " - begun");

        this.loadingState.isEditingReviewLoading = true;
        this.editingReview = await this.reviewService.getReview(reviewId).finally(
            () => runInAction(() => this.loadingState.isEditingReviewLoading = false)
        );

        this.editingReviewData = new ReviewData();
        this.editingReviewData.resourceId = this.editingReview.resourceId;
        this.editingReviewData.text = this.editingReview.text;
        this.editingReviewData.rating = this.editingReview.rating;

        this.logger.debug("Load review for editing:", reviewId, " - finish");
    }

    updateReview = async () => {
        this.logger.debug("Update editing review:", this.editingReview.id, " - begun");

        this.loadingState.isEditingReviewSaving = true;
        console.log(this.editingReviewData);

        const updatedReview: Review = await this.reviewService.updateReview(this.editingReview.id, this.editingReviewData).finally(
            () => runInAction(() => this.loadingState.isEditingReviewSaving = false)
        );

        const reviewIndex = this.reviews.findIndex(review => review.id === updatedReview.id);
        this.reviews[reviewIndex] = updatedReview;

        this.logger.debug("Update editing review:", this.editingReview.id, " - finish");
    }

    createReviewLike = async (review: Review, positive: boolean): Promise<void> => {
        this.logger.debug("Create review like: review id=", review.id, ", positive=", positive);
        await this.reviewLikeService.createLike(new ReviewLikeData(review.id, positive));
        await this.refreshReviewInArray(review.id);
    }

    updateReviewLike = async (reviewLike: ReviewLike, positive: boolean): Promise<void> => {
        this.logger.debug("Update review like: review like id=", reviewLike.id, ", positive=", positive);
        await this.reviewLikeService.updateLike(new ReviewLikeData(reviewLike.reviewId, positive), reviewLike.id);
        await this.refreshReviewInArray(reviewLike.reviewId);
    }

    removeReviewLike = async (reviewLike: ReviewLike): Promise<void> => {
        this.logger.debug("Remove review like: review like id=", reviewLike.id);
        await this.reviewLikeService.deleteLike(reviewLike.id);
        await this.refreshReviewInArray(reviewLike.reviewId);
    }

    @action
    setReviewForDelete = (review: Review) => {
        this.reviewForDelete = review;
    }

    @action
    clearReviewForDelete = () => {
        this.reviewForDelete = null;
    }

    removeReview = async (): Promise<void> => {
        this.logger.debug("Remove current user review");

        this.loadingState.isReviewRemoving = true;
        await this.reviewService.deleteReview(this.reviewForDelete.id).finally(
            () => runInAction(() => {
                this.loadingState.isReviewRemoving = false;
                this.clearReviewForDelete();
            })
        );

        await this.loadReviews();
    }

    private refreshReviewInArray = async (reviewId: string): Promise<void> => {
        this.logger.debug("Refresh review in array");
        const updatedReview = await this.reviewService.getReview(reviewId);

        const updatedIndex = this.reviews.findIndex(r => r.id === updatedReview.id);
        this.reviews.splice(updatedIndex, 1, updatedReview);
    }

    cleanEditingData = () => {
        this.editingReview = null;
        this.editingReviewData = null;
    }

    @action
    setCriteriaSorting = (sortingWrapper: SortingWrapper) => {
        this.reviewsRequestCriteria.sortDirection = sortingWrapper.sortDirection;
        this.reviewsRequestCriteria.sortingField = sortingWrapper.sortingField;
    }
}

export const useMyReviewsPageItem = (): MyReviewsPageItemStore => {
    const [myReviewsPageItemStore] = useState(new MyReviewsPageItemStore());
    return myReviewsPageItemStore;
}

export class ReviewsPageItemStoreLoadingState {

    isReviewsLoading: boolean = false;

    isReviewRemoving: boolean = false;

    isNextReviewsLoading: boolean = false;

    isEditingReviewLoading: boolean = false;

    isEditingReviewSaving: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    @computed
    get hasAnyLoading(): boolean {
        return this.isReviewsLoading || this.isNextReviewsLoading;
    }
}

export class SortingWrapper {

    sortingField: ReviewsCriteriaSortingField;

    sortDirection: SortDirection;

    constructor(sortingField: ReviewsCriteriaSortingField, sortDirection: SortDirection) {
        this.sortingField = sortingField;
        this.sortDirection = sortDirection;
    }
}
