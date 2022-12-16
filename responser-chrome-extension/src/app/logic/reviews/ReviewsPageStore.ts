import {makeAutoObservable} from "mobx";
import {Review} from "../../model/Review";
import {LoadingStore} from "../../utils/LoadingStore";
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

export class ReviewsPageStore extends LoadingStore {

    extensionService: ExtensionService = new ExtensionService();

    domainService: DomainService = new DomainService();

    pagesService: PagesService = new PagesService();

    reviewService: ReviewService = new ReviewService();

    reviewLikeService: ReviewLikeService = new ReviewLikeService();

    currentPageInfo: PageInfo;

    domain: Domain;

    page: Page;

    currentUserReview: Review;

    reviews: Review[] = [];

    constructor() {
        super();
        makeAutoObservable(this);
    }

    init = async (currentUserId?: string) => {
        this.currentPageInfo = (await this.extensionService.getCurrentPageInfo()).data;
        await this.initDomain();
        await this.initPage();

        if (currentUserId) {
            await this.loadCurrenUserReview(currentUserId);
        }

        await this.loadReviews(currentUserId);
    }

    initDomain = async () => {
        const {url} = this.currentPageInfo;

        try {
            this.domain = await this.domainService.getDomainByUrl(url);
        } catch (error: any) {
            if (error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                const newDomainPayload = new CreateDomainPayload(url, "NO_DESCRIPTION");
                this.domain = await this.domainService.createDomain(newDomainPayload);
            }
        }
    }

    initPage = async () => {
        const {url, description, title} = this.currentPageInfo;

        try {
            this.page = await this.pagesService.getPageByUrl(url);
        } catch (error: any) {
            if (error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                const createPagePayload = new CreatePagePayload(this.domain.id, url, title, description);
                this.page = await this.pagesService.createPage(createPagePayload);
            }
        }
    }

    loadCurrenUserReview = async (currentUserId: string) => {
        const criteria = new ReviewsRequestCriteria();
        criteria.resourceId = this.page.id;
        criteria.forUserId = currentUserId;

        const reviews = await this.reviewService.getReviews(criteria);

        if (reviews.length > 0) {
            this.currentUserReview = reviews[0];
        }
    }

    loadReviews = async (currentUserId: string) => {
        const criteria = new ReviewsRequestCriteria();
        criteria.resourceId = this.page.id;

        if (!!currentUserId) {
            criteria.excludeUserId = currentUserId;
        }

        this.reviews = await this.reviewService.getReviews(criteria);
    }

    removeReview = async (review: Review): Promise<void> => {
        await this.reviewService.deleteReview(review.id);
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
