import {useState} from "react";
import {action, computed, makeAutoObservable} from "mobx";
import {Logger} from "../../../utils/Logger";
import {ReviewService} from "../../../service/ReviewService";
import {Review} from "../../../model/Review";
import {Pagination} from "../../../model/Pagination";
import {ReviewsRequestCriteria} from "../../../model/ReviewsRequestCriteria";
import {ReviewsCriteriaSortingField} from "../../../model/ReviewsCriteriaSortingField";
import {SortDirection} from "../../../model/SortDirection";

export class MyReviewsPageItemStore {

    public static readonly PAGE_ELEMENTS_COUNT = 10;

    logger: Logger = new Logger("MyReviewsPageItemStore");

    reviewService: ReviewService = new ReviewService();

    reviews: Review[] = [];

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
            () => this.loadingState.isReviewsLoading = false
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
            () => this.loadingState.isNextReviewsLoading = false
        );

        this.reviews.push(...reviewsResponse.data);
        this.currentPageNumber += 1;
        this.hasNextReviews = !reviewsResponse.isLast;
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

    isNextReviewsLoading: boolean = false;

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
