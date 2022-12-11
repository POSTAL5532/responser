import {User} from "./User";
import moment, {Moment} from "moment";

export class Review {

    id: string;

    user: User;

    resourceId: string;

    reviewId: string;

    rating: number;

    text: string;

    creationDate: Moment;

    updateDate: Moment;

    public static deserialize(data: any): Review {
        return Object.assign(new Review(), data, {
            user: User.deserialize(data.user),
            creationDate: moment(data.creationDate),
            updateDate: moment(data.updateDate)
        });
    }
}