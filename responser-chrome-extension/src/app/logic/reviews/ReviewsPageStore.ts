import {makeAutoObservable} from "mobx";
import {Review} from "../../model/Review";
import {ReviewService} from "../../service/ReviewService";
import {useState} from "react";
import {Domain} from "../../model/Domain";
import {Page} from "../../model/Page";
import {DomainService} from "../../service/DomainService";
import {PagesService} from "../../service/PagesService";
import {ApiErrorType} from "../../model/ApiError";
import {CreateDomainPayload} from "../../model/CreateDomainPayload";
import {CreatePagePayload} from "../../model/CreatePagePayload";
import {ExtensionService} from "../../service/extension/ExtensionService";
import {PageInfo} from "../../model/PageInfo";
import {ReviewsRequestCriteria} from "../../model/ReviewsRequestCriteria";
import {ReviewLike} from "../../model/ReviewLike";
import {ReviewLikeData} from "../../model/ReviewLikeData";
import {ReviewLikeService} from "../../service/ReviewLikeService";
import {ResourceType} from "../../model/ResourceType";

export class ReviewsPageStore {

    extensionService: ExtensionService = new ExtensionService();

    domainService: DomainService = new DomainService();

    pagesService: PagesService = new PagesService();

    reviewService: ReviewService = new ReviewService();

    reviewLikeService: ReviewLikeService = new ReviewLikeService();

    reviewsResourceType: ResourceType;

    /**
     * Current view page info from content layer.
     */
    currentPageInfo: PageInfo;

    domain: Domain;

    page: Page;

    currentUserReview: Review;

    reviews: Review[] = [];

    loadingState: ReviewsPageStoreLoadingState = new ReviewsPageStoreLoadingState();

    constructor() {
        makeAutoObservable(this);
    }

    init = async (reviewsResourceType: ResourceType, currentUserId: string) => {
        this.reviewsResourceType = reviewsResourceType || ResourceType.SITE;
        this.loadingState.isPageInfoLoading = true;
        const pageInfo = await this.extensionService.getCurrentPageInfo().finally(
            () => this.loadingState.isPageInfoLoading = false
        );
        this.currentPageInfo = pageInfo.data;

        await this.initDomain();
        await this.initPage();

        if (currentUserId) await this.loadCurrenUserReview(currentUserId);

        await this.loadReviews(currentUserId);
    }

    initDomain = async () => {
        const {url} = this.currentPageInfo;
        this.loadingState.isDomainLoading = true;

        try {
            this.domain = await this.domainService.getDomainByUrl(url);
        } catch (error: any) {
            if (error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                const newDomainPayload = new CreateDomainPayload(url, "NO_DESCRIPTION");
                this.domain = await this.domainService.createDomain(newDomainPayload);
            }
        } finally {
            this.loadingState.isDomainLoading = false;
        }
    }

    initPage = async () => {
        const {url, description, title} = this.currentPageInfo;
        this.loadingState.isPageLoading = true;

        try {
            this.page = await this.pagesService.getPageByUrl(url);
        } catch (error: any) {
            if (error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                const createPagePayload = new CreatePagePayload(this.domain.id, url, title, description);
                this.page = await this.pagesService.createPage(createPagePayload);
            }
        } finally {
            this.loadingState.isPageLoading = false;
        }
    }

    loadCurrenUserReview = async (currentUserId: string) => {
        const criteria = this.initDefaultReviewsRequestCriteria();
        criteria.forUserId = currentUserId;
        this.loadingState.isReviewsLoading = true;
        const reviews = await this.reviewService.getReviews(criteria).finally(
            () => this.loadingState.isReviewsLoading = false
        );

        this.currentUserReview = reviews[0];
    }

    loadReviews = async (currentUserId: string) => {
        const criteria = this.initDefaultReviewsRequestCriteria();

        if (!!currentUserId) {
            criteria.excludeUserId = currentUserId;
        }

        this.loadingState.isReviewsLoading = true;
        this.reviews = await this.reviewService.getReviews(criteria).finally(
            () => this.loadingState.isReviewsLoading = false
        );
    }

    initDefaultReviewsRequestCriteria = (): ReviewsRequestCriteria => {
        const criteria = new ReviewsRequestCriteria();
        criteria.resourceType = this.reviewsResourceType;

        switch (this.reviewsResourceType) {
            case ResourceType.PAGE:
                criteria.resourceId = this.page.id;
                break;
            case ResourceType.SITE:
                criteria.resourceId = this.domain.id;
                break
            default:
                throw new Error(`Bad reviews resource type ${this.reviewsResourceType}`);
        }

        return criteria;
    }

    removeUserReview = async (): Promise<void> => {
        if (!this.currentUserReview) {
            return;
        }

        this.loadingState.isReviewRemoving = true;
        await this.reviewService.deleteReview(this.currentUserReview.id).finally(
            () => this.loadingState.isReviewRemoving = false
        );

        this.currentUserReview = null;
    }

    createReviewLike = async (review: Review, positive: boolean): Promise<void> => {
        await this.reviewLikeService.createLike(new ReviewLikeData(review.id, positive));
        await this.refreshReviewInArray(review.id);
    }

    updateReviewLike = async (reviewLike: ReviewLike, positive: boolean): Promise<void> => {
        await this.reviewLikeService.updateLike(new ReviewLikeData(reviewLike.reviewId, positive), reviewLike.id);
        await this.refreshReviewInArray(reviewLike.reviewId);
    }

    removeReviewLike = async (reviewLike: ReviewLike): Promise<void> => {
        await this.reviewLikeService.deleteLike(reviewLike.id);
        await this.refreshReviewInArray(reviewLike.reviewId);
    }

    private refreshReviewInArray = async (reviewId: string): Promise<void> => {
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

    isDomainLoading: boolean = false;

    isPageLoading: boolean = false;

    isReviewsLoading: boolean = false;

    isReviewRemoving: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}
