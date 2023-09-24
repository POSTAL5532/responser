import {makeAutoObservable} from "mobx";
import {ResourceType} from "./ResourceType";
import {SortDirection} from "./SortDirection";
import {ReviewsCriteriaSortingField} from "./ReviewsCriteriaSortingField";

export class ReviewsRequestCriteria {

    resourceId: string;

    excludeUserId: string;

    forUserId: string;

    resourceType: ResourceType;

    sortingField: ReviewsCriteriaSortingField;

    sortDirection: SortDirection;

    constructor() {
        makeAutoObservable(this);
    }
}