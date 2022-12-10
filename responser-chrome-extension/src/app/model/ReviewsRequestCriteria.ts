import {makeAutoObservable} from "mobx";

export class ReviewsRequestCriteria {

    resourceId: string;

    excludeUserId: string;

    forUserId: string;

    constructor() {
        makeAutoObservable(this);
    }
}