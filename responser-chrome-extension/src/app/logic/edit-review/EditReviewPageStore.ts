import {useState} from "react";
import {makeAutoObservable, reaction} from "mobx";
import {ReviewService} from "../../service/ReviewService";
import {ReviewData} from "../../model/ReviewData";
import {ResourceType} from "../../model/ResourceType";
import {ReviewsRequestCriteria} from "../../model/ReviewsRequestCriteria";
import {Pagination} from "../../model/Pagination";
import {Logger} from "../../utils/Logger";
import {ExtensionService} from "../../service/extension/ExtensionService";

export class EditReviewPageStore {

    logger: Logger = new Logger("EditReviewPageStore");

    reviewService: ReviewService = new ReviewService();

    extensionService: ExtensionService = new ExtensionService();

    currentUserId: string;

    reviewId: string;

    pageId: string;

    siteId: string;

    currentResourceType: ResourceType;

    reviewData: ReviewData;

    isNewReview: boolean;

    userLeftSiteReview: boolean;

    userLeftPageReview: boolean;

    loadingState: EditReviewPageStoreLoadingState = new EditReviewPageStoreLoadingState();

    constructor() {
        makeAutoObservable(this);
    }

    public init = async (currentUserId: string, reviewId: string, pageId: string, siteId: string) => {
        this.logger.debug("Init store: currentUserId=", currentUserId, ", reviewId=", reviewId, ", pageId=", pageId, ", siteId=", siteId);

        this.currentUserId = currentUserId;
        this.pageId = pageId;
        this.siteId = siteId;

        this.loadingState.isDataInitialization = true;

        await Promise.all([
            this.initUserLeftSiteReview(),
            this.initUserLeftPageReview()
        ]);

        if (!!reviewId) {
            this.logger.debug("Init by review ID");
            await this.initReviewById(reviewId);
        } else {
            this.logger.debug("Init for new review");
            this.initNewReview();
        }

        this.loadingState.isDataInitialization = false;

        this.initReactions();
        this.logger.debug("Initialization complete");
    }

    public saveReview = async () => {
        this.loadingState.isDataSubmitting = true;

        if (!this.isNewReview) {
            this.logger.debug("Save edited review");
            await this.reviewService.updateReview(this.reviewId, this.reviewData)
            .finally(() => this.loadingState.isDataSubmitting = false);
        } else {
            this.logger.debug("Save new review");
            await this.reviewService.createReview(this.reviewData)
            .finally(() => this.loadingState.isDataSubmitting = false);
        }

        if (this.currentResourceType === ResourceType.SITE) {
            this.logger.debug("Update rating badge");
            this.extensionService.updateRatingBadge();
        }

        this.logger.debug("Review saved");
    }

    private initReviewById = async (reviewId: string): Promise<void> => {
        const review = await this.reviewService.getReview(reviewId);

        this.reviewData = new ReviewData();

        this.reviewData.resourceId = review.resourceId;
        this.reviewData.rating = review.rating;
        this.reviewData.text = review.text;
        this.currentResourceType = review.webResource.resourceType;

        this.reviewId = review.id;
        this.isNewReview = false;
    }

    private initUserLeftSiteReview = async (): Promise<void> => {
        const criteria = new ReviewsRequestCriteria();
        criteria.resourceType = ResourceType.SITE;
        criteria.forUserId = this.currentUserId;
        criteria.resourceId = this.siteId;

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
            this.currentResourceType = ResourceType.PAGE;
            this.reviewData.resourceId = this.pageId;
        } else if (this.userLeftPageReview) {
            this.currentResourceType = ResourceType.SITE;
            this.reviewData.resourceId = this.siteId;
        }

        this.isNewReview = true;
    }

    private initReactions = () => {
        reaction(
            () => this.currentResourceType,
            (newValue) => {
                if (newValue == ResourceType.PAGE) {
                    this.reviewData.resourceId = this.pageId;
                } else if (newValue == ResourceType.SITE) {
                    this.reviewData.resourceId = this.siteId;
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
