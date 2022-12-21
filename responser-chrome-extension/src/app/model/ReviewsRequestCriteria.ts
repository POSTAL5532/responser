import {makeAutoObservable} from "mobx";
import {ResourceType} from "./ResourceType";

export class ReviewsRequestCriteria {

    resourceId: string;

    excludeUserId: string;

    forUserId: string;

    resourceType: ResourceType;

    constructor() {
        makeAutoObservable(this);
    }
}