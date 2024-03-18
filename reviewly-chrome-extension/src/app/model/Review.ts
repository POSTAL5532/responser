import {User} from "./User";
import moment, {Moment} from "moment";
import {ReviewLike} from "./ReviewLike";
import {ResourceType} from "./ResourceType";
import {WebResource} from "./WebResource";

export class Review {

    id: string;

    resourceId: string;

    reviewId: string;

    rating: number;

    text: string;

    user: User;

    reviewLikes: ReviewLike[];

    webResource: WebResource;

    creationDate: Moment;

    updateDate: Moment;

    public static deserialize(data: any): Review {
        return Object.assign(new Review(), data, {
            user: User.deserialize(data.user),
            creationDate: moment(data.creationDate),
            updateDate: moment(data.updateDate),
            reviewLikes: data.reviewLikes.map((like: any) => ReviewLike.deserialize(like)),
            webResource: data.webResource ? WebResource.deserialize(data.webResource) : null
        });
    }
}