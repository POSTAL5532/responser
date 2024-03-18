import {Moment} from "moment";
import {makeAutoObservable} from "mobx";
import moment from "moment/moment";

export class ReviewLike {

    id: string;

    userId: string;

    reviewId: string;

    positive: boolean;

    creationDate: Moment;

    updateDate: Moment;

    constructor() {
        makeAutoObservable(this);
    }

    public static deserialize(data: any): ReviewLike {
        return Object.assign(new ReviewLike(), data, {
            creationDate: moment(data.creationDate),
            updateDate: moment(data.updateDate)
        });
    }
}