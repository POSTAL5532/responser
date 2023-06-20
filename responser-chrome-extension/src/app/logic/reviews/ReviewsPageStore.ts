import {makeAutoObservable} from "mobx";
import {Review} from "../../model/Review";
import {ReviewService} from "../../service/ReviewService";
import {useState} from "react";
import {ApiErrorType} from "../../model/ApiError";
import {ExtensionService} from "../../service/extension/ExtensionService";
import {PageInfo} from "../../model/PageInfo";
import {ReviewsRequestCriteria} from "../../model/ReviewsRequestCriteria";
import {ReviewLike} from "../../model/ReviewLike";
import {ReviewLikeData} from "../../model/ReviewLikeData";
import {ReviewLikeService} from "../../service/ReviewLikeService";
import {ResourceType} from "../../model/ResourceType";
import {Pagination} from "../../model/Pagination";
import {Logger} from "../../utils/Logger";
import {WebResource} from "../../model/WebResource";
import {WebResourceService} from "../../service/WebResourceService";
import {NewWebResource} from "../../model/NewWebResource";

const PAGE_ELEMENTS_COUNT = 10;

export class ReviewsPageStore {

    logger: Logger = new Logger("ReviewsPageStore");

    extensionService: ExtensionService = new ExtensionService();

    webResourceService: WebResourceService = new WebResourceService();

    reviewService: ReviewService = new ReviewService();

    reviewLikeService: ReviewLikeService = new ReviewLikeService();

    reviewsResourceType: ResourceType;

    /**
     * Current view page info from content layer.
     */
    currentPageInfo: PageInfo;

    site: WebResource;

    page: WebResource;

    currentUserReview: Review;

    reviews: Review[] = [];

    loadingState: ReviewsPageStoreLoadingState = new ReviewsPageStoreLoadingState();

    currentPageNumber: number;

    hasNextReviews: boolean;

    currentUserId: string;

    constructor() {
        makeAutoObservable(this);
    }

    init = async (reviewsResourceType: ResourceType, currentUserId: string) => {
        this.logger.debug("Init store: reviewsResourceType=", reviewsResourceType, ", currentUserId=", currentUserId);

        this.currentUserId = currentUserId;
        this.currentPageNumber = 0;
        this.hasNextReviews = false;

        this.reviewsResourceType = reviewsResourceType || ResourceType.SITE;
        this.loadingState.isPageInfoLoading = true;
        const pageInfo = await this.extensionService.getCurrentPageInfo().finally(
            () => this.loadingState.isPageInfoLoading = false
        );
        this.currentPageInfo = pageInfo.data;

        await this.initSite();
        await this.initPage();

        await this.loadCurrenUserReview();
        await this.loadReviews();

        this.logger.debug("Store initialisation finished");
    }

    initSite = async () => {
        const {url} = this.currentPageInfo;

        this.logger.debug("Init site with URL=", url);

        this.loadingState.isSiteLoading = true;

        try {
            this.site = await this.webResourceService.getSiteByUrl(url);
        } catch (error: any) {
            this.logger.debug("Init site error - check type of error...");
            if (error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                this.logger.debug("Init site error is 'ENTITY_NOT_FOUND' type - create new site.");
                const newWebResource = new NewWebResource(url, ResourceType.SITE);
                this.site = await this.webResourceService.create(newWebResource);
            } else {
                this.logger.error("Init site error is unknown: ", error);
            }
        } finally {
            this.loadingState.isSiteLoading = false;
        }

        this.logger.debug("Site initialisation finished.");
    }

