import {makeAutoObservable} from "mobx";
import {ResourceType} from "./ResourceType";
import {SortDirection} from "./SortDirection";
import {ReviewsCriteriaSortingField} from "./ReviewsCriteriaSortingField";

export class ReviewsRequestCriteria {

    resourceId: string;

    excludeUserId: string;

    forUserId: string;

    resourceType: ResourceType;

    maxRating: number;

    minRating: number;

    sortingField: ReviewsCriteriaSortingField;

    sortDirection: SortDirection;

    constructor() {
        makeAutoObservable(this);
    }
}