import {makeAutoObservable} from "mobx";
import {ReviewService} from "../../service/ReviewService";
import {useState} from "react";
import {ReviewData} from "../../model/ReviewData";

export class EditReviewPageStore {

    reviewService: ReviewService = new ReviewService();

    reviewId: string;

    reviewData: ReviewData;

    constructor() {
        makeAutoObservable(this);
    }

    public init = async (reviewId: string, resourceId: string) => {
        if (!!reviewId) {
            await this.initReviewById(reviewId);
        } else {
            this.initNewReview(resourceId);
        }
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

        this.reviewData = new ReviewData(
            review.resourceId,
            review.rating,
            review.text
        );

        this.reviewId = review.id;
    }

    private initNewReview = (resourceId: string) => {
        this.reviewData = new ReviewData(resourceId, 1, "");
    }
}

export const useEditReviewPageStore = (): EditReviewPageStore => {
    const [editReviewPageStore] = useState<EditReviewPageStore>(new EditReviewPageStore());
    return editReviewPageStore;
}
