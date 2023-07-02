import {makeAutoObservable} from "mobx";
import {ResourceType} from "./ResourceType";
import {SortDirection} from "./SortDirection";
import {Review} from "./Review";

export class ReviewsRequestCriteria {

    resourceId: string;

    excludeUserId: string;

    forUserId: string;

    resourceType: ResourceType;

    sortingField: keyof Review;

    sortDirection: SortDirection;

    constructor() {
        makeAutoObservable(this);
    }
}