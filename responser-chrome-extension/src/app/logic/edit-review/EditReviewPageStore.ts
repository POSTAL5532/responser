import {useState} from "react";
import {makeAutoObservable, reaction} from "mobx";
import {ReviewService} from "../../service/ReviewService";
import {ReviewData} from "../../model/ReviewData";
import {ResourceType} from "../../model/ResourceType";

export class EditReviewPageStore {

    reviewService: ReviewService = new ReviewService();

    reviewId: string;

    pageId: string;

    domainId: string;

    reviewData: ReviewData;

    isNewReview: boolean;

    constructor() {
        makeAutoObservable(this);
    }

    public init = async (reviewId: string, pageId: string, domainId: string) => {
        this.pageId = pageId;
        this.domainId = domainId;

        if (!!reviewId) {
            await this.initReviewById(reviewId);
        } else {
            this.initNewReview();
        }

        this.initReactions();
    }

    public saveReview = async () => {
        if (this.reviewId) {
            await this.reviewService.updateReview(this.reviewId, this.reviewData);
        } else {
            await this.reviewService.createReview(this.reviewData);
        }
    }

    private initReviewById = async (reviewId: string) => {
        const review = await this.reviewService.getReview(reviewId);

        this.reviewData = new ReviewData();

        this.reviewData.resourceId = review.resourceId;
        this.reviewData.rating = review.rating;
        this.reviewData.text = review.text;
        this.reviewData.resourceType = review.resourceType;

        this.reviewId = review.id;
        this.isNewReview = false;
    }

    private initNewReview = () => {
        this.reviewData = new ReviewData();
        this.reviewData.rating = 1;
        this.reviewData.text = "";

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
