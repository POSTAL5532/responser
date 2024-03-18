import {ApiClient} from "./ApiClient";
import {Review} from "../model/Review";
import {ReviewsRequestCriteria} from "../model/ReviewsRequestCriteria";
import {PageableResponse} from "../model/PageableResponse";
import {Pagination} from "../model/Pagination";
import {ReviewData} from "../model/ReviewData";

const BASE_REVIEWS_URL = "/reviews";

export class ReviewService {

    client: ApiClient = new ApiClient();

    getReviews = async (reviewsRequestCriteria: ReviewsRequestCriteria, pageable: Pagination): Promise<PageableResponse<Review>> => {
        const response: any = await this.client.executeGetRequest(
            BASE_REVIEWS_URL,
            {params: {...reviewsRequestCriteria, ...pageable}}
        );

        const reviews = (response.data as any[]).map((el: any) => Review.deserialize(el));
        return PageableResponse.deserialize<Review>(response, reviews);
    }

    getReview = async (reviewId: string): Promise<Review> => {
        const data = await this.client.executeGetRequest(`${BASE_REVIEWS_URL}/${reviewId}`);
        return Review.deserialize(data);
    }

    updateReview = async (reviewId: string, payload: ReviewData): Promise<Review> => {
        const updatedReview = await this.client.executePutRequest(`${BASE_REVIEWS_URL}/${reviewId}`, payload);
        return Review.deserialize(updatedReview);
    }

    deleteReview = async (reviewId: string): Promise<void> => {
        await this.client.executeDeleteRequest(`${BASE_REVIEWS_URL}/${reviewId}`);
    }
}
