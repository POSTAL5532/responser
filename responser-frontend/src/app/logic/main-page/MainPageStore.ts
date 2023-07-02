import {useState} from "react";
import {makeAutoObservable} from "mobx";
import {Review} from "../../model/Review";
import {ReviewService} from "../../service/ReviewService";
import {ReviewsRequestCriteria} from "../../model/ReviewsRequestCriteria";
import {Pagination} from "../../model/Pagination";
import {Logger} from "../../utils/Logger";
import {SortDirection} from "../../model/SortDirection";

const PAGE_ELEMENTS_COUNT = 10;

export class MainPageStore {

    logger: Logger = new Logger("MainPageStore");

    reviewService: ReviewService = new ReviewService();

    reviews: Review[] = [];

    loadingState: ReviewsPageStoreLoadingState = new ReviewsPageStoreLoadingState();

    currentPageNumber: number;

    hasNextReviews: boolean;

    constructor() {
        makeAutoObservable(this);
    }

    init = async () => {
        this.logger.debug("Init store");

        this.currentPageNumber = 0;
        this.hasNextReviews = false;

        await this.loadReviews();

        this.logger.debug("Store initialisation finished");
    }

    loadReviews = async () => {
        this.logger.debug("Load reviews");

        const pagination = new Pagination(this.currentPageNumber, PAGE_ELEMENTS_COUNT);
        const criteria = this.getReviewsRequestCriteria();

        this.loadingState.isReviewsLoading = true;
        const reviewsResponse = await this.reviewService.getReviews(criteria, pagination).finally(
            () => this.loadingState.isReviewsLoading = false
        );

        this.reviews = reviewsResponse.data;
        this.hasNextReviews = !reviewsResponse.isLast;
    }

    loadNextReviews = async () => {
        if (!this.hasNextReviews || this.loadingState.isNextReviewsLoading) return;

        this.logger.debug("Load next reviews");

        const criteria = this.getReviewsRequestCriteria();
        const pagination = new Pagination(this.currentPageNumber + 1, PAGE_ELEMENTS_COUNT);

        this.loadingState.isNextReviewsLoading = true;
        const reviewsResponse = await this.reviewService.getReviews(criteria, pagination).finally(
            () => this.loadingState.isNextReviewsLoading = false
        );

        this.reviews.push(...reviewsResponse.data);
        this.currentPageNumber += 1;
        this.hasNextReviews = !reviewsResponse.isLast;
    }

    getReviewsRequestCriteria = (): ReviewsRequestCriteria => {
        const criteria = new ReviewsRequestCriteria();
        criteria.sortingField = "creationDate";
        criteria.sortDirection = SortDirection.DESC;

        return criteria;
    }
}

export const useMainPageStore = (): MainPageStore => {
    const [mainPageStore] = useState(new MainPageStore());
    return mainPageStore;
}

export class ReviewsPageStoreLoadingState {

    isReviewsLoading: boolean = false;

    isNextReviewsLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}
