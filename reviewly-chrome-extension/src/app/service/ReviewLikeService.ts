import {ApiClient} from "./ApiClient";
import {ReviewLikeData} from "../model/ReviewLikeData";
import {ReviewLike} from "../model/ReviewLike";

const BASE_REVIEW_LIKES_URL = "/review-likes";

export class ReviewLikeService {

    client: ApiClient = new ApiClient();

    createLike = async (payload: ReviewLikeData): Promise<ReviewLike> => {
        const createdReviewLike = await this.client.executePostRequest(BASE_REVIEW_LIKES_URL, payload);
        return ReviewLike.deserialize(createdReviewLike);
    }

    updateLike = async (payload: ReviewLikeData, likeId: string): Promise<ReviewLike> => {
        const updatedReviewLike = await this.client.executePutRequest(`${BASE_REVIEW_LIKES_URL}/${likeId}`, payload);
        return ReviewLike.deserialize(updatedReviewLike);
    }

    deleteLike = async (reviewLikeId: string): Promise<void> => {
        await this.client.executeDeleteRequest(`${BASE_REVIEW_LIKES_URL}/${reviewLikeId}`);
    }
}