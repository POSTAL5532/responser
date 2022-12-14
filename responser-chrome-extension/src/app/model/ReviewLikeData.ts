import {makeAutoObservable} from "mobx";

export class ReviewLikeData {

    reviewId: string;

    positive: boolean;


    constructor(reviewId: string, positive: boolean) {
        makeAutoObservable(this);
        this.reviewId = reviewId;
        this.positive = positive;
    }
}
