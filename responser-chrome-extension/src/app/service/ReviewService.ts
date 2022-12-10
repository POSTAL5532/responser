import {ApiClient} from "./ApiClient";
import {Review} from "../model/Review";
import {ReviewData} from "../model/ReviewData";
import {ReviewsRequestCriteria} from "../model/ReviewsRequestCriteria";

const BASE_REVIEWS_URL = "/reviews";

export class ReviewService {

    client: ApiClient = new ApiClient();

    getReviews = async (reviewsRequestCriteria: ReviewsRequestCriteria): Promise<Review[]> => {
        const data: any[] = await this.client.executeGetRequest(
            BASE_REVIEWS_URL,
            {params: reviewsRequestCriteria}
        );

        return data.map((el: any) => Review.deserialize(el));
    }

    getReview = async (reviewId: string): Promise<Review> => {
        const data = await this.client.executeGetRequest(`${BASE_REVIEWS_URL}/${reviewId}`);
        return Review.deserialize(data);
    }

    createReview = async (payload: ReviewData): Promise<Review> => {
        const createdReview = await this.client.executePostRequest(BASE_REVIEWS_URL, payload);
        return Review.deserialize(createdReview);
    }

    updateReview = async (reviewId: string, payload: ReviewData): Promise<Review> => {
        const updatedReview = await this.client.executePutRequest(`${BASE_REVIEWS_URL}/${reviewId}`, payload);
        return Review.deserialize(updatedReview);
    }
}
