import {makeAutoObservable} from "mobx";
import {ResourceType} from "./ResourceType";

export class ReviewData {

    resourceId: string;

    rating: number;

    text: string;

    resourceType: ResourceType;

    constructor() {
        makeAutoObservable(this);
    }
}
