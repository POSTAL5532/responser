import {User} from "./User";
import moment, {Moment} from "moment";
import {ReviewLike} from "./ReviewLike";

export class Review {

    id: string;

    user: User;

    resourceId: string;

    reviewId: string;

    rating: number;

    text: string;

    reviewLikes: ReviewLike[];

    creationDate: Moment;

    updateDate: Moment;

    public static deserialize(data: any): Review {
        return Object.assign(new Review(), data, {
            user: User.deserialize(data.user),
            creationDate: moment(data.creationDate),
            updateDate: moment(data.updateDate),
            reviewLikes: data.reviewLikes.map((like: any) => ReviewLike.deserialize(like))
        });
    }
}