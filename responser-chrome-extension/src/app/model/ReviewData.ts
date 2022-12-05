import {makeAutoObservable} from "mobx";

export class ReviewData {

    resourceId: string;

    rating: number;

    text: string;


    constructor(resourceId: string, rating: number, text: string) {
        makeAutoObservable(this);
        this.resourceId = resourceId;
        this.rating = rating;
        this.text = text;
    }
}
