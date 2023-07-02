import {makeAutoObservable} from "mobx";
import {ResourceType} from "./ResourceType";
import {SortDirection} from "./SortDirection";

export class ReviewsRequestCriteria {

    resourceId: string;

    excludeUserId: string;

    forUserId: string;

    resourceType: ResourceType;

    sortingField: string;

    sortDirection: SortDirection;

    constructor() {
        makeAutoObservable(this);
    }
}