import {User} from "./User";
import moment, {Moment} from "moment";

export class Response {

    id: string;

    user: User;

    resourceId: string;

    responseId: string;

    rating: number;

    text: string;

    creationDate: Moment;

    updateDate: Moment;

    public static deserialize(data: any): Response {
        return Object.assign(new Response(), data, {
            user: User.deserialize(data.user),
            createdTimestamp: moment(data.createdTimestamp),
            updateDate: moment(data.updateDate)
        });
    }
}