    initPage = async () => {
        const {url, description, title} = this.currentPageInfo;

        this.logger.debug("Init page: url=", url, ", description=", description, ", title=", title);

        this.loadingState.isPageLoading = true;

        try {
            this.page = await this.webResourceService.getPageByUrl(url);
        } catch (error: any) {
            this.logger.debug("Init page error - check type of error...");
            if (error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                this.logger.debug("Init page error is 'ENTITY_NOT_FOUND' type - create new page.");
                const createPagePayload = new NewWebResource(url, ResourceType.PAGE);
                createPagePayload.parentId = this.site.id;
                this.page = await this.webResourceService.create(createPagePayload);
            } else {
                this.logger.error("Init page error is unknown: ", error);
            }
        } finally {
            this.loadingState.isPageLoading = false;
        }

        this.logger.debug("Page initialisation finished.");
    }

    loadCurrenUserReview = async () => {
        if (!this.currentUserId) {
            this.logger.debug("Not load current user review - no current user");
            return;
        }

        this.logger.debug("Load current user review");

        const criteria = this.getReviewsRequestCriteria(undefined, this.currentUserId);
        this.loadingState.isReviewsLoading = true;
        const reviews = await this.reviewService.getReviews(criteria, Pagination.SINGLE_ELEMENT).finally(
            () => this.loadingState.isReviewsLoading = false
        );

        this.currentUserReview = reviews.data[0];
    }

    loadReviews = async () => {
        this.logger.debug("Load reviews");

        const pagination = new Pagination(this.currentPageNumber, PAGE_ELEMENTS_COUNT);
        const criteria = this.getReviewsRequestCriteria(this.currentUserId);

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

        const criteria = this.getReviewsRequestCriteria(this.currentUserId);
        const pagination = new Pagination(
            this.currentPageNumber + 1,
            PAGE_ELEMENTS_COUNT
        );

        this.loadingState.isNextReviewsLoading = true;
        const reviewsResponse = await this.reviewService.getReviews(criteria, pagination).finally(
            () => this.loadingState.isNextReviewsLoading = false
        );

        this.reviews.push(...reviewsResponse.data);
        this.currentPageNumber += 1;
        this.hasNextReviews = !reviewsResponse.isLast;
    }

    getReviewsRequestCriteria = (excludeUserId?: string, forUserId?: string): ReviewsRequestCriteria => {
        const criteria = new ReviewsRequestCriteria();

        switch (this.reviewsResourceType) {
            case ResourceType.PAGE:
                criteria.resourceId = this.page.id;
                break;
            case ResourceType.SITE:
                criteria.resourceId = this.site.id;
                break
            default:
                throw new Error(`Bad reviews resource type ${this.reviewsResourceType}`);
        }

        if (!!excludeUserId) {
            criteria.excludeUserId = excludeUserId;
        }

        if (!!forUserId) {
            criteria.forUserId = forUserId;
        }

        return criteria;
    }

    removeUserReview = async (): Promise<void> => {
        if (!this.currentUserReview) return;

        this.logger.debug("Remove current user review");

        this.loadingState.isReviewRemoving = true;
        await this.reviewService.deleteReview(this.currentUserReview.id).finally(
            () => this.loadingState.isReviewRemoving = false
        );

        this.currentUserReview = null;
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

    private refreshReviewInArray = async (reviewId: string): Promise<void> => {
        this.logger.debug("Refresh review in array");
        const updatedReview = await this.reviewService.getReview(reviewId);

        if (updatedReview.id === this.currentUserReview?.id) {
            this.currentUserReview = updatedReview;
        } else {
            const updatedIndex = this.reviews.findIndex(r => r.id === updatedReview.id);
            this.reviews.splice(updatedIndex, 1, updatedReview);
        }
    }
}

export const useReviewsPageStore = (): ReviewsPageStore => {
    const [reviewsPageStore] = useState(new ReviewsPageStore());
    return reviewsPageStore;
}

export class ReviewsPageStoreLoadingState {

    isPageInfoLoading: boolean = false;

    isSiteLoading: boolean = false;

    isPageLoading: boolean = false;

    isReviewsLoading: boolean = false;

    isReviewRemoving: boolean = false;

    isNextReviewsLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}
