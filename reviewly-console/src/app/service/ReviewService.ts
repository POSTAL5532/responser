import {ApiClient} from "./ApiClient";
import {Review} from "../model/Review";
import {ReviewInfoAdmin} from "../model/ReviewInfoAdmin";

const BASE_REVIEWS_URL = "/reviews";

export class ReviewService {

    client: ApiClient = new ApiClient();

    createFakeReview = async (payload: ReviewInfoAdmin): Promise<Review> => {
        const createdReview = await this.client.executePostRequest(`${BASE_REVIEWS_URL}/create-fake`, payload);
        return Review.deserialize(createdReview);
    }
}
