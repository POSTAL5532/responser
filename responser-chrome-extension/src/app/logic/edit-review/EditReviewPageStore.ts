import {useState} from "react";
import {makeAutoObservable, reaction} from "mobx";
import {ReviewService} from "../../service/ReviewService";
import {ReviewData} from "../../model/ReviewData";
import {ResourceType} from "../../model/ResourceType";
import {ReviewsRequestCriteria} from "../../model/ReviewsRequestCriteria";
import {Pagination} from "../../model/Pagination";

export class EditReviewPageStore {

    reviewService: ReviewService = new ReviewService();

    currentUserId: string;

    reviewId: string;

    pageId: string;

    domainId: string;

    reviewData: ReviewData;

    isNewReview: boolean;

    userLeftSiteReview: boolean;

    userLeftPageReview: boolean;

    loadingState: EditReviewPageStoreLoadingState = new EditReviewPageStoreLoadingState();

    constructor() {
        makeAutoObservable(this);
    }

    public init = async (currentUserId: string, reviewId: string, pageId: string, domainId: string) => {
        this.currentUserId = currentUserId;
        this.pageId = pageId;
        this.domainId = domainId;

        this.loadingState.isDataInitialization = true;

        await Promise.all([
            this.initUserLeftSiteReview(),
            this.initUserLeftPageReview()
        ]);

        if (!!reviewId) {
            await this.initReviewById(reviewId);
        } else {
            this.initNewReview();
        }

        this.loadingState.isDataInitialization = false;

        this.initReactions();
    }

    public saveReview = async () => {
        this.loadingState.isDataSubmitting = true;

        if (this.reviewId) {
            await this.reviewService.updateReview(this.reviewId, this.reviewData)
            .finally(() => this.loadingState.isDataSubmitting = false);
        } else {
            await this.reviewService.createReview(this.reviewData)
            .finally(() => this.loadingState.isDataSubmitting = false);
        }
    }

    private initReviewById = async (reviewId: string): Promise<void> => {
        const review = await this.reviewService.getReview(reviewId);

        this.reviewData = new ReviewData();

        this.reviewData.resourceId = review.resourceId;
        this.reviewData.rating = review.rating;
        this.reviewData.text = review.text;
        this.reviewData.resourceType = review.resourceType;

        this.reviewId = review.id;
        this.isNewReview = false;
    }

    private initUserLeftSiteReview = async (): Promise<void> => {
        const criteria = new ReviewsRequestCriteria();
        criteria.resourceType = ResourceType.SITE;
        criteria.forUserId = this.currentUserId;
        criteria.resourceId = this.domainId;

        const response = await this.reviewService.getReviews(criteria, Pagination.SINGLE_ELEMENT);
        this.userLeftSiteReview = response.data.length > 0;
    }

    private initUserLeftPageReview = async (): Promise<void> => {
        const criteria = new ReviewsRequestCriteria();
        criteria.resourceType = ResourceType.PAGE;
        criteria.forUserId = this.currentUserId;
        criteria.resourceId = this.pageId;

        const response = await this.reviewService.getReviews(criteria, Pagination.SINGLE_ELEMENT);
        this.userLeftPageReview = response.data.length > 0;
    }

    private initNewReview = () => {
        this.reviewData = new ReviewData();
        this.reviewData.rating = 1;
        this.reviewData.text = "";

        if (this.userLeftSiteReview) {
            this.reviewData.resourceType = ResourceType.PAGE;
            this.reviewData.resourceId = this.pageId;
        } else if (this.userLeftPageReview) {
            this.reviewData.resourceType = ResourceType.SITE;
            this.reviewData.resourceId = this.domainId;
        }

        this.isNewReview = true;
    }

    private initReactions = () => {
        reaction(
            () => this.reviewData.resourceType,
            (newValue) => {
                if (newValue == ResourceType.PAGE) {
                    this.reviewData.resourceId = this.pageId;
                } else if (newValue == ResourceType.SITE) {
                    this.reviewData.resourceId = this.domainId;
                } else {
                    throw new Error(`Bad reviews resource type ${newValue}`);
                }
            });
    }
}

export const useEditReviewPageStore = (): EditReviewPageStore => {
    const [editReviewPageStore] = useState<EditReviewPageStore>(new EditReviewPageStore());
    return editReviewPageStore;
}

export class EditReviewPageStoreLoadingState {

    isDataInitialization: boolean = false;

    isDataSubmitting: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}